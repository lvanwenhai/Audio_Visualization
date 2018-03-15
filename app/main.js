'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ReactCanvas = require('react-canvas');
var Circle = require('./circle.js');
var BackMus = require('./BackMus.js');
var Surface = ReactCanvas.Surface;
var Group = ReactCanvas.Group;
//var Items = {'Circle0':circle.circleObj['circle0']};
var App = React.createClass({

  componentDidMount(){
    
  },

  bindClick(){
    
  },



  //感觉需要参考listview来进行组件内外的修改
  render: function () {
    var size = this.getSize();

    return (
      <Surface top={0} left={0} width={size.width} height={size.height}>
        <BackMus/>
        <Circle/>
      </Surface>
    );
  },

  getSize: function () {
    return document.getElementById('main').getBoundingClientRect();
  }

});

ReactDOM.render(<App />, document.getElementById('main'));