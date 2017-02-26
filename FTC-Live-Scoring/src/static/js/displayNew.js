var a_or_t = 'a';
var matchTeamData = teamData;

$(function() {

  var socket = io();

  var currMatch = -1;

  var a_r_cen_counter = 0;
  var a_r_cor_counter = 0;
  var a_b_cen_counter = 0;
  var a_b_cor_counter = 0;

  var t_r_cen_counter = 0;
  var t_r_cor_counter = 0;
  var t_b_cen_counter = 0;
  var t_b_cor_counter = 0;

  function addMatch(){
    if(currMatch>=matchTeamData.length-1){
      var $jsValue = document.querySelector('.currMatch');
      $jsValue.innerHTML = "";      
      return;
    }
    currMatch++;
    var $jsValue = document.querySelector('.currMatch');
    $jsValue.innerHTML = "Match "+(currMatch+1);

    if(matchTeamData[currMatch][2] != 0){
      var $jsValue = document.querySelector('.tr3');
      $jsValue.innerHTML = matchTeamData[currMatch][2];   
      var $jsValue = document.querySelector('.tb3');
      $jsValue.innerHTML = matchTeamData[currMatch][5];             
    }else{
      var $jsValue = document.querySelector('.tr3');
      $jsValue.innerHTML = "";   
      var $jsValue = document.querySelector('.tb3');
      $jsValue.innerHTML = "";        
    }

    var $jsValue = document.querySelector('.tb1');
    $jsValue.innerHTML = matchTeamData[currMatch][3];
    var $jsValue = document.querySelector('.tb2');
    $jsValue.innerHTML = matchTeamData[currMatch][4];
    var $jsValue = document.querySelector('.tr1');
    $jsValue.innerHTML = matchTeamData[currMatch][0];
    var $jsValue = document.querySelector('.tr2');
    $jsValue.innerHTML = matchTeamData[currMatch][1];                
  }


  function subMatch(){
    if(currMatch<=0){
      return;
    }
    currMatch--;
    var $jsValue = document.querySelector('.currMatch');
    $jsValue.innerHTML = "Match "+(currMatch+1);
    if(matchTeamData[currMatch][2] != 0){
      var $jsValue = document.querySelector('.tr3');
      $jsValue.innerHTML = matchTeamData[currMatch][2];   
      var $jsValue = document.querySelector('.tb3');
      $jsValue.innerHTML = matchTeamData[currMatch][5];             
    }else{
      var $jsValue = document.querySelector('.tr3');
      $jsValue.innerHTML = "";   
      var $jsValue = document.querySelector('.tb3');
      $jsValue.innerHTML = "";        
    }

    var $jsValue = document.querySelector('.tb1');
    $jsValue.innerHTML = matchTeamData[currMatch][3];
    var $jsValue = document.querySelector('.tb2');
    $jsValue.innerHTML = matchTeamData[currMatch][4];
    var $jsValue = document.querySelector('.tr1');
    $jsValue.innerHTML = matchTeamData[currMatch][0];
    var $jsValue = document.querySelector('.tr2');
    $jsValue.innerHTML = matchTeamData[currMatch][1];      
  }

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
        var $jsValue = document.getElementById("topImg");
        $jsValue.src = "assets/pics/tele.png";
        stopwatch.resetNoAuto(); 
      }else if(data.auto == 1){
        //yes auto
        a_or_t = 'a';
        var $jsValue = document.getElementById("topImg");
        $jsValue.src = "assets/pics/auto.png";  
        stopwatch.reset(); 
      }else if(data.auto ==2){
        //5 min timer
        stopwatch.resetFiveMinTime(); 
      }
      localReset();
  });

  socket.on('startTime', function (){
      console.log("startTime");
      stopwatch.start();
  });

  socket.on('stopTime', function (){
      console.log("stopTime");
      stopwatch.stop();
  });

  socket.on('addMatch', function (){
      addMatch();
  });

    socket.on('subMatch', function (){
      subMatch();
  });

});


/* ------------------------------------------ */