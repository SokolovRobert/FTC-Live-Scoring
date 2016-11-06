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

  function addScore(zone) {
  	socket.emit('addScore', zone);
  	console.log("scoreSent");
  }

  function subScore(zone) {
  	socket.emit('subScore', zone);
  	console.log("scoreSent");
  }

  function resetMatch() {
  	socket.emit('reset');
  	console.log("matchReset");
  }

  function localReset(){
  	  r_cen_counter = 0;
	  r_cor_counter = 0;
	  b_cen_counter = 0;
	  b_cor_counter = 0;

	['.bcor'].forEach(function(elementId) {
		var $jsValue = document.querySelector(elementId);
		$jsValue.innerHTML = 0;
    });	  
  }

  // Prevents input from having injected markup
  function cleanInput (input) {
  	return $('<div/>').text(input).text();
  }

  var r_cen_counter = 0;
  var r_cor_counter = 0;
  var b_cen_counter = 0;
  var b_cor_counter = 0;

    //$jsValue.addEventListener('button', function(event){
    	function add(name, num) {
    		var $jsValue = document.querySelector(name);
    		var temp = 0;
    		switch(num){
    			case 1:
    			r_cen_counter++;
    			temp = r_cen_counter;
    			break;
    			case 2:
    			r_cor_counter++;
    			temp = r_cor_counter;
    			break;
    			case 3:
    			b_cen_counter++;
    			temp = b_cen_counter;
    			break;
    			case 4:
    			b_cor_counter++;
    			temp = b_cor_counter;
    			break;
    			default:
    			break;
    		}
    		$jsValue.innerHTML = temp;
    		addScore(num);
    	}

    	function sub(name, num) {
    		var $jsValue = document.querySelector(name);
    		var temp = 0;
    		switch(num){
    			case 1:
    			if(r_cen_counter>0){
    				r_cen_counter--;
    				temp = r_cen_counter;
    			}
    			break;
    			case 2:
    			if(r_cor_counter>0){
    				r_cor_counter--;
    				temp = r_cor_counter;
    			}
    			break;
    			case 3:
    			if(b_cen_counter>0){
    				b_cen_counter--;
    				temp = b_cen_counter;
    			}
    			break;
    			case 4:
    			if(b_cor_counter>0){
    				b_cor_counter--;
    				temp = b_cor_counter;
    			}
    			break;
    			default:
    			break;
    		}
    		$jsValue.innerHTML = temp;
    		subScore(num);
    	}

  // Keyboard events

  $window.keydown(function (event) {
    // Auto-focus the current input when a key is typed
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
    	$currentInput.focus();
    }
    // When the client hits ENTER on their keyboard
    if (event.which === 13) {
    	if (username) {
    		sendMessage();
    		socket.emit('stop typing');
    		typing = false;
    	} else {
    		setUsername();
    	}
    }
});

  // Click events
  //document.getElementById("b1p").onclick = function() {add('.bcen', 3)};
  //document.getElementById("b1m").onclick = function() {sub('.bcen', 3)};
  document.getElementById("b2p").onclick = function() {add('.bcor', 4)};
  document.getElementById("b2m").onclick = function() {sub('.bcor', 4)};

  // Socket events
  // Whenever the server emits 'new message', update the chat body
  socket.on('reset', function (data){
  		console.log("gotReset");
  		localReset();
  });

  socket.on('setAuto', function (){
  		console.log("gotAuto");
  		localReset();
  });

  socket.on('setTele', function (){
  		console.log("gotTele");
  		localReset();
  });

  socket.on('new message', function (data) {
    //addChatMessage(data);
    console.log("Got a new message!");
});

  socket.on('newScore', function (data){
  	console.log("Got score: ");
  });
});


/* ------------------------------------------ */