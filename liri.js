#!javascript
//The Requires
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var axios = require("axios");
var chalk = require("chalk");

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
      spotify.search({ type: 'track', query: queryString, limit: 1, market: "US" }, function(err, data) {
        if (err) {
          return console.log(chalk.magenta('Error occurred: ' + err));
        }
        console.log("Song: " + data.tracks.items[0].name); 
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("\r\n");
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
          console.log(chalk.magenta("Error: " + err))
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
          console.log(chalk.magenta("Error: " + err));
      })
    }

    function itSays(queryString) {
      fs.readFile("random.txt", "utf8", function(err, data) {
        if(err) {
          return console.log(chalk.magenta("Error: ", err));
        }
        let randomFile = data.split("\n");
        let lines = [];
        for(let i = 0; i < randomFile.length; i++) {
          lines.push(randomFile[i]);
        }
        let randomNum = Math.floor((Math.random() * lines.length - 1) + 1);
        // console.log(randomNum + " here " + randomFile.length + " " + lines)
        line = lines[randomNum];
        randomLine = line.split(",")[0];
        randomDomain = (line.split(",")[1].slice(1, -1))
        randomRequest = randomDomain.split(" ").join("+");
        console.log(chalk.yellow(randomLine, randomDomain));
      })
    }
