import GameObject from 'objects/GameObject';
class Player extends GameObject {

  constructor(game, x, y, teamName){
    super(game, x, y, teamName, 0);
    this.game = game;
    this.speedX = 0;
    this.speedY = teamName ==='team1' ?  100 : -100;
    this.anchor.set(0.5);
  }

  init(){
    this.body.velocity.x += this.speedX;
    this.body.velocity.y = this.speedY;
  }

  update(){
    super.update();

    // Then do whatever you want to do...
  }

}

export default Player;
