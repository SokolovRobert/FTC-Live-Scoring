$(function() {
  var FADE_TIME = 150; // ms
  var TYPING_TIMER_LENGTH = 400; // ms
  var COLORS = [
  '#e21400', '#91580f', '#f8a700', '#f78b00',
  '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
  '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ];

  // Initialize variables
  var $window = $(window);
  var $usernameInput = $('.usernameInput'); // Input for username
  var $messages = $('.messages'); // Messages area
  var $inputMessage = $('.inputMessage'); // Input message input box


  var $loginPage = $('.login.page'); // The login page
  var $chatPage = $('.chat.page'); // The chatroom page

  // Prompt for setting a username
  var username;
  var connected = false;
  var typing = false;
  var lastTypingTime;
  var $currentInput = $usernameInput.focus();

  var socket = io();

// Click events
  //document.getElementById("setAuto").onclick = function() {setAuto()};
  //document.getElementById("setTele").onclick = function() {setTele()};
  document.getElementById("resetTime").onclick = function() {resetMatch()};
  document.getElementById("startMatch").onclick = function() {startTime()};
  document.getElementById("pause").onclick = function() {pauseTime()};



  function resetMatch() {
    var autoExists=document.getElementById('autoExists');
    var fiveMinTime=document.getElementById('fiveMinTime');
    if(fiveMinTime.checked){
      socket.emit('reset', 2);
    }else if(autoExists.checked){
      socket.emit('reset', 0);
    }else{
      socket.emit('reset', 1);
    }
  	console.log("matchReset");
  }

  function startTime() {
    var autoExists=document.getElementById('autoExists');
    var fiveMinTime=document.getElementById('fiveMinTime');
    if(fiveMinTime.checked){
      socket.emit('startTime', 2);
    }else if(autoExists.checked){
      socket.emit('startTime', 0);
    }else{
      socket.emit('startTime', 1);
    }
    console.log("matchReset");
  }  

  function pauseTime() {
    socket.emit('stopTime');
  }  

});


/* ------------------------------------------ */