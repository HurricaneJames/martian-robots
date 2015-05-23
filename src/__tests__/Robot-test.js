import Robot from '../Robot';
import World from '../World';
import Position from '../Position';
import { NORTH, EAST, SOUTH, WEST } from '../Directions';
import expect from 'expect.js';

var DEFAULT_WORLD = '5 3';
describe('Robot', function() {
  it('should create a new robot from a position description', function() {
    var r = new Robot(DEFAULT_WORLD);

    expect(r.world instanceof World).to.be.ok();
    expect(r.position instanceof Position).to.be.ok();
    expect(r.position.x).to.be(0);
    expect(r.position.y).to.be(0);
    expect(r.position.orientation).to.be(NORTH);
    expect(r.status).to.be('');
  });

  it('should create a new robot using an existing world', function() {
    var world = new World(DEFAULT_WORLD);
    var r = new Robot(world);
    expect(r.world).to.be(world);
  });

  it('should create a new robot from a world description and a position description', function() {
    var r = new Robot(DEFAULT_WORLD, '1 1 E');
    expect(r.world.width).to.be(5);
    expect(r.world.height).to.be(3);

    expect(r.position instanceof Position).to.be.ok();
    expect(r.position.x).to.be(1);
    expect(r.position.y).to.be(1);
    expect(r.position.orientation).to.be(EAST);
    expect(r.status).to.be('');
  });

  it('should create a robot with different internal wiring');

  it('should output the new robot status at the end of a command sequence', function() {
    var world = new World(DEFAULT_WORLD);
    var r = new Robot(world, '1 1 E');

    var output = r.followCommands('RFRFRFRF');
    expect(output).to.be('1 1 E');

    r = new Robot(world, '3 2 N');
    output = r.followCommands('FRRFLLFFRRFLL');
    expect(output).to.be('3 3 N LOST');

    r = new Robot(world, '0 3 W');
    output = r.followCommands('LLFFFLFLFL');
    expect(output).to.be('2 3 S');
  });

  it('should be able to getLost', function() {
    var r = new Robot(DEFAULT_WORLD, '1 1 E');
    var newStatus = r.getLost();
    expect(r.status).to.be('LOST');
    expect(r.world.isScented(new Position('1 1 E'))).to.be.ok();
    expect(newStatus).to.be('LOST');
  });

});
