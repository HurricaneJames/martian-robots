import expect from 'expect.js';
import { NORTH, EAST, SOUTH, WEST } from '../Directions';
import Position from '../Position';

describe('Position', function() {
  describe('Constructor', function() {
    it('should default to [0, 0, N]', function() {
      var p = new Position();
      expect(p.x).to.be(0);
      expect(p.y).to.be(0);
      expect(p.orientation).to.be(NORTH);
    });

    it('should clone an item from another item', function() {
      var p = new Position();
      p.x = 1;
      p.y = 2;
      p.orientation = SOUTH;

      var newP = new Position(p);
      expect(newP.x).to.be(1);
      expect(newP.y).to.be(2);
      expect(newP.orientation).to.be(SOUTH);
    });

    it('should create from an array', function() {
      var p = new Position([5, 3, WEST]);
      expect(p.x).to.be(5);
      expect(p.y).to.be(3);
      expect(p.orientation).to.be(WEST);
    });

    it('should create from a position string', function() {
      var p = new Position('1 3 E');
      expect(p.x).to.be(1);
      expect(p.y).to.be(3);
      expect(p.orientation).to.be(EAST);
    });

    it('should create a position from a string with no orientation', function() {
      var p = new Position('1 3');
      expect(p.x).to.be(1);
      expect(p.y).to.be(3);
      expect(p.orientation).to.be(NORTH);
    });

    it('should create from an object', function() {
      var position = {x: 2, y: 3, orientation: SOUTH};
      var p = new Position(position);
      expect(p.x).to.be(position.x);
      expect(p.y).to.be(position.y);
      expect(p.orientation).to.be(position.orientation);
    });


    it('should fill in defaults for properties when creating from an object', function() {
      var p = new Position({ x: 2 });
      expect(p.x).to.be(2);
      expect(p.y).to.be(0);
      expect(p.orientation).to.be(NORTH);

      p = new Position({ y: 2 });
      expect(p.x).to.be(0);
      expect(p.y).to.be(2);
      expect(p.orientation).to.be(NORTH);

      p = new Position({ orientation: SOUTH });
      expect(p.x).to.be(0);
      expect(p.y).to.be(0);
      expect(p.orientation).to.be(SOUTH);

    });
  });

  it('should support toString', function() {
    var p = new Position('1 2 E');
    expect(p.toString()).to.be('1 2 E');
  });

  describe('equals', function() {
    it('should return true if both positions have the same x, y, and orientation', function() {
      var p = new Position([3, 2, SOUTH]);
      var compP = [
        new Position([3, 2, SOUTH]),
        new Position([3, 2, NORTH]),
        new Position([4, 2, SOUTH])
      ];
      expect(p.equals(compP[0])).to.be.ok();
      expect(p.equals(compP[1])).not.to.be.ok();
      expect(p.equals(compP[2])).not.to.be.ok();
    });
  });

  it('should return true if both positions are on the same point', function() {
    var p = new Position([3, 2, SOUTH]);
    var compP = new Position([3, 2, EAST]);
    expect(p.sameLocation(compP)).to.be.ok();
  });

  describe('moveForward', function() {
    it('should return a new position', function() {
      var p = new Position();
      var newP = p.moveForward(1);
      expect(p).not.to.be(newP);
      expect(p.equals(new Position())).to.be.ok();
    });
    it('should advance y by 1 if facing north', function() {
      var p = new Position({ orientation: NORTH });
      var newP = p.moveForward();
      expect(newP.equals(new Position([0, 1, NORTH]))).to.be.ok();
    });
    it('should advance x by 1 if facing east', function() {
      var p = new Position({ orientation: EAST });
      var newP = p.moveForward();
      expect(newP.equals(new Position([1, 0, EAST]))).to.be.ok();
    });
    it('should advance y by -1 if facing south', function() {
      var p = new Position({ orientation: SOUTH });
      var newP = p.moveForward();
      expect(newP.equals(new Position([0, -1, SOUTH]))).to.be.ok();
    });
    it('should advance x by -1 if facing west', function() {
      var p = new Position({ orientation: WEST });
      var newP = p.moveForward();
      expect(newP.equals(new Position([-1, 0, WEST]))).to.be.ok();
    });
  });

  describe('turnClockwise', function() {
    it('should return a new position', function() {
      var p = new Position();
      var np = p.turnClockwise();
      expect(np).not.to.be(p);
      expect(p.equals(new Position())).to.be.ok();
    });
    it('should not touch x, y properties', function() {
      var p = new Position();
      var np = p.turnClockwise();
      expect(np.x).to.be(p.x);
      expect(np.y).to.be(p.y);
    });
    it('should turn N to E', function() {
      var p = new Position({ orientation: NORTH }).turnClockwise();
      expect(p.orientation).to.be(EAST);
    });
    it('should turn E to S', function() {
      var p = new Position({ orientation: EAST }).turnClockwise();
      expect(p.orientation).to.be(SOUTH);
    });
    it('should turn S to W', function() {
      var p = new Position({ orientation: SOUTH }).turnClockwise();
      expect(p.orientation).to.be(WEST);
    });
    it('should turn W to N', function() {
      var p = new Position({ orientation: WEST }).turnClockwise();
      expect(p.orientation).to.be(NORTH);
    });
  });

  describe('turnAntiClockwise', function() {
    it('should return a new position', function() {
      var p = new Position();
      var np = p.turnAntiClockwise();
      expect(np).not.to.be(p);
      expect(p.equals(new Position())).to.be.ok();
    });
    it('should not touch x, y properties', function() {
      var p = new Position();
      var np = p.turnAntiClockwise();
      expect(np.x).to.be(p.x);
      expect(np.y).to.be(p.y);
    });
    it('should turn N to W', function() {
      var p = new Position({ orientation: NORTH }).turnAntiClockwise();
      expect(p.orientation).to.be(WEST);
    });
    it('should turn E to N', function() {
      var p = new Position({ orientation: EAST }).turnAntiClockwise();
      expect(p.orientation).to.be(NORTH);
    });
    it('should turn S to E', function() {
      var p = new Position({ orientation: SOUTH }).turnAntiClockwise();
      expect(p.orientation).to.be(EAST);
    });
    it('should turn W to S', function() {
      var p = new Position({ orientation: WEST }).turnAntiClockwise();
      expect(p.orientation).to.be(SOUTH);
    });
  });
});
