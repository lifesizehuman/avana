var keys = require("./key.js");
var request = require("request");

var command = process.argv[2];

function getTweets() {

  var twitter = require('twitter');
  var params = {
    screenName: "OCMemeDad"
  }

  var twit = new twitter({consumer_key: keys.twitterKeys.consumer_key, consumer_secret: keys.twitterKeys.consumer_secret, access_token_key: keys.twitterKeys.access_token_key, access_token_secret: keys.twitterKeys.access_token_secret});

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

  var Spotify = new spotify({id: keys.spotifyKeys.client_id, secret: keys.spotifyKeys.client_secret});

  Spotify.search({
    type: 'track',
    query: song,
    limit: 1
  }, function(err, data) {
    if (err) {
      return console.log(err);
    }
    console.log(JSON.stringify(data, null, 3));
  });
}

function getMovie() {
  var movie = process.argv[3];

  var queryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=40e9cece";

  request(queryUrl, function(error, response, body) {
    console.log(name + "'s" + " rating is " + JSON.parse(body).imdbRating);
  }
}

if (command === "tweets") {
  getTweets();
}

if (command === "spotify") {
  spotifySong();
}

if (command === "spotify") {
  getMovie();
}
