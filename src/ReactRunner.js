'use strict';

var INPUT_STYLE = { display: 'block' };
var OUTPUT_STYLE = { display: 'block' };
var TEXT_AREA_SIZE = { rows: 25, cols: 80 };

var DEFAULT_SETUP =
`5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL`;

var React = require('react');
var World = require('./World');
var Robot = require('./Robot');
var DefaultInternalWiring = require('./DefaultInternalWiring');

var Hello = React.createClass({
  displayName: 'hello',
  getInitialState: function() {
    return {
      robotSetup: DEFAULT_SETUP,
      results: '',
      showWiring: false,
      wiring: this.getWiring(DefaultInternalWiring),
      wiringModel: DefaultInternalWiring
    };
  },
  changeWiringModel: function() {
    // security hold
    // stopping, out of time :(
  },
  getWiring: function(wiring) {
    return JSON.stringify(wiring, function(key, val) {
      return typeof val === 'function' ? val.toString() : val;
    });
  },
  onChangeSetup: function(e) {
    this.setState({ robotSetup: e.target.value });
  },
  onChangeWiring: function(e) {
    this.setState({wiring: e.target.value});
  },
  resetWiring: function() {
    this.setState({
      wiring: this.getWiring(DEFAULT_SETUP),
      wiringModel: DefaultInternalWiring
    });
  },
  runSetup: function() {
    var lines = this.state.robotSetup.split('\n');
    var world = new World(lines.shift());
    var i = 0;
    var results = [];
    while(i < lines.length) {
      var robot = new Robot(world, lines[i], this.state.wiringModel);
      results.push(robot.followCommands(lines[i + 1]));
      i += 3;
    }
    this.setState({ results: results.join('\n') });
  },
  toggleWiring: function() {
    this.setState({ showWiring: !this.state.showWiring });
  },
  render: function() {
    return (
      <div>
        <label>Input<br />
          <textarea value={this.state.robotSetup} onChange={this.onChangeSetup} {...TEXT_AREA_SIZE} style={INPUT_STYLE} />
        </label>
        {
          this.state.showWiring &&
          <label>Wiring<br />
            <textarea value={this.state.wiring} onChange={this.onChangeWiring} {...TEXT_AREA_SIZE} />
          </label>
        }
        <div>
          <button onClick={this.runSetup}>Run</button>
          <button onClick={this.toggleWiring}>{this.state.showWiring ? 'Hide Wiring' : 'Show Wiring'}</button>
          {
            this.state.showWiring &&
            <button onClick={this.resetWiring}>Reset Wiring</button>
          }
          <button onClick={this.changeWiringModel}>Change Wiring</button>
        </div>
        <label>Output<br />
          <textarea value={this.state.results} {...TEXT_AREA_SIZE} readOnly style={OUTPUT_STYLE} />
        </label>
      </div>
    );
  }
});

React.render(<Hello />, document.getElementById('robots'));

