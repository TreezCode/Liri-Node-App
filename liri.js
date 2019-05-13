
// GLOBAL
// ===================================================================
// Set environmental variables
require("dotenv").config();

// Import key.js
var keys = require("./keys.js");
// Grab Axios package
var axios = require("axios");

// Store user input
var action = process.argv[2];
var input = process.argv[3];

// FUNCTIONS
// ===================================================================
// Determine which function to call dependent on user input
function userCommand() {
    switch (action) {
        case "concert-this":
            concertThis(input);
            break;
        case "spotify-this-song":
            spotifySong(input);
            break;
        case "movie-this":
            movieThis(input);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default: // Instructions if no action is found
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + "\r\n" +
            "**************     Welcome to LIRI     **************" + "\r\n" + "\r\n" +         
            "Instructions: " + "\r\n" + 
            "Try typing one of the following commands after 'node liri.js' : " + "\r\n"+
            "1. concert-this 'any musician name' " + "\r\n" +
            "2. spotify-this-song 'any song name' " + "\r\n" +
            "3. movie-this 'any movie name' " + "\r\n" +
            "4. do-what-it-says." + "\r\n" + "\r\n" + 
            "*REMEMBER* if the movie title or song name is more than ONE word, use quotation marks." + "\r\n" +
            "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");             
    }
}
userCommand(action, input);

// Access Bands in Town Artist Events API and output venue name, location, and date of event.
function concertThis(input) {

    // Grab Moment.js package
    let moment = require('moment');

    // If no input then default artist is "Rick Astley"
    if(input === undefined || input === null) {
        input = "Rick Astley"
    }

    // Build URL with user input
    let queryURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"
    // Axios call to API
    axios.get(queryURL)
    .then(function (response) {
            // Store data object
            let concertData = response.data[0];
            // Prettify date using Moment
            let formatDate = moment(concertData.datetime).format("MM-DD-YYYY");
            // Log concert info
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");                            
            console.log("\r\n" + "         LIRI Bands in Town response for " + input + "!" + "\r\n");
            console.log("_________________________________________________________________");
            console.log("Venue:            " + concertData.venue.name);
            console.log("_________________________________________________________________");
            console.log("Location:         " + concertData.venue.city + ", " + concertData.venue.country);
            console.log("_________________________________________________________________");
            console.log("Date:             " + formatDate + "\r\n");
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");            
        })
        .catch(function (error) {
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");                        
            console.log("      LIRI can not understand fake artists!   >.<");
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");                        
            console.log('Error occurred: ' + error);
        });
}

// Acess Spotify API and output artist, song name, album, and preview link
function spotifySong(input) {

    // Grab Spotify package
    let Spotify = require('node-spotify-api');
    // Access Spotify keys data
    let spotify = new Spotify(keys.spotify);

    // If input is not found then default to "The Sign by Ace of Base"
    if (input === undefined || input === null) {
        input = "The Sign Ace of Base";
    }

    // Call to API with user input
    spotify.search({ type: 'track', query: input }, function (err, data) {
        if (err) {
            // Log error
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");             
            console.log("      LIRI can not understand fake song names!         >.<");
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");            
            console.log('Error occurred: ' + err);
            return;
        } else if (!err) {
            // Store data object
            let songData = data.tracks.items
            // Iterate through response
            for(var i = 0; i < songData.length; i++) {
                let song = songData[i];
                // Log song data for user
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");                
                console.log("\r\n" + "      LIRI Spotify response #" + i + " for " + input + "!" + "\r\n");
                console.log("_________________________________________________________________");               
                console.log("_________________________________________________________________");
                console.log("Artist:       " + song.artists[0].name);
                console.log("_________________________________________________________________");
                console.log("Song:         " + song.name);
                console.log("_________________________________________________________________");
                console.log("Album:        " + song.album.name);
                console.log("_________________________________________________________________");
                console.log("Preview:      " + song.preview_url);
                console.log("_________________________________________________________________");
               
            }
        }
    });
}

// Access OMDB API and output movie title, year released, IMDB rating, Rotten Tomatoes rating, country produced, language, plot, and actors.
function movieThis(input) {

    // Export API Key and store as variable
    let omdb = keys.omdb.APIKey;

    // If input not found then default "Mr.Nobody"
    if(input === undefined || input === null) {
        input = "Mr. Nobody";
        console.log("*****************************************************************");
        console.log("             If you haven't watched 'Mr. Nobody.'" + "\r\n" +  "     Then you should: http://www.imdb.com/title/tt0485947/");
        console.log("                       It's on Netflix!");
        console.log("*****************************************************************");
    }

    // Build URL with user input and exported API key
    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=" + omdb;
    axios.get(queryUrl)
    .then(function (response) {
        // Store data object
        let movieData = response.data;
        // Log Movie info
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log("\r\n" + "              LIRI OMDB response for " + input + "!" + "\r\n");
        console.log("_________________________________________________________________");
        console.log("Title:                   " + movieData.Title);
        console.log("_________________________________________________________________");
        console.log("Cast: " + movieData.Actors);
        console.log("_________________________________________________________________");
        console.log("Year Released:           " + movieData.Year);
        console.log("_________________________________________________________________");
        console.log("IMDB Rating:             " + movieData.imdbRating);
        console.log("_________________________________________________________________");
        // Iterate through Ratings to search for "Rotten Tomatoes" rating.
        for(var i = 0; i < movieData.Ratings.length; i++) {
            if(movieData.Ratings[i].Source === "Rotten Tomatoes") {
                console.log("Rotten Tomatoes Score:   " + movieData.Ratings[i].Value);
                console.log("_________________________________________________________________");
             
            }
        }
        console.log("Country Produced:        " + movieData.Country);
        console.log("_________________________________________________________________");      
        console.log("Language:                " + movieData.Language);
        console.log("_________________________________________________________________");       
        console.log("Plot: " + movieData.Plot);
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");                
    })
    .catch(function (error) {
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"); 
        console.log("      LIRI can not understand fake song names!         >.<");
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"); 
        console.log('Error occurred: ' + error);
    });
}

// Using fs Node package use text inside random.txt to call one of LIRI's commands.
function doWhatItSays() {
    // Grab File System package
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        // Split random.txt array and store each index as variables
        let randomArr = data.split(",")
        let action = randomArr[0];
        let input = randomArr[1];
        
        // Switch statement decides which function to call dependent on random.txt
        switch (action) {
            case "spotify-this-song":
                spotifySong(input);
                break;
            case "concert-this":
                concertThis(input);
                break;
            case "movie-this":
                movieThis(input);
                break;
        }
    });

}