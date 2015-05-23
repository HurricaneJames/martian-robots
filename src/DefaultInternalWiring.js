export default {
  F: function(robot) {
    var newPosition = robot.position.moveForward();
    if(!robot.world.contains(newPosition)) {
      return !robot.world.isScented(robot.position) ? robot.getLost() : robot.position;
    }else {
      return newPosition;
    }
  },
  R: function(robot) {
    return robot.position.turnClockwise();
  },
  L: function(robot) {
    return robot.position.turnAntiClockwise();
  }
};