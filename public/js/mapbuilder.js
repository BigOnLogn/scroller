define(
[
  'slicetype'
],

function(SliceType) {

  function MapBuilder(walls) {
    this.walls = walls;
    this.currentHeight = randInt(1, 3);
    this.createMap();

  }

  MapBuilder.WALL_HEIGHTS = [
    256   // Lowest slice
    , 224
    , 192
    , 160
    , 128 // Highest slice
  ];

  MapBuilder.prototype.genNextSection = function() {
    var nextHeight = randInt(1, 3)
      , genStep = randInt(1, 2) === 2
      , spanLength = randInt(5, 50);

    if (genStep && this.currentHeight > 1) {

      this.createWallSpan(this.currentHeight, 1, true, true);
      this.addWallStep(this.currentHeight - 2);
      this.createWallSpan(this.currentHeight - 2, spanLength - 1, true, true);
      this.currentHeight -= 2;

    } else if (nextHeight !== this.currentHeight) {

      this.addWallBack(this.currentHeight);
      this.createGap(randInt(1, 3));

      this.createWallSpan(nextHeight, spanLength, false, true);
      this.currentHeight = nextHeight;

    } else {
      this.genWallSpan(nextHeight, spanLength, true, true);
    }
  };

  MapBuilder.prototype.genWallSpan = function(heightIndex, spanLength) {
    var insertGap = randInt(1, 10) === 5;
    if (insertGap) {
      var firstSpan = Math.floor(spanLength / randInt(1, 3))
        , secondSpan = spanLength - firstSpan;
      this.createWallSpan(heightIndex, firstSpan, true);
      this.createGap(randInt(1, 3));
      this.createWallSpan(heightIndex, secondSpan, false, true);
    } else {
      this.createWallSpan(heightIndex, spanLength, true, true);
    }
  };

  MapBuilder.prototype.createMap = function() {
    this.createWallSpan(this.currentHeight, 9, true);
    this.createGap(2);
    this.createWallSpan(this.currentHeight, 1, false, true);
    for (var i = 0; i < 20; i++) {
      this.genNextSection();
    }
    this.createWallSpan(this.currentHeight, 1, true);
    this.createGap(20);
  };

  MapBuilder.prototype.createGap = function(spanLength) {
    for (var i = 0; i < spanLength; i++) {
      this.walls.addSlice(SliceType.GAP);
    }
  };

  MapBuilder.prototype.createWallSpan = function(heightIndex, spanLength, noFront, noBack) {
    noFront = noFront || false;
    noBack = noBack || false;

    if (noFront == false && spanLength > 0) {
      this.addWallFront(heightIndex);
      spanLength--;
    }

    var midSpanLength = spanLength - (noBack ? 0 : 1);
    if (midSpanLength > 0) {
      this.addWallMid(heightIndex, midSpanLength);
      spanLength -= midSpanLength;
    }

    if (noBack == false && spanLength > 0) {
      this.addWallBack(heightIndex);
    }
  };

  MapBuilder.prototype.createSteppedWallSpan = function(heightIndex, spanALength, spanBLength) {
    if (heightIndex < 2) {
      heightIndex = 2;
    }

    this.createWallSpan(heightIndex, spanALength, false, true);
    this.addWallStep(heightIndex - 2);
    this.createWallSpan(heightIndex - 2, spanBLength - 1, true, false);
  };

  MapBuilder.prototype.addWallFront = function(heightIndex) {
    var y = MapBuilder.WALL_HEIGHTS[heightIndex];
    this.walls.addSlice(SliceType.FRONT, y);
  };

  MapBuilder.prototype.addWallBack = function(heightIndex) {
    var y = MapBuilder.WALL_HEIGHTS[heightIndex];
    this.walls.addSlice(SliceType.BACK, y);
  };

  MapBuilder.prototype.addWallMid = function(heightIndex, spanLength) {
    var y = MapBuilder.WALL_HEIGHTS[heightIndex];
    for (var i = 0; i < spanLength; i++) {
      if (i % 2 == 0) {
        this.walls.addSlice(SliceType.WINDOW, y);
      } else {
        this.walls.addSlice(SliceType.DECORATION, y);
      }
    }
  };

  MapBuilder.prototype.addWallStep = function(heightIndex) {
    var y = MapBuilder.WALL_HEIGHTS[heightIndex];
    this.walls.addSlice(SliceType.STEP, y);
  };

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  return MapBuilder;
})