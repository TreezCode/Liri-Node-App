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

#### spotify-this-song

This command searches the `Node-Spotify-API` by taking in user input as a parameter for the call.
