window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
var audio;
var ctx = new AudioContext();
//音频的上下文只有一个，但是音频层却可以有多个
var analyser = ctx.createAnalyser();
var audioSrc;
var frequencyData;
var capYPositionArray = [];

function init(target) {
    audio = target;
    audioSrc = ctx.createMediaElementSource(audio);
    audioData();
}

function audioData () {
    audioSrc.connect(analyser);
    analyser.connect(ctx.destination);
    frequencyData= new Uint8Array(analyser.frequencyBinCount);
    renderFrame(capYPositionArray);
    //audio.play();
}
function renderFrame() {
    var array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);
    var step = Math.round(array.length/window.innerWidth);
    capYPositionArray = [];
    for(var i=0;i<window.innerWidth;i++) {
        var value = array[i*step];
        capYPositionArray.push(value)
    }
    exports.capYPositionArray = capYPositionArray;
    requestAnimationFrame(renderFrame);
}
exports.init = init;

