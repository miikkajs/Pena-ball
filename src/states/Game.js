// import GameObject from 'objects/GameObject';
import Player from 'Objects/Player';
import Ball from 'Objects/Ball';

class GameState extends Phaser.State {

  constructor(){
    super();
    this.team1 = {
      name: 'team1',
      startingLocations: [
        {x: 100,  y: 100},
        {x: 200,  y: 200},
        {x: 300,  y: 100}
      ],
      players: []
    };
    this.team2 = {
      name: 'team2',
      startingLocations: [
        {x: 100,  y: 700},
        {x: 200,  y: 600},
        {x: 300,  y: 700}
      ],
      players: []
    };
    this.ball = {};
  }
  

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

    this.createTeam(this.team1);
    this.createTeam(this.team2);

    // const player = new Player(this.game, 100, 100, 1);
    // this.game.foreground.add(player);

    const ball = new Ball(this.game, 200, 400);
    this.game.foreground.add(ball);


	}

  createTeam(team){
    team.players = team.startingLocations.map(coords => {

      return new Player(this.game, coords.x, coords.y, team.name);
    });

    team.players.forEach(player => {
      this.game.physics.arcade.enable(player);
      player.body.setCircle(16);
      player.body.collideWorldBounds = true;
      player.init();
      this.game.foreground.add(player)
    });

  }

	update(){


    this.game.physics.arcade.collide(this.team1.players, this.team2.players);


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

  render(){
    this.team1.players.forEach(player => {
    this.game.debug.body(player)
    });

  }


}

export default GameState;
