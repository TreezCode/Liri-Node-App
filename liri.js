
// GLOBALS
// ===================================================================
// Set environmental variables
require("dotenv").config();

// Import key.js
var keys = require("./keys.js");
// Grab Axios package
var axios = require("axios");
// Grab Moment.js package
var moment = require('moment');
// Grab Node.js File System
var fs = require("fs");
// Grab Colors package
var colors = require("colors")

// Store user input
var action = process.argv[2];
var input = process.argv[3];

// FUNCTIONS
// ===================================================================
// Determine which function to call dependent on user input
function userCommand() {
    if(input !== null || input !== undefined) {
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
            default: // Log instructions if proper action is not found
            console.log(
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~".rainbow + "\r\n" +
                "********************     ".red + "Welcome to LIRI".white + "     ********************".red + "\r\n" + "\r\n" +         
                "                    * * * Instructions: * * *".cyan + "\r\n" + "\r\n" + 
                "Try typing one of the following commands after 'node liri.js' : ".cyan + "\r\n" + "\r\n" +
                "   1. ".white + "concert-this 'any musician name' " + "\r\n" +
                "   2. ".white + "spotify-this-song 'any song name' " + "\r\n" +
                "   3. ".white + "movie-this 'any movie name' " + "\r\n" +
                "   4. ".white + "do-what-it-says" + "\r\n" + "\r\n" + 
                "                         * * NOTE * *".yellow + "\r\n" + 
                "If the movie title or song name has more than ONE word, use quotation marks.".cyan + "\r\n" + "\r\n" +
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~".rainbow
            );             
        }
    }    
}  
userCommand();

// Access Bands in Town Artist Events API and output venue name, location, and date of event.
function concertThis() {
    // Log user input in log.txt
    actionLog(input);

    // If no input then default artist is "Rick Astley"
    if(input === undefined || input === null) {
        input = "Rick Astley"
    }

    // Build URL with user input
    let queryURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
    axios.get(queryURL)
    .then(function (response) {
        // Store data object
        let concertData = response.data;

        // Iterate through response to parse each concert
        for(var i = 0; i < concertData.length; i++) {
            let formatDate = moment(concertData[i].datetime).format("MM-DD-YYYY");
            console.log(
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~".rainbow + "\r\n" + "\r\n" +                           
                "         LIRI Bands in Town response ".cyan +"#" + i + " for ".cyan  + input + "!" + "\r\n" + "\r\n" + 
                "_________________________________________________________________".white + "\r\n" + 
                "Venue:            ".cyan + concertData[i].venue.name + "\r\n" +
                "_________________________________________________________________".white + "\r\n" +
                "Location:         ".cyan + concertData[i].venue.city + ", " + concertData[i].venue.country + "\r\n" +
                "_________________________________________________________________".white + "\r\n" +
                "Date:             ".cyan + formatDate + "\r\n" +
                "_________________________________________________________________".white + "\r\n" + "\r\n" +
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~".rainbow
            );
            fs.appendFileSync("log.txt", "\r\n" + 
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + "\r\n" + "\r\n" +                           
                "         LIRI Bands in Town response #" + i + " for "  + input + "!" + "\r\n" + "\r\n" + 
                "_________________________________________________________________" + "\r\n" + 
                "Venue:            " + concertData[i].venue.name + "\r\n" +
                "_________________________________________________________________" + "\r\n" +
                "Location:         " + concertData[i].venue.city + ", " + concertData[i].venue.country + "\r\n" +
                "_________________________________________________________________" + "\r\n" +
                "Date:             " + formatDate + "\r\n" +
                "_________________________________________________________________" + "\r\n" + "\r\n" +
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
            );
        }            
    })
    .catch(function (error) {
        // Log error in error.txt
        errorLog(input)
        console.log(
            "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + "\r\n" +                       
            "          Oops... LIRI cannot find any data    >.<" + "\r\n" +
            "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + "\r\n" +                       
            'Error occurred: ' + error
        );
        fs.appendFileSync("error.txt")
        fs.appendFileSync("error.txt", "\r\n" + 
            "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + "\r\n" +                       
            "          Oops... LIRI cannot find any data    >.<" + "\r\n" +
            "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + "\r\n" +                       
            'Error occurred: ' + error
        );
    });
}

// Acess Spotify API and output artist, song name, album, and preview link
function spotifySong(input) {
    // Log user input in log.txt
    actionLog(input);

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
             // Log error in error.txt
            errorLog(input)
            // Log error
            console.log(
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~".rainbow + "\r\n" +             
                "          Oops... LIRI cannot find any data         >.<".red + "\r\n" +
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~".rainbow + "\r\n" +          
                'Error occurred: ' + err
            );
            fs.appendFileSync("error.txt", "\r\n" + 
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
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~".rainbow + "\r\n" +                 
                "\r\n" + "       LIRI Spotify response for ".cyan + input + "!".cyan + "\r\n" + "\r\n" +              
                "_________________________________________________________________".white
            );
            fs.appendFileSync("log.txt", "\r\n" + 
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + "\r\n" +                 
                "\r\n" + "       LIRI Spotify response for " + input + "!" + "\r\n" + "\r\n" +              
                "_________________________________________________________________"
            );

            // Iterate through artist array if multiple artists
            for(var i = 0; i < song.artists.length; i++) {
                console.log("Artist:         ".cyan + song.artists[i].name);
                fs.appendFileSync("log.txt",  "\r\n" +  "Artist:         " + song.artists[i].name);
            }

            console.log(
                "_________________________________________________________________".white + "\r\n" + 
                "Song:           ".cyan + song.name + "\r\n" + 
                "_________________________________________________________________".white + "\r\n" + 
                "Album:          ".cyan + song.album.name + "\r\n" + 
                "_________________________________________________________________".white + "\r\n" + 
                "Preview:        ".cyan + song.preview_url + "\r\n" + 
                "_________________________________________________________________".white + "\r\n" + "\r\n" +
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~".rainbow
            );
            fs.appendFileSync("log.txt", "\r\n" + 
                "_________________________________________________________________" + "\r\n" + 
                "Song:           " + song.name + "\r\n" + 
                "_________________________________________________________________" + "\r\n" + 
                "Album:          " + song.album.name + "\r\n" + 
                "_________________________________________________________________" + "\r\n" + 
                "Preview:        " + song.preview_url + "\r\n" + 
                "_________________________________________________________________" + "\r\n" + "\r\n" +
                "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
            );
        }
    });
}

// Access OMDB API and output movie title, year released, IMDB rating, Rotten Tomatoes rating, country produced, language, plot, and actors.
function movieThis(input) {
    // Log user input in log.txt
    actionLog(input);

    // Export API Key and store as variable
    let omdb = keys.omdb.APIKey;
    
    // If input not found then default "Mr.Nobody"
    if(input === undefined || input === null) {
        input = "Mr. Nobody";
        console.log(
            "*****************************************************************".blue + "\r\n" + 
            "             If you haven't watched 'Mr. Nobody.'".cyan + "\r\n" +  
            "     Then you should: http://www.imdb.com/title/tt0485947/".cyan + "\r\n" + 
            "                      It's on Netflix!".red + "\r\n" +
            "*****************************************************************".blue
        );
        fs.appendFileSync("log.txt", "\r\n" + 
            "*****************************************************************" + "\r\n" + 
            "             If you haven't watched 'Mr. Nobody.'" + "\r\n" +  
            "     Then you should: http://www.imdb.com/title/tt0485947/" + "\r\n" + 
            "                      It's on Netflix!" + "\r\n" + 
            "*****************************************************************"
        );
    }
 
    // Build URL with user input and exported API key to make call
    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=" + omdb;
    axios.get(queryUrl)
    .then(function (response) {
        // Store data object
        let movieData = response.data;

        // Log Movie info
        console.log(
            "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~".rainbow + "\r\n" + "\r\n" + 
            "              LIRI OMDB response for ".cyan + input + "!".cyan + "\r\n" + "\r\n" + 
            "_________________________________________________________________".white + "\r\n" + 
            "Title:                   ".cyan + movieData.Title + "\r\n" + 
            "_________________________________________________________________".white + "\r\n" + 
            "Cast: ".cyan + movieData.Actors + "\r\n" + 
            "_________________________________________________________________".white + "\r\n" + 
            "Year Released:           ".cyan + movieData.Year + "\r\n" + 
            "_________________________________________________________________".white + "\r\n" + 
            "IMDB Rating:             ".cyan + movieData.imdbRating + "\r\n" + 
            "_________________________________________________________________".white + "\r\n" + 
            "Rotten Tomatoes Score:   ".cyan + movieData.Ratings[1].Value + "\r\n" + 
            "_________________________________________________________________".white  + "\r\n" + 
            "Country Produced:        ".cyan + movieData.Country + "\r\n" + 
            "_________________________________________________________________".white + "\r\n" + 
            "Language:                ".cyan + movieData.Language + "\r\n" + 
            "_________________________________________________________________".white + "\r\n" +     
            "Plot: ".cyan + movieData.Plot + "\r\n" + 
            "_________________________________________________________________".white + "\r\n" + "\r\n" +
            "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~".rainbow
        );
        fs.appendFileSync("log.txt", "\r\n" + 
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
        // Log error in error.txt
        errorLog(input)

        console.log(
            "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + "\r\n" + 
            "          Oops... LIRI cannot find any data        >.<" + "\r\n" + 
            "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + "\r\n" + 
            'Error occurred: ' + error
        );
        fs.appendFileSync("error.txt",  "\r\n" + 
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
            // Log error in error.txt
            errorLog(input)
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

// Stores user input into a log.txt file with date and time of each command. 
function actionLog(input) {
    var actionItem = [moment().format("MM/DD/YYYY hh:mm A"), " " + action, " " + input];
    actionItem = "\r\n" + "\r\n" + "* * * " + actionItem + " * * *";
    fs.appendFileSync('log.txt', actionItem)
}

// Stores errors into a error.txt file to record each error with date and time. 
function errorLog(input, error) {
    var errorItem = [moment().format("MM/DD/YYYY hh:mm A"), action, input, error];
    errorItem = "\r\n" + "\r\n" + "* * * " + errorItem + " * * *";;
    fs.appendFileSync('error.txt', errorItem)
}
