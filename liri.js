#!javascript
//The Requires
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var axios = require("axios");

//Global variables
var arr = [];
var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
var queryString = process.argv.slice(3).join(" ");

switch (action) {
    case "concert":
      concert(queryString);
      break;
    
    case "spotify":
      song(queryString);
      break;
    
    case "movie":
      movie(queryString);
      break;
    
    case "do-what-it-says":
      itSays();
      break;
    }

    function song(queryString) {
        fs.readFile("random.txt", "utf8", function(err, data) {
          if (err) {
            return console.log(chalk.red(err));
          }
          spotify.search({ type: 'track', query: query, limit: 1 }, function(err, data) {
            if (err) {
              return console.log(chalk.red('Error occurred: ' + err));
            }
          var results = data.tracks.items;
          // console.log(data.tracks.items[0])
          console.log("Song name is " + data.tracks.items[0].name); 
          console.log("Album name is " + data.tracks.items[0].album.name);
          console.log("Artist name is " + data.tracks.items[0].artists[0].name);
          console.log("\r\n");
          });
        });
      }

    function concert(queryString) {
      var queryUrl = "https://rest.bandsintown.com/artists/" + queryString + "/events?app_id=codingbootcamp";
      axios
        .get(queryUrl)
        .then(function (response) {
          let events = response.data;
          events.forEach(function (event) {
            console.log("Artist: " + queryString);
            console.log("Venue: " + event.venue.name);
            console.log("Venue Location: " + event.venue.city);
            console.log("\r\n");
          });
        })
        .catch(function(err) {
          console.log(chalk.red("Error: " + err))
        })
    }

    function movie(queryString) {
      if (queryString == "") {
        queryString = "Mr. Nobody";
      }
      var queryUrl = "http://www.omdbapi.com/?t=" + queryString + "&y=&plot=short&apikey=trilogy";
      console.log(queryUrl + " " + queryString)
      axios
        .get(queryUrl)
        .then(function (response) {
          let movies = response.data;
          console.log(`Movie Title: ${movies.Title} 
Year: ${movies.Year} 
IMDB Rating: ${movies.imdbRating} 
Rotten Tomatoes Rating: ${movies.Ratings[1].Value} 
Country: ${movies.Country}
Language: ${movies.Language}
Plot: ${movies.Plot}
Actors: ${movies.Actors}`);
          console.log("\r\n");

      })
        .catch(function(err) {
          console.log(chalk.red("Error: " + err));
      })
    }

    function itSays(queryString) {
      fs.readFile("random.txt", "utf8", function(err, data) {
        if(err) {
          return console.log(chalk.red("Error: ", err));
        }
      })
      console.log("itSays");
    }
