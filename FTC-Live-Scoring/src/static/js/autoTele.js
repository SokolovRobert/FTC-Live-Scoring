$(function() {

  var socket = io();

// Click events
  //document.getElementById("setAuto").onclick = function() {setAuto()};
  //document.getElementById("setTele").onclick = function() {setTele()};
  document.getElementById("resetTime").onclick = function() {resetMatch()};
  document.getElementById("autoStart").onclick = function() {autoStart()};
  document.getElementById("teleStart").onclick = function() {teleStart()};

  function resetMatch() {
    socket.emit('reset', 1);
  	console.log("matchReset");

    var $jsValue = document.querySelector('.current');
    $jsValue.innerHTML = "Current: Auto";
  }

  function autoStart(){
    socket.emit('startTime', 1);
    var $jsValue = document.querySelector('.current');
    $jsValue.innerHTML = "Current: Auto";    
  }

  function teleStart(){
    socket.emit('startTime', 0);
    var $jsValue = document.querySelector('.current');
    $jsValue.innerHTML = "Current: Tele";    
  }

});