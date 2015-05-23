export default class World {
  constructor(worldDescription) {
    worldDescription = worldDescription.split(' ');
    this.width = parseInt(worldDescription[0]);
    this.height = parseInt(worldDescription[1]);
    this.scentedPositions = [];
  }

  contains(position) {
    return (
      position.x >= 0 && position.x <= this.width &&
      position.y >= 0 && position.y <= this.height
    );
  }

  scent(position) {
    this.scentedPositions.push(position);
  }

  isScented(position) {
    for(var i = 0, len = this.scentedPositions.length; i < len; i++) {
      if(this.scentedPositions[i].sameLocation(position)) { return true; }
    }
  }
}
