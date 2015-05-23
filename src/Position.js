import { NORTH, EAST, SOUTH, WEST } from './Directions';

const DEFAULT_X = 0;
const DEFAULT_Y = 0;
const DEFAULT_ORIENTATION = NORTH;

var descriptionToOrientation = function(description) {
  switch(description.toUpperCase()) {
    case NORTH: return NORTH;
    case EAST:  return EAST;
    case SOUTH: return SOUTH;
    case WEST:  return WEST;
  }
};


export default class Position {

  constructor() {
    var position = arguments[0] || {};
    if(position instanceof Array) {
      this.x = position[0];
      this.y = position[1];
      this.orientation = position[2];
    }else if(position instanceof Position) {
      this.x = position.x;
      this.y = position.y;
      this.orientation = position.orientation;
    }else if(typeof position === 'string') {
      position = position.split(' ');
      this.x = parseInt(position[0]);
      this.y = parseInt(position[1]);
      this.orientation = position[2] ? descriptionToOrientation(position[2]) : DEFAULT_ORIENTATION;
    }else if(position instanceof Object) {
      this.x = position.x || DEFAULT_X;
      this.y = position.y || DEFAULT_Y;
      this.orientation = position.orientation || DEFAULT_ORIENTATION;
    }
  }

  toString() {
    return this.x + ' ' + this.y + ' ' + this.orientation;
  }

  equals(position) {
    return (
      this.x === position.x &&
      this.y === position.y &&
      this.orientation === position.orientation
    );
  }

  sameLocation(position) {
    return (
      this.x === position.x &&
      this.y === position.y
    );
  }

  moveForward(steps) {
    steps = steps || 1;
    switch(this.orientation) {
      case NORTH:
        return new Position([this.x,         this.y + steps, this.orientation]);
      case EAST:
        return new Position([this.x + steps, this.y,         this.orientation]);
      case SOUTH:
        return new Position([this.x,         this.y - steps, this.orientation]);
      case WEST:
        return new Position([this.x - steps, this.y,         this.orientation]);
    }
  }

  turnClockwise() {
    switch(this.orientation) {
      case NORTH:
        return new Position([this.x, this.y, EAST]);
      case EAST:
        return new Position([this.x, this.y, SOUTH]);
      case SOUTH:
        return new Position([this.x, this.y, WEST]);
      case WEST:
        return new Position([this.x, this.y, NORTH]);
    }
    return new Position(this);
  }

  turnAntiClockwise() {
    switch(this.orientation) {
      case NORTH:
        return new Position([this.x, this.y, WEST]);
      case EAST:
        return new Position([this.x, this.y, NORTH]);
      case SOUTH:
        return new Position([this.x, this.y, EAST]);
      case WEST:
        return new Position([this.x, this.y, SOUTH]);
    }
    return new Position(this);
  }
}