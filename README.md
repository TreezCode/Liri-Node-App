# Liri-Node-App  📱

## About LIRI 📖

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. Liri is a command line node-app that takes in specific parameters and gives the user back data.

![LIRI Example](assets/images/LIRI-example.png)

## How to Use 🤔

The user has four options, or commands, to choose from. The command chosen, combined with a specific "parameter" set by the user, will return a table of logged data.

The `commands` are:

* `spotify-this-song`
* `concert-this`
* `movie-this`
* `do-what-it-says`

<img src="assets/images/LIRI-rules.png" alt="LIRI Instructions" width="75%"/>

**Remember**

If the band/artist or movie name you enter has more than one word, you must use quotations.

## How it Works 🔨

### spotify-this-song

The `spotify-this-song` command searches the `Node-Spotify-API` by sending user input as a parameter for the call to retrieve song information.

``` spotify.search({ type: 'track', query: input }, function (err, data) {
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
```

#### Examples

* `spotify-this-song "Bohemian Rhapsody"`
* `spotify-this-song "Never Gonna Give You Up"`
* `spotify-this-song "2009 Mac Miller"`
* `spotify-this-song "One Love Bob Marley"`


The *Spotify API* requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:
