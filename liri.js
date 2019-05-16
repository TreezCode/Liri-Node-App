
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
        default: // Log instructions if no action is found
        console.log(
            "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + "\r\n" +
            "********************     Welcome to LIRI     ********************" + "\r\n" + "\r\n" +         
            "                    * * * Instructions: * * *" + "\r\n" + "\r\n" + 
            "Try typing one of the following commands after 'node liri.js' : " + "\r\n" + "\r\n" +
            "   1. concert-this 'any musician name' " + "\r\n" +
            "   2. spotify-this-song 'any song name' " + "\r\n" +
            "   3. movie-this 'any movie name' " + "\r\n" +
            "   4. do-what-it-says." + "\r\n" + "\r\n" + 
            "                         * * NOTE * *" + "\r\n" + 
            "If the movie title or song name has more than ONE word, use quotation marks." + "\r\n" +
            "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
        );             
    }
}
userCommand();

// Access Bands in Town Artist Events API and output venue name, location, and date of event.
function concertThis() {

    // Grab Moment.js package
    let moment = require('moment');

    // If no input then default artist is "Rick Astley"
    if(input === undefined || input === null) {
        input = "Rick Astley"
    }

    // Build URL with user input
    let queryURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";

    // Axios call to API
    axios.get(queryURL)
    .then(function (response) {
            // Store data object
            let concertData = response.data[0];
            // Prettify date using Moment
            let formatDate = moment(concertData.datetime).format("MM-DD-YYYY");
            // Log concert info
            console.log(
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + "\r\n" + "\r\n" +                           
                "         LIRI Bands in Town response for " + input + "!" + "\r\n" + "\r\n" + 
                "_________________________________________________________________" + "\r\n" + 
                "Venue:            " + concertData.venue.name + "\r\n" +
                "_________________________________________________________________" + "\r\n" +
                "Location:         " + concertData.venue.city + ", " + concertData.venue.country + "\r\n" +
                "_________________________________________________________________" + "\r\n" +
                "Date:             " + formatDate + "\r\n" +
                "_________________________________________________________________" + "\r\n" + "\r\n" +
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
            );            
        })
        .catch(function (error) {
            console.log(
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + "\r\n" +                       
                "          Oops... LIRI cannot find any data    >.<" + "\r\n" +
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + "\r\n" +                       
                'Error occurred: ' + error
            );
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
            console.log(
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + "\r\n" +             
                "          Oops... LIRI cannot find any data         >.<" + "\r\n" +
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + "\r\n" +          
                'Error occurred: ' + err
            );
            return;
        } else if (!err) {
            // Store data object
            let songData = data.tracks.items
                
            let song = songData[0];

            
            // Log song data for user
            console.log(
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + "\r\n" +                 
                "\r\n" + "       LIRI Spotify response for " + input + "!" + "\r\n" + "\r\n" +              
                "_________________________________________________________________"
            ); 

                // Iterate through artist array if multiple artists
                for(var i = 0; i < song.artists.length; i++) {
                    console.log("Artist:       " + song.artists[i].name);
                }

            console.log(
                "_________________________________________________________________" + "\r\n" + 
                "Song:         " + song.name + "\r\n" + 
                "_________________________________________________________________" + "\r\n" + 
                "Album:        " + song.album.name + "\r\n" + 
                "_________________________________________________________________" + "\r\n" + 
                "Preview:      " + song.preview_url + "\r\n" + 
                "_________________________________________________________________" + "\r\n" + "\r\n" +
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
            );
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
        console.log(
            "*****************************************************************" + "\r\n" + 
            "             If you haven't watched 'Mr. Nobody.'" + "\r\n" +  
            "     Then you should: http://www.imdb.com/title/tt0485947/" + "\r\n" + 
            "                      It's on Netflix!" + "\r\n" + 
            "*****************************************************************"
        );
    }

    // Build URL with user input and exported API key
    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=" + omdb;
    axios.get(queryUrl)
    .then(function (response) {

        // Store data object
        let movieData = response.data;

        // Log Movie info
        console.log(
            "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + "\r\n" + "\r\n" + 
            "              LIRI OMDB response for " + input + "!" + "\r\n" + "\r\n" + 
            "_________________________________________________________________" + "\r\n" + 
            "Title:                   " + movieData.Title + "\r\n" + 
            "_________________________________________________________________" + "\r\n" + 
            "Cast: " + movieData.Actors + "\r\n" + 
            "_________________________________________________________________" + "\r\n" + 
            "Year Released:           " + movieData.Year + "\r\n" + 
            "_________________________________________________________________" + "\r\n" + 
            "IMDB Rating:             " + movieData.imdbRating + "\r\n" + 
            "_________________________________________________________________" + "\r\n" + 
            "Rotten Tomatoes Score:   " + movieData.Ratings[1].Value + "\r\n" + 
            "_________________________________________________________________"  + "\r\n" + 
            "Country Produced:        " + movieData.Country + "\r\n" + 
            "_________________________________________________________________" + "\r\n" + 
            "Language:                " + movieData.Language + "\r\n" + 
            "_________________________________________________________________" + "\r\n" +     
            "Plot: " + movieData.Plot + "\r\n" + 
            "_________________________________________________________________" + "\r\n" + "\r\n" +
            "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
        );                
    })
    .catch(function (error) {
        console.log(
            "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + "\r\n" + 
            "          Oops... LIRI cannot find any data        >.<" + "\r\n" + 
            "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + "\r\n" + 
            'Error occurred: ' + error
        );
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
        
        // Decides which function to call dependent on random.txt
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
            default: "";
        }
    });
}