// import GameObject from 'objects/GameObject';
import Player from 'Objects/Player';

class GameState extends Phaser.State {

	preload() {
		console.log('Game preload');

		// The order you create these groups matters, unless you set the Z-index by hand.
		// I add these to the game object, so they're easily accessed inside different objects.
		// Create a group for the foreground items, like players, enemies and things like that.
		this.game.background = this.game.add.group();
		this.game.foreground = this.game.add.group();

		// Create a group for UI stuff like buttons, texts and menus. It's drawn on top of the foreground.
		this.game.ui = this.game.add.group();
	}

	create() {
		console.log('Game create');

		let center = { x: this.game.world.centerX, y: this.game.world.centerY };


    this.createField();
    const player = new Player(this.game, 100, 100, 1);
		this.game.foreground.add(player);

		// This is a game sprite example
		// this.player = new GameObject(this.game, center.x, center.y + 100, 'plane', 0);

		// Create directional keys

	}

	update(){
		// Do all your game loop stuff here


	}

  createField(){
    // create a new bitmap data object
    var bmd = this.add.bitmapData(480,800);

    // draw to the canvas context like normal
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,480,800);
    bmd.ctx.fillStyle = '#000';
    bmd.ctx.fill();


    bmd.ctx.beginPath();
    bmd.ctx.rect(10,10,460,780);
    bmd.ctx.fillStyle = '#fff';
    bmd.ctx.fill();
    console.log('bmd.ctx',bmd.ctx);

    const field = this.game.add.sprite(0,0,bmd);

    // use the bitmap data as the texture for the sprite
    this.game.background.add(field);
  }


}

export default GameState;
