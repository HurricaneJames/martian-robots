import World from '../World';
import Position from '../Position';
import expect from 'expect.js';

describe('World', function() {
  it('should accept world notation', function() {
    var world = new World('5 3');
    expect(world.width).to.be(5);
    expect(world.height).to.be(3);
  });

  it('should know if it contains a Position', function() {
    var world = new World('5 3');
    expect(world.contains(new Position({x: 5, y: 5}))).not.to.be.ok();
    expect(world.contains(new Position({x: 5, y: 3}))).to.be.ok();
    expect(world.contains(new Position({x: 0, y: 0}))).to.be.ok();
    expect(world.contains(new Position({x: 5, y: 2}))).to.be.ok();
    expect(world.contains(new Position({x: 4, y: 3}))).to.be.ok();
    expect(world.contains(new Position({x: 4, y: 2}))).to.be.ok();
  });

  it('should be able to scent a position', function() {
    var world = new World('5 3');
    var point = new Position('2 2');
    world.scent(point);
    expect(world.isScented(point)).to.be.ok();
  });

  it('should be able to scent multiple positions', function() {
    var world = new World('5 3');
    var point = new Position('2 2');
    var point2 = new Position('3 3');
    world.scent(point);
    world.scent(point2);
    expect(world.isScented(point)).to.be.ok();
    expect(world.isScented(point2)).to.be.ok();
  });
});
