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
  document.getElementById("submitTeams").onclick = function() {submitTeams()};
  document.getElementById("resetTime").onclick = function() {resetMatch()};
  document.getElementById("startMatch").onclick = function() {startTime()};
  document.getElementById("pause").onclick = function() {pauseTime()};

  document.getElementById("addMatch").onclick = function() {addMatch()};
  document.getElementById("subMatch").onclick = function() {subMatch()};

  function submitTeams(){
    var r1 = document.getElementById("red1").value;
    var r2 = document.getElementById("red2").value;
    var r3 = document.getElementById("red3").value;
    var b1 = document.getElementById("blue1").value;
    var b2 = document.getElementById("blue2").value;
    var b3 = document.getElementById("blue3").value;
    var matchNum = document.getElementById("matchNum").value;

    var matchDetails = [matchNum, r1, r2, r3, b1, b2, b3];

    socket.emit('editTeams', matchDetails);
    console.log(matchDetails);
  }

  function addMatch(){
    socket.emit('addMatch');
  }

  function subMatch(){
    socket.emit('subMatch');
  }

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