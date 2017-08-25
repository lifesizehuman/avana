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

  // var spotURL = "https://api.spotify.com/v1/search";
  var spotify = require('node-spotify-api');

  var song = process.argv[3];
  var artist = process.argv[4];

  var Spotify = new spotify({
    id: keys.spotifyKeys.client_id,
    secret: keys.spotifyKeys.client_secret
  });

  Spotify.search({
    type: 'track',
    query: song,
    limit: 5
  }, function(err, data) {
    if (err) {
      return console.log(err);
    }
    console.log("Top Result")
    console.log("---------------");
    console.log("Song title: " + JSON.stringify(data.tracks.items[0].name, null , 2));
    console.log("Artist: " + JSON.stringify(data.tracks.items[0].artists[0].name, null , 2));
    console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name, null , 2));
    console.log("Song Link: " + JSON.stringify(data.tracks.items[0].artists[0].external_urls.spotify, null , 2));
  });
}

function getMovie() {
  var movie = process.argv[3];

  var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";

  request(queryUrl, function(error, response, body) {
    var content = JSON.parse(body);
    var tomatoes = JSON.stringify(content.Ratings[1].Value, null, 2);

    var values = [
      "Title: " + content.Title,
      "Year: " + content.Year,
      "iMDB Rating: " + content.imdbRating,
      "Rotten Tomatoes Rating: " + tomatoes,
      "Country: " + content.Country,
      "Language: " + content.Language,
      "Actors: " + content.Actors,
      "Plot: " + content.Plot
    ];

    for (var i = 0; i < values.length; i++) {
      console.log(values[i]);
      console.log("---------------");
    }
  })
}

function doWhatItSays() {

  var fs = require('fs');

  fs.readFile('random.txt', 'utf8', function(error, data) {
    if (error) {
  return console.log(error);
}

var dataArr = data.split(',')

    var x = JSON.stringify(dataArr);
    function callMe(x) {
        process.argv.slice(data);
      }
    callMe();
  })
}

function bonJovi() {

  var inquirer = require('inquirer');

inquirer.prompt([
  {
    type: "list",
    choices: ['cowboy'],
    message: "I'm a ",
    name: "I'm a"
  },
  {
    type: "list",
    choices: ['a steel horse'],
    message: "on what do you ride?",
    name: "I ride a"
  },
  {
    type: "list",
    choices: ['dead or alive'],
    message: "I'm wanted...",
    name: "I'm wanted"
  }
]).then(answers => console.log(JSON.stringify(answers, null, 2)));

}


// function calls

if (command === "my-tweets") {
  getTweets();
}

if (command === "spotify-this") {
  spotifySong();
}

if (command === "movie-this") {
  getMovie();
}

if (command === "do-what-it-says") {
  // doWhatItSays();
  console.log("This feature isn't enabled yet.");
}

if (command === "bon-jovi") {
  bonJovi();
}
