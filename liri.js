#!javascript
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);
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
          // Break down all the numbers inside
          data = data.split(",");
          
          console.log(data[1])
          var result = 0;
        });
      }



