define(['pixi.dev'], function(PIXI){

  function WallSpritesPool() {
    this.createWindows();
    this.createDecorations();
    this.createFrontEdges();
    this.createBackEdges();
    this.createSteps();
  }

  WallSpritesPool.prototype.createWindows = function() {
    this.windows = [];

    addSpritesToPool(this.windows, 6, "window_01");
    addSpritesToPool(this.windows, 6, "window_02");

    shuffle(this.windows);
  };

  WallSpritesPool.prototype.createDecorations = function() {
    this.decorations = [];

    addSpritesToPool(this.decorations, 6, "decoration_01");
    addSpritesToPool(this.decorations, 6, "decoration_02");
    addSpritesToPool(this.decorations, 6, "decoration_03");

    shuffle(this.decorations);
  };

  WallSpritesPool.prototype.createFrontEdges = function() {
    this.frontEdges = [];

    addSpritesToPool(this.frontEdges, 2, "edge_01");
    addSpritesToPool(this.frontEdges, 2, "edge_02");

    shuffle(this.frontEdges);
  };

  WallSpritesPool.prototype.createBackEdges = function() {
    this.backEdges = [];

    addSpritesToPool(this.backEdges, 2, "edge_01");
    addSpritesToPool(this.backEdges, 2, "edge_02");

    for(var i = 0; i < 4; i++) {
      this.backEdges[i].anchor.x = 1;
      this.backEdges[i].scale.x = -1;
    }

    shuffle(this.backEdges);
  };

  WallSpritesPool.prototype.createSteps = function() {
    this.steps = [];

    addSpritesToPool(this.steps, 2, "step_01");

    for (var i = 0; i < 2; i++) {
      this.steps[i].anchor.y = 0.25;
    }
  };

  WallSpritesPool.prototype.borrowWindow = function() {
    return this.windows.shift();
  };

  WallSpritesPool.prototype.returnWindow = function(sprite) {
    this.windows.push(sprite);
  };

  WallSpritesPool.prototype.borrowDecoration = function() {
    return this.decorations.shift();
  };

  WallSpritesPool.prototype.returnDecoration = function(sprite) {
    this.decorations.push(sprite);
  };

  WallSpritesPool.prototype.borrowFrontEdge = function() {
    return this.frontEdges.shift();
  };

  WallSpritesPool.prototype.returnFrontEdge = function(sprite) {
    this.frontEdges.push(sprite);
  };

  WallSpritesPool.prototype.borrowBackEdge = function() {
    return this.backEdges.shift();
  };

  WallSpritesPool.prototype.returnBackEdge = function(sprite) {
    this.backEdges.push(sprite);
  };

  WallSpritesPool.prototype.borrowStep = function() {
    return this.steps.shift();
  };

  WallSpritesPool.prototype.returnStep = function(sprite) {
    this.steps.push(sprite);
  };

  function addSpritesToPool(pool, amount, frameId) {
    for (var i = 0; i < amount; i++) {
      var sprite = PIXI.Sprite.fromFrame(frameId);
      pool.push(sprite);
    }
  }

  function shuffle (arr) {
    var len = arr.length
      , shuffles = len * 3;
    for (var i = 0; i < shuffles; i++) {
      var wallSlice = arr.pop();
      var pos = Math.floor(Math.random() * (len - 1));
      arr.splice(pos, 0, wallSlice);
    }
  };

  return WallSpritesPool;
})