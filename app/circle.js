'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ReactCanvas = require('react-canvas');
var audio= require('./audio/audio.js');
var Group = ReactCanvas.Group;
const gravity =1;
const reduction =-0.5;
const circleTotal =30;
var horizontalVelocity = [];
var yPos = [];
var JumpBoo = [];
var aniArr =[];
var colorInit = '#ff0000';
var Circle = React.createClass({

  getInitialState:function() {
    var propArr =[];
    for(var i=0;i<circleTotal;i++) {
      var size = 20+10*Math.random();
      propArr.push({
        width: size,
        height: size,
        left:Math.round(window.innerWidth*Math.random()),
        top:Math.round(window.innerHeight-size),
        backgroundColor:this.getRandomColor(),
        borderRadius:Math.round(size/2)
      })
      JumpBoo.push(true);
      yPos.push(0);
      horizontalVelocity.push(1);
    }
    return {propArr};
  },

  componentDidMount:function(){
    colorInit = this.getRandomColor();
    this.generateAnimation();
    
  },

  generateAnimation:function(){
    for(var i=0;i<circleTotal;i++) {
      cancelAnimationFrame(aniArr[i]);
      this.generateMovement(i)
    }
  },

  generateGroup:function() {
    let circleArr =[];
    for(var i=0;i<circleTotal;i++) {
      circleArr.push(<Group key={""+i} ref="charater" style={this.getPageStyle(i)}></Group>)
    }
    return <Group>{circleArr}</Group>
  },

  render:function() {
    var size = this.getSize();
    return (
      <Group>
        {this.generateGroup()}
      </Group>
      )
  }, 

  getSize:function () {
    return document.getElementById('main').getBoundingClientRect();
  },

  getPageStyle:function (i) {
    return this.state.propArr[i];
  }, 

  generateMovement:function(i) {
    //这里应该现在屏幕中找到对应的点位
    //console.log(audio.capYPositionArray);
    var me = this;
    if(audio.capYPositionArray && audio.capYPositionArray.length>0){
      if(JumpBoo[i]) {
        yPos[i] = audio.capYPositionArray[Math.round(this.state.propArr[i].left)] * (-0.1);
        JumpBoo[i] = false;
      }else{
        yPos[i]+=gravity;
        if(this.state.propArr[i].left>=window.innerWidth-this.state.propArr[i].width) {
          horizontalVelocity[i] =-1
        }else if(this.state.propArr[i].left<=0) {
          horizontalVelocity[i] = 1
        }
        var propArrNew = this.state.propArr.concat();
        propArrNew[i].top = this.state.propArr[i].top+ yPos[i];
        propArrNew[i].left = this.state.propArr[i].left+ horizontalVelocity[i];
        this.setState({
          propArr:propArrNew
        })
        if(this.state.propArr[i].top>=window.innerHeight-this.state.propArr[i].height) {
          yPos[i]*=reduction
          if(Math.abs(yPos[i])<=0.5) {
            yPos[i] = 0;
            var propArrNew = this.state.propArr.concat();
            propArrNew[i].top = window.innerHeight - this.state.propArr[i].height;
            this.setState({
              propArr:propArrNew
            })
            JumpBoo[i] = true;
          }
        }
      }
    }
    aniArr[i] = requestAnimationFrame(me.generateAnimation);
  },

  getRandomColor: function(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  }

});

module.exports = Circle