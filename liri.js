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
var spotifySearch = process.argv[3];

for (let index = 4; index < input.length; index++) {
    const element = input[index];
    searchTerm += "+" + element;
}
for (let index = 4; index < input.length; index++) {
    const element = input[index];
    spotifySearch += " " + element;
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
        if (input.length < 4) {
            spotify.search({type: "track", query: "Up We Go Little Machines"}).then(function(response) {
                var dataArr = response.tracks.items;
                console.log("Looks like you didn't search for anything, try this!");
                for (let index = 0; index < dataArr.length; index++) {
                    const element = dataArr[index];
                    console.log(element.name);
                    console.log("By" + element.artists[0].name);
                    console.log(element.album.name);
                    console.log(element.external_urls.spotify);
                    console.log("======");
                }
            });
        } else {
            spotify.search({type: "track", query: spotifySearch}).then(function(response) {
                var dataArr = response.tracks.items;
                for (let index = 0; index < dataArr.length; index++) {
                    const element = dataArr[index];
                    
                    console.log("Artist name: ", element.artists[0].name);
                    console.log("Album name: ", element.album.name);
                    console.log("Song name:", element.name);
                    console.log("Play a sample: ", element.external_urls.spotify);
                    console.log("======");
                }
                // console.log(response.tracks.items[0]);
            }).catch(function(error) {
                console.log(error);
            });
        }
        break;
    case "movie-this":
        if (input.length < 4) {
            var baseURL = "http://www.omdbapi.com/";
            var apiParameter = "?apikey=" + omdb.key;
            var searchParameter = "&t=" + "The+Greatest+Showman" + "&plot=short";
            var URL = baseURL + apiParameter + searchParameter;

            axios.get(URL).then(
                function(response) {
                    var data = response.data;
                    var ratingsArr = data.Ratings;

                    console.log(data.Title + " was released in " + data.Year);
                    console.log(data.Plot);
                    console.log("Directed by: " + data.Director);
                    for (let index = 0; index < ratingsArr.length; index++) {
                        const element = ratingsArr[index];
                        console.log(element.Source + " rated this: " + element.Value);
                    }
                    console.log("Country of origin: " + data.Country);
                    console.log("Original language: " + data.Language);
                    console.log("Actors in film: " + data.Actors);
                }
            )
        } else {
            var baseURL = "http://www.omdbapi.com/";
            var apiParameter = "?apikey=" + omdb.key;
            var searchParameter = "&t=" + searchTerm + "&plot=short";
            var URL = baseURL + apiParameter + searchParameter;
            axios.get(URL).then(
                function(response) {
                    var data = response.data;
                    var ratingsArr = data.Ratings;

                    console.log(data.Title + " was released in " + data.Year);
                    console.log(data.Plot);
                    console.log("Directed by: " + data.Director);
                    for (let index = 0; index < ratingsArr.length; index++) {
                        const element = ratingsArr[index];
                        console.log(element.Source + " rated this: " + element.Value);
                    }
                    console.log("Country of origin: " + data.Country);
                    console.log("Original language: " + data.Language);
                    console.log("Actors in film: " + data.Actors);
                }
            )
        }
        break;
    case "do-what-it-says":
        
        break;
    default:
        break;
}