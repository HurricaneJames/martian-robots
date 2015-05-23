import Position from './Position';
import World from './World';
import DefaultInternalWiring from './DefaultInternalWiring';
import { NORTH, EAST, SOUTH, WEST } from './Directions';

const GOOD = '';
const LOST = 'LOST';
const CONFUSED = 'CONFUSED';

export default class Robot {
  constructor(world, position, internalWiring) {
    this.world = world instanceof World ? world : new World(world);
    this.position = new Position(position);
    this.internalWiring = internalWiring || DefaultInternalWiring;
    this.status = GOOD;
  }

  followCommand(command) {
    var commandFunction = this.internalWiring[command];
    return commandFunction ? commandFunction(this) : CONFUSED;
  }

  followCommands(commandString) {
    var commands = commandString.split('');
    var newPosition;
    for(var i = 0, len = commands.length; i < len; i++) {
      newPosition = this.followCommand(commands[i]);
      if(newPosition === LOST || newPosition === CONFUSED) {
        return this.position.toString() + ' ' + newPosition;
      }else {
        this.position = newPosition;
      }
    }
    return this.position.toString();
  }

  getLost() {
    this.world.scent(this.position);
    this.status = LOST;
    return this.status;
  }

}
