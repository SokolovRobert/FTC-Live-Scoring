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

  var a_r_cen_counter = 0;
  var a_r_cor_counter = 0;
  var a_b_cen_counter = 0;
  var a_b_cor_counter = 0;

  var t_r_cen_counter = 0;
  var t_r_cor_counter = 0;
  var t_b_cen_counter = 0;
  var t_b_cor_counter = 0;


  var a_or_t = 'a';

  function updateScore(name, num){
    var $jsValue = document.querySelector(name);
    $jsValue.innerHTML = num;
  }

  function addScore(zone) {
    var newZone = zone.zone;
  	console.log("scoreGot-add "+ newZone);
    var tempName;
    var tempNum;
    if(a_or_t == 'a'){
      switch(newZone){
        case 1: //r-cen
          a_r_cen_counter++;
          tempName = '.rcena';
          tempNum = a_r_cen_counter;
          break;
        case 2: //r-cor
          a_r_cor_counter++;
          tempName = '.rcora';
          tempNum = a_r_cor_counter;
          break;
        case 3: //b-cen
          a_b_cen_counter++;
          tempName = '.bcena';
          tempNum = a_b_cen_counter;
          break;
        case 4: //b-cor
          a_b_cor_counter++;
          tempName = '.bcora';
          tempNum = a_b_cor_counter;
          break;
        default: //error
        break;
      }
    }else if(a_or_t == 't'){
      switch(newZone){
        case 1: //r-cen
          t_r_cen_counter++;
          tempName = '.rcent';
          tempNum = t_r_cen_counter;
          break;
        case 2: //r-cor
          t_r_cor_counter++;
          tempName = '.rcort';
          tempNum = t_r_cor_counter;
          break;
        case 3: //b-cen
          t_b_cen_counter++;
          tempName = '.bcent';
          tempNum = t_b_cen_counter;
          break;
        case 4: //b-cor
          t_b_cor_counter++;
          tempName = '.bcort';
          tempNum = t_b_cor_counter;
          break;
        default: //error
        break;
      }
    }else{

    }
  updateScore(tempName, tempNum);
  }

  function subScore(zone) {
    var newZone = zone.zone;
    console.log("scoreGot-sub "+ newZone);
    var tempName;
    var tempNum;
    if(a_or_t == 'a'){
      switch(newZone){
        case 1: //r-cen
          if(a_r_cen_counter>0){
            a_r_cen_counter--;
            tempName = '.rcena';
            tempNum = a_r_cen_counter;
          }
          break;
        case 2: //r-cor
        if(a_r_cor_counter>0){
          a_r_cor_counter--;
          tempName = '.rcora';
          tempNum = a_r_cor_counter;
        }
          break;
        case 3: //b-cen
        if(a_b_cen_counter>0){
          a_b_cen_counter--;
          tempName = '.bcena';
          tempNum = a_b_cen_counter;
        }
          break;
        case 4: //b-cor
        if(a_b_cor_counter>0){
          a_b_cor_counter--;
          tempName = '.bcora';
          tempNum = a_b_cor_counter;
        }
          break;
        default: //error
        break;
      }
    }else if(a_or_t == 't'){
      switch(newZone){
        case 1: //r-cen
        if(t_r_cen_counter>0){
          t_r_cen_counter--;
          tempName = '.rcent';
          tempNum = t_r_cen_counter;
        }
          break;
        case 2: //r-cor
        if(t_r_cor_counter>0){
          t_r_cor_counter--;
          tempName = '.rcort';
          tempNum = t_r_cor_counter;
        }
          break;
        case 3: //b-cen
        if(t_b_cen_counter>0){
          t_b_cen_counter--;
          tempName = '.bcent';
          tempNum = t_b_cen_counter;
        }
          break;
        case 4: //b-cor
        if(t_b_cor_counter>0){
          t_b_cor_counter--;
          tempName = '.bcort';
          tempNum = t_b_cor_counter;
        }
          break;
        default: //error
        break;
      }
    }else{

    }
  updateScore(tempName, tempNum);
  }

  function resetMatch() {
  	socket.emit('reset');
  	console.log("matchReset");
  }

  function localReset(){
    //TODO: Add timer in here
    a_r_cen_counter = 0;
    a_r_cor_counter = 0;
    a_b_cen_counter = 0;
    a_b_cor_counter = 0;

    t_r_cen_counter = 0;
    t_r_cor_counter = 0;
    t_b_cen_counter = 0;
    t_b_cor_counter = 0;

  ['.rcena', '.rcora', '.bcena', '.bcora', '.rcent', '.rcort', '.bcent', '.bcort'].forEach(function(elementId) {
    var $jsValue = document.querySelector(elementId);
    $jsValue.innerHTML = 0;
    });      
  }

  // Socket events
  // Whenever the server emits 'new message', update the chat body
  socket.on('addScore', function (data) {
    addScore(data);
    console.log("Got a new message!");
});

  socket.on('subScore', function (data){
    subScore(data);
  	console.log("Got score: ");
  });

  socket.on('reset', function (data){
      console.log("gotReset " + data.auto);
      if(data.auto == 0){
        //no auto
        a_or_t = 't';
        var $jsValue = document.querySelector('.curStat');
        $jsValue.innerHTML = "Current: Tele";  
      }else{
        //yes auto
        a_or_t = 'a';
        var $jsValue = document.querySelector('.curStat');
        $jsValue.innerHTML = "Current: Auto";
      }
      localReset();
  });

  socket.on('setAuto', function (){
      console.log("gotAuto");
      a_or_t = 'a';
      var $jsValue = document.getElementById("topImg");
      $jsValue.src = "assets/pics/auto.png";  
  });

  socket.on('setTele', function (){
      console.log("gotTele");
      a_or_t = 't';
      var $jsValue = document.getElementById("topImg");
      $jsValue.src = "assets/pics/tele.png";      
  });

  socket.on('startTime', function (){
      console.log("startTime");
      stopwatch.start();
      //a_or_t = 't';
      //var $jsValue = document.querySelector('.curStat');
      //$jsValue.innerHTML = "Current: Tele";      
  });

});


/* ------------------------------------------ */