#!javascript
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var arr = [];
var queryString = "";
var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
// console.log(action);

switch (action) {
    case "concert-this":
      concert();
      break;
    
    case "spotify-this-song":
      song();
      break;
    
    case "movie-this":
      movie();
      break;
    
    case "do-what-it-says":
      itSays();
      break;
    }

    function song() {
        fs.readFile("random.txt", "utf8", function(err, data) {
          if (err) {
            return console.log(err);
          }
          // Break down all the words inside
          data = data.split(",");
          arr = data[1].split(" ");
          for(var i = 0; i < arr.length; i++) {
              var queryString = queryString + arr[i] + "+"
          }
          console.log(queryString);
          
        });
      }



