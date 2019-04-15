require("dotenv").config();
const Spotify = require("node-spotify-api");
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var omdb = keys.omdb;
var bands = keys.bit;

var input = process.argv;
var command = process.argv[2];
var search = process.argv[3];
var br = "=====";

for (let index = 4; index < input.length; index++) {
    const element = input[index];
    search += "+" + element;
}

function liri(commandTerm, searchTerm) {
    switch (commandTerm) {
        case "concert-this":
            var URL = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp"
            axios.get(URL).then(
                function(response) {
                    // console.log(response.data);
                    
                    var dataArr = response.data;
                    for (let index = 0; index < dataArr.length; index++) {
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
                        console.log(lineup);
                        console.log(concertLocation);
                        console.log(concertTime);
                        console.log(br);
                    }
                }
            )
            break;
    
        case "spotify-this-song":
            if (input.length < 4 && process.argv[2] != "do-what-it-says") {
                spotify.search({type: "track", query: "Up We Go Little Machines"}).then(function(response) {
                    var dataArr = response.tracks.items;
                    console.log("Looks like you didn't search for anything, try this!");
                    for (let index = 0; index < dataArr.length; index++) {
                        const element = dataArr[index];
                        var name = element.name;
                        var artist = "By" + element.artists[0].name;
                        var album = element.album.name;
                        var link = element.external_urls.spotify;
                        var logThis = "Looks like you didn't search for anything, try this!" + "\n" + name + "\n" + artist + "\n" + album + "\n" + link + "\n" + br + "\n";
                        fs.appendFile("./log.txt", logThis, function(error) {
                            if (error) {
                                return console.log(error);
                            }
                        });
                        console.log(name);
                        console.log(artist);
                        console.log(album);
                        console.log(link);
                        console.log(br);
                    }
                });
            } else {
                spotify.search({type: "track", query: searchTerm}).then(function(response) {
                    var dataArr = response.tracks.items;
                    for (let index = 0; index < dataArr.length; index++) {
                        const element = dataArr[index];
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
                        console.log(artist);
                        console.log(album);
                        console.log(song);
                        console.log(link);
                        console.log(br);
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
                        console.log(title);
                        console.log(plot);
                        console.log(director);
                        for (let index = 0; index < ratingsArr.length; index++) {
                            const element = ratingsArr[index];
                            console.log(element.Source + " rated this: " + element.Value);
                        }
                        console.log(country);
                        console.log(language);
                        console.log(actors);
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
                        console.log(title);
                        console.log(plot);
                        console.log(director);
                        for (let index = 0; index < ratingsArr.length; index++) {
                            const element = ratingsArr[index];
                            console.log(element.Source + " rated this: " + element.Value);
                        }
                        console.log(country);
                        console.log(language);
                        console.log(actors);
                    }
                )
            }
            break;
        case "do-what-it-says":
            fs.readFile("./random.txt", "utf8", function(error, data) {
                if (error) {
                    return console.log(error);
                }
                var dataArr = data.split(",");
                var doItCommand = dataArr[0];
                var doItSearch = dataArr[1];
                // console.log(doItCommand, doItSearch);
                
                liri(doItCommand, doItSearch)
            });
            
            break;
        default:
            console.log("I'm sorry dave, I'm afraid I can't do that.");
            break;
    }
}

liri(command, search);