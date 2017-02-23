module.exports = { 
    getMatchData: function(){
        var inputText = "";
        fs = require('fs')
        fs.readFile('../../matches.txt', 'utf8', function (err,data) {
          if (err) {
            return console.log(err);
          }
          inputText = data;
          //console.log(data);
          var x;
          for(x=0; x<inputText.split(/\r\n|\r|\n/).length; x++){
              var firstLine = inputText.split('\n')[x];
              console.log(firstLine);

              var start = firstLine.indexOf("|");
              var fin = firstLine.indexOf("|",start+1);

              var matchType = firstLine.substring(1+start,fin);
              start = firstLine.indexOf("|",fin);
              fin = firstLine.indexOf("|",start+1);
        
              var matchNumber = firstLine.substring(1+start,fin);
              start = firstLine.indexOf("|",fin);
              fin = firstLine.indexOf("|",start+1);

              var red1 = firstLine.substring(1+start,fin);
              start = firstLine.indexOf("|",fin);
              fin = firstLine.indexOf("|",start+1);

              var red2 = firstLine.substring(1+start,fin);
              start = firstLine.indexOf("|",fin);
              fin = firstLine.indexOf("|",start+1);          

              var red3 = firstLine.substring(1+start,fin);
              start = firstLine.indexOf("|",fin);
              fin = firstLine.indexOf("|",start+1);          

              var blue1 = firstLine.substring(1+start,fin);
              start = firstLine.indexOf("|",fin);
              fin = firstLine.indexOf("|",start+1);          
              var blue2 = firstLine.substring(1+start,fin);
              start = firstLine.indexOf("|",fin);
              fin = firstLine.indexOf("|",start+1);          
              var blue3 = firstLine.substring(1+start,fin);
              start = firstLine.indexOf("|",fin);
              fin = firstLine.indexOf("|",start+1);          


              console.log("matchType: "+matchType);
              console.log("matchNumber: "+matchNumber);
              console.log("Teams:"+red1+", "+red2+", "+red3);
              console.log("Teams:"+blue1+", "+blue2+", "+blue3);            

          }

          console.log("I finished...");
        });
    }

};

console.log("something happened");

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}