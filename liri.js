require("dotenv").config();
const Spotify = require("node-spotify-api");
const axios = require("axios");
const moment = require("moment");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var omdb = keys.omdb;
var bands = keys.bit;

var input = process.argv;
var command = process.argv[2];
var searchTerm = process.argv[3];

for (let index = 4; index < input.length; index++) {
    const element = input[index];
    searchTerm += "+" + element;
}

switch (command) {
    case "concert-this":
        var URL = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp"
        axios.get(URL).then(
            function(response) {
                // console.log(response.data);
                
                var dataArr = response.data;
                for (let index = 0; index < dataArr.length; index++) {
                    const element = dataArr[index];
                    console.log(element.lineup[0] + " will be performing at " + element.venue.name);
                    console.log("Located in " + element.venue.city);
                    console.log("Doors open  " + element.datetime);
                    console.log("=====");
                    
                }
                
                

            }
        )
        
        break;
    case "spotify-this-song":
        
        break;
    case "movie-this":
        
        break;
    case "do-what-it-says":
        
        break;
    default:
        break;
}