import GameObject from 'objects/GameObject';
class Player extends GameObject {

  constructor(game, x, y, teamNumber){
    super(game, x, y, 'team'+ teamNumber, 0);
    this.game = game;
  }

  update(){
    super.update();
    // Then do whatever you want to do...
  }

}

export default Player;
