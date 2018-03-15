'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ReactCanvas = require('react-canvas');
var $ = require('jquery');
var Group = ReactCanvas.Group;
var data = require('../common/data.js')
var audioAni = require('./audio/audio.js');
var playArr= [];
var colorArr =[];
var BackMus = React.createClass({

  componentDidMount:function(){
    let me = this;
    for(var i=0;i<data.length;i++) {
      var audio = document.createElement('audio');
      audio.controls = false;
      audio.src = data[i].src;
      audio.id = 'audio'+i;
      if(i<30) {
        audio.loop = true;
      }else{
        audio.loop = false;
      }
      document.body.appendChild(audio);
      audioAni.init(audio);
    }
    setInterval(me.playMus,3428);
  },

  generateBackMus:function() {
    let musArr =[];
    for(var i=0;i<48;i++) {
      musArr.push(<Group key={"mus"+i} ref="charater" style={this.getMusStyle(i)} onClick={this.generateMus.bind(this,i)}/>)
    }
    return <Group>{musArr}</Group>
  },

  generateMus:function(label) {
    //前5行每行只能有一个打开
    var len = playArr.length;
    var boo = false;
    if(playArr.length>0) {
      if(label<30) {
        if(playArr.indexOf(label)>=0) {
          var index = playArr.indexOf(label);
          document.getElementById('audio'+label).pause();
          document.getElementById('audio'+label).src="";
          //点击20和21会不关闭
          this.stopColorAni(playArr[index])
          playArr.splice(index,1)
        }else{
          for(var i=0;i<len;i++) {
            if(Math.floor(playArr[i]/6)==Math.floor(label/6)) {
              boo = true;
              document.getElementById('audio'+playArr[i]).pause();
              document.getElementById('audio'+playArr[i]).src="";
              playArr[i] = label;
            }
          }
          if(!boo){
            playArr.push(label);
          }
        }     
      }else{
        var index = playArr.indexOf(label) ;
        if(index>=0) {
          document.getElementById('audio'+label).pause();
          document.getElementById('audio'+label).src="";
          //2，相应状态
          //3，加载进度
          this.stopColorAni(playArr[index])
          playArr.splice(index,1);
        }else{
          playArr.push(label);
        }
      }
    }else{
      playArr.push(label);
    }
  },

  playMus:function() {
    for(var i =0;i<playArr.length;i++) {
      var target = document.getElementById('audio'+playArr[i]);
      this.generateColorAni(i);
      if(target.currentTime>0){
      }else{
        target.src = data[playArr[i]].src;
        target.play();
        if(playArr[i]>30) {
          $('#audio'+playArr[i]).off('ended').on('ended',function(e){
            e.target.currentTime =0;
            e.target.pause();
            var index = playArr.indexOf(playArr[i]);
            this.stopColorAni(playArr[i]);
            playArr.splice(index,1);            
          })
        }
      }
    }
  },

  render:function() {
    return (
      <Group>
        {this.generateBackMus()}
      </Group>
      )
  }, 
  generateColorAni:function(i) {
    setInterval(function(){
      colorArr[i] = '#'+Math.floor(Math.random()*16777215).toString(16);
    },342)
  },
  stopColorAni:function(i) {
    colorArr[i] = '#0000'+Math.floor((i+1)*5).toString(16);
  },
  getMusStyle:function(i) {
    var width = window.innerWidth/6;
    var height = window.innerHeight/8;
    colorArr.push('#0000'+Math.floor((i+1)*5).toString(16))
    return {
      width: width,
      height: height,
      left:width*(i%6),
      top:height*Math.floor(i/6),
      backgroundColor:colorArr[i]
    }
  }

});

module.exports = BackMus