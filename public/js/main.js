define([
  'pixi.dev'
  , 'scroller'
],

function(PIXI, Scroller) {

  function Main() {
    this.stage = new PIXI.Stage(0x66FF99);
    this.renderer = new PIXI.autoDetectRenderer(
      512
      ,384
      ,document.getElementById('game-canvas')
    );

    this.scrollSpeed = Main.MIN_SCROLL_SPEED;
  }

  Main.MIN_SCROLL_SPEED = 2;
  Main.MAX_SCROLL_SPEED = 15;
  Main.SCROLL_ACCELERATION = 0.005;

  Main.prototype.begin = function() {
    this.loadSpriteSheet();
  };

  Main.prototype.update = function() {
    this.scroller.moveViewportXBy(this.scrollSpeed);
    this.scrollSpeed += Main.SCROLL_ACCELERATION;
    if (this.scrollSpeed > Main.MAX_SCROLL_SPEED) {
      this.scrollSpeed = Main.MAX_SCROLL_SPEED;
    }
    this.renderer.render(this.stage);
    requestAnimFrame(this.update.bind(this));
  };

  Main.prototype.loadSpriteSheet = function() {
    var assetsToLoad = ['assets/wall.json', 'assets/bg-mid.png', 'assets/bg-far.png'];
    var loader = new PIXI.AssetLoader(assetsToLoad);
    loader.onComplete = this.spriteSheetLoaded.bind(this);
    loader.load();
  };

  Main.prototype.spriteSheetLoaded = function() {
    this.scroller = new Scroller(this.stage);
    requestAnimFrame(this.update.bind(this));
  };

  return Main;
})