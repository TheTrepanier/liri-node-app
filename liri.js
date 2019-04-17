require("dotenv").config();
const Spotify = require("node-spotify-api");
const axios = require("axios");
const inquirer = require("inquirer");
const moment = require("moment");
const fs = require("fs");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var omdb = keys.omdb;
var bands = keys.bit;

// var input = process.argv;
// var command = process.argv[2];
// var search = process.argv.slice(3).join(" ");
var br = "=====";

inquirer.prompt([
    {
        type: "list",
        message: "What can Liri do for you today?",
        choices: ["Find a concert", "Search Spotify for a song", "Get a movie", "I'm feeling lucky!"],
        name: "command"
    }, 
    {
        type: "input",
        message: "What are you looking for?",
        name: "searchTerm"
    }
]).then(function(response) {
    var search = response.searchTerm;
    search = search.replace(/\s/g, '+'); 
    switch (response.command) {
        case "Find a concert":
            concertSearch(search);
            break;
        case "Search Spotify for a song":
            searchSpotify(response.searchTerm);
            break;
        case "Get a movie":
            searchMovie(search);
            break;
        case "I'm feeling lucky!":
            lucky();
            break;
        default:
            break;
    }
})

function concertSearch(searchTerm) {
    var URL = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=" + bands.key;
    console.log(URL);
    axios.get(URL).then(
        function(response) {
            // console.log(response);
            
            var dataArr = response.data;
            // console.log(dataArr);
            
            for (let index = 0; index < 4; index++) {
                const element = dataArr[index];
                var lineup = element.lineup[0] + " will be performing at " + element.venue.name;
                var concertLocation = "Located in " + element.venue.city;
                var concertTime = "Doors open  " + element.datetime;
                var logThis = lineup + "\n" + concertLocation + "\n" + concertTime + "\n" + br + "\n";
                fs.appendFile("./log.txt", logThis, function(error) {
                    if (error) {
                        return console.log(error);
                    }
                });
                console.log("\n" + lineup);
                console.log(concertLocation);
                console.log(concertTime + "\n");
                console.log(br);
            }
        }
    )
}
function searchSpotify(searchTerm) {
    if (searchTerm === "") {
        searchTerm = "Up We Go Lights"
    }
    spotify.search({type: "track", query: searchTerm}).then(function(response) {
        var dataArr = response.tracks.items;
        for (let index = 0; index < 1; index++) {
            const element = dataArr[index];
            // console.log(element);
            
            var artist = "Artist name: " + element.artists[0].name;
            var album = "Album name: " + element.album.name;
            var song = "Song name:" + element.name;
            var link = "Play a sample: " + element.external_urls.spotify;
            var logThis = artist + "\n" + album + "\n" + song + "\n" + link + "\n" + br + "\n";
            fs.appendFile("./log.txt", logThis, function(error) {
                if (error) {
                    return console.log(error);
                }
            });
            console.log("\n" + artist);
            console.log(album);
            console.log(song);
            console.log(link + "\n");
            console.log(br);
        }
    }).catch(function(error) {
        console.log(error);
    });
}
function searchMovie(searchTerm) {
    if (searchTerm === "") {
        searchTerm = "The+Greatest+Showman";
    }
    var baseURL = "http://www.omdbapi.com/";
    var apiParameter = "?apikey=" + omdb.key;
    var searchParameter = "&t=" + searchTerm + "&plot=short";
    var URL = baseURL + apiParameter + searchParameter;
    axios.get(URL).then(
        function(response) {
            var data = response.data;
            var ratingsArr = data.Ratings;
            var title = data.Title + " was released in " + data.Year;
            var plot = data.Plot;
            var director = "Directed by: " + data.Director;
            var country = "Country of origin: " + data.Country;
            var language = "Original language: " + data.Language;
            var actors = "Actors in film: " + data.Actors;
            var logThis = title + "\n" + plot + "\n" + director + "\n" + country + "\n" + language + "\n" + actors + "\n" + br + "\n";
            fs.appendFile("./log.txt", logThis, function(error) {
                if (error) {
                    return console.log(error);
                }
            });
            console.log(title + "\n");
            console.log(plot + "\n");
            console.log(director);
            for (let index = 0; index < ratingsArr.length; index++) {
                const element = ratingsArr[index];
                console.log("    " + element.Source + " rated this: " + element.Value);
            }
            console.log(country);
            console.log(language);
            console.log(actors);
        }
    )
}
function lucky() {
    console.log("You think you're the boss of me?!\nThat's it I should have known my mother was right about you!");   
}