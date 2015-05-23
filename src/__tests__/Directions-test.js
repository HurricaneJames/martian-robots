import * as Directions from '../Directions';
import expect from 'expect.js';

describe('Directions', function() {
  it('should have the cardinal directions', function() {
    expect(Directions.NORTH).to.be('N');
    expect(Directions.EAST).to.be('E');
    expect(Directions.SOUTH).to.be('S');
    expect(Directions.WEST).to.be('W');
  });
});
