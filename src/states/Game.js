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
        {x: 130,  y: 700},
        {x: 230,  y: 600},
        {x: 330,  y: 700}
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
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    // this.game.physics.p2.defaultRestitution = 0;
    console.log('this.game.physics.p2',this.game.physics.p2);

		let center = { x: this.game.world.centerX, y: this.game.world.centerY };

    this.createField();

    this.createTeam(this.team1);
    this.createTeam(this.team2);

    // const player = new Player(this.game, 100, 100, 1);
    // this.game.foreground.add(player);

    const ball = new Ball(this.game, 200, 400);
    this.game.foreground.add(ball);

    this.game.input.onDown.add(this.click, this);
    this.game.input.onUp.add(this.release, this);
    // this.game.input.addMoveCallback(move, this);

    this.mouseBody = this.game.add.sprite(0, 0, 'cursor');
    this.game.physics.p2.enable(this.mouseBody, true);
    this.mouseBody.body.static = true;
    this.mouseBody.body.setCircle(10);
    this.mouseBody.body.data.shapes[0].sensor = true;

	}

  click(pointer) {

    this.clickedBody = this.game.physics.p2.hitTest(pointer.position, this.team1.players)[0];
  // console.log('bodies',bodies);

}

  release() {
    if (this.clickedBody) {
      console.log("Released, player should spring! ");
      // console.log("Mouse: " + this.game.mouseBody + " - " + this.clickedBody)
      // this.mouseSpring = this.game.physics.p2.createSpring(this.mouseBody.body, this.clickedBody, 0, 30, 1);
      console.log("Click: ", this.clickedBody, this.mouseBody.body.x, this.mouseBody.body.y);
      this.accelerateToObject(this.clickedBody, this.mouseBody.body, 10);
    }
    this.clickedBody = null;
  }

  accelerateToObject(obj1, obj2, speed) {
    console.log("Accelerating..?");
    if (typeof speed === 'undefined') { speed = 60; }
    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
    obj1.rotation = angle + this.game.math.degToRad(90);  // correct angle of angry bullets (depends on the sprite used)
    const force = Float32Array.of(Math.cos(angle) * speed, Math.sin(angle) * speed);
    obj1.applyForce(force, obj1.x, obj1.y);
    // obj1.force.x = Math.cos(angle) * speed;    // accelerateToObject
    // obj1.force.y = Math.sin(angle) * speed;
  }

  createTeam(team){
    team.players = team.startingLocations.map(coords => {

      return new Player(this.game, coords.x, coords.y, team.name);
    });

    team.players.forEach(player => {
      this.game.physics.p2.enable(player);
      player.body.setZeroDamping();
      player.body.setCircle(16);
      player.body.collideWorldBounds = true;
      player.init();
      this.game.foreground.add(player)
    });

  }

	update(){

    this.mouseBody.body.x = this.game.input.mousePointer.x;
    this.mouseBody.body.y = this.game.input.mousePointer.y;

    console.log("Player coords: ", this.team1.players[0].x, this.team1.players[0].y)
		// Do all your game loop stuff here

    // console.log(this.game.input)
    // console.log("Mouse: " + this.game.input.pointer.x + " - " + this.game.input.pointer.y);


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
