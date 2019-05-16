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

#### Examples

<img src="assets/images/spotifyExample" alt="LIRI Instructions" width="25%"/><img src="assets/images/spotifyExample1" alt="LIRI Instructions" width="25%"/>

* The *Spotify API* requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:
