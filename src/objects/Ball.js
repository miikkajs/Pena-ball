import GameObject from 'objects/GameObject';
class Player extends GameObject {

  constructor(game, x, y){
    super(game, x, y, 'ball', 0);
    this.game = game;
    this.anchor.set(0.5);
  }

  update(){
    super.update();
    // Then do whatever you want to do...
  }

}

export default Player;
