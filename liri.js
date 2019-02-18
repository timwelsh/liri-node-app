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
var queryString = "";
var spotify = new Spotify(keys.spotify);
var action = process.argv[2];

var args = process.argv;
var inputArr = [];
var queryString = "";

for (var i = 3; i < args.length; i++) {
    inputArr.push(args[i]);
}
queryString = inputArr.join(" ");

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

    function song(query) {
        fs.readFile("random.txt", "utf8", function(err, data) {
          if (err) {
            return console.log(err);
          }
          spotify.search({ type: 'track', query: query, limit: 1 }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
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

    function concert(query) {
      var queryUrl = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp";
      axios.get(queryUrl).then(function (response) {
        var events = response.data;
        events.forEach(function (event) {
          console.log("Artist: " + query);
          console.log("Venue: " + event.venue.name);
          console.log("Venue Location: " + event.venue.city);
          console.log("\r\n");
        });
      });
    }

    function movie(query) {
      var queryUrl = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy";
      axios.get(queryUrl).then(function (response) {
        console.log("Title: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log("\r\n");

      });
    }

    function itSays() {
      //TODO: random fucntion 
      console.log("itSays");
    }




