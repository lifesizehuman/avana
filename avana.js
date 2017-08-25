var keys = require("./key.js");
var request = require("request");

var command = process.argv[2];

function getTweets() {

  var twitter = require('twitter');
  var params = {
    screenName: "OCMemeDad"
  }

  var twit = new twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
  });

  twit.get("statuses/user_timeline", params, function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i < 20; i++) {
        console.log(tweets[i].text);
        console.log(tweets[i].created_at);
        console.log("----------")
      }
    }
  })
}

function spotifySong() {

  var spotURL = "https://api.spotify.com/v1/search";
  var spotify = require('node-spotify-api');

  var song = process.argv[3];

  var Spotify = new spotify({
    id: keys.spotifyKeys.client_id,
    secret: keys.spotifyKeys.client_secret
  });

  Spotify.search({
    type: 'track',
    query: song,
    limit: 1
  }, function(err, data) {
    if (err) {
      return console.log(err);
    }
    console.log("Song title: " + JSON.stringify(data.tracks.items[0].name, null , 3));
    console.log("Artist: " + JSON.stringify(data.tracks.items[0].artists[0].name, null , 3));
    console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name, null , 3));
    console.log("Song Link: " + JSON.stringify(data.tracks.items[0].artists[1].external_urls.spotify, null , 3));
  });
}

function getMovie() {
  var movie = process.argv[3];

  var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";

  request(queryUrl, function(error, response, body) {
    // console.log(JSON.parse(body));
    console.log(JSON.parse(body).Title);
    console.log("---------------");
    console.log(JSON.parse(body).Year);
    console.log("---------------");
    console.log("iMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("---------------");
    console.log(JSON.parse(body).Ratings[1]);
    console.log("---------------");
    console.log(JSON.parse(body).Country);
    console.log("---------------");
    console.log(JSON.parse(body).Language);
    console.log("---------------");
    console.log(JSON.parse(body).Actors);
    console.log("---------------");
    console.log(JSON.parse(body).Plot);
    console.log("---------------");
  })
}

if (command === "tweets") {
  getTweets();
}

if (command === "spotify") {
  spotifySong();
}

if (command === "movie") {
  getMovie();
}
