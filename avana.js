var keys = require('./key.js');
var request = require('request');
var command = process.argv[2];

function getTweets() {
  var input = process.argv[3];

  var Twitter = require('twitter');
  var searchURL = 'https://api.twitter.com/1.1/users/search.json?q=' + input + '&page=1&count=3';

  var twit = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
  });

  twit.get(searchURL, function(error, tweets, response) {
    if (!error) {
      var handle = tweets[0].screen_name;
      var realName = tweets[0].name;
      var followers = tweets[0].followers_count;
      var friends = tweets[0].friends_count;
      var tweetCount = tweets[0].statuses_count;

      var twitterURL = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=' + handle + '&limit=20';

      twit.get(twitterURL, function(error, tweets, response) {
        var stats = [
          'The Tweets of ' + realName,
          '----------',
          'User Stats',
          '----------',
          'Username: ' + handle,
          'Total tweets: ' + tweetCount,
          'Followers: ' + followers,
          'Following: ' + friends,
          '----------',
          'Most recent tweets',
          '----------'
        ];
        for (var i = 0; i < stats.length; i++) {
          console.log(stats[i]);
        }
        if (!error) {
          for (var j = 0; j < tweets.length; j++) {
            var tweet = tweets[j].text;
            var creation = tweets[j].created_at;
            console.log(tweet);
            console.log(creation);
            console.log('----------');
          }
        }
      });
    }
  });
}

function spotifySong() {
  var Spotify = require('node-spotify-api');

  var searchQuery = process.argv[3];

  var Spot = new Spotify({
    id: keys.spotifyKeys.client_id,
    secret: keys.spotifyKeys.client_secret
  });

  Spot.search({
    type: 'track',
    query: searchQuery,
    limit: 5
  }, function(err, data) {
    if (err) {
      return console.log(err);
    }
    console.log('Top Result');
    console.log('---------------');
    console.log('Song title: ' + JSON.stringify(data.tracks.items[0].name, null, 2));
    console.log('Artist: ' + JSON.stringify(data.tracks.items[0].artists[0].name, null, 2));
    console.log('Album: ' + JSON.stringify(data.tracks.items[0].album.name, null, 2));
    console.log('Song Link: ' + JSON.stringify(data.tracks.items[0].artists[0].external_urls.spotify, null, 2));
  });
}

function getMovie() {
  var movie = process.argv[3];

  var queryUrl = 'http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&apikey=40e9cece';

  request(queryUrl, function(response, body) {
    var content = JSON.parse(body);
    var tomatoes = JSON.stringify(content.Ratings[1].Value, null, 2);

    var values = [
      'Title: ' + content.Title,
      'Year: ' + content.Year,
      'iMDB Rating: ' + content.imdbRating,
      'Rotten Tomatoes Rating: ' + tomatoes,
      'Country: ' + content.Country,
      'Language: ' + content.Language,
      'Actors: ' + content.Actors,
      'Plot: ' + content.Plot
    ];

    for (var i = 0; i < values.length; i++) {
      console.log(values[i]);
      console.log('---------------');
    }
  });
}

// function doWhatItSays () {
//   var fs = require('fs')
//
//   fs.readFile('random.txt', 'utf8', function (error, data) {
//     if (!error) {
//       var dataArr = data.split(',')
//
//       var x = JSON.stringify(dataArr)
//
//       command = x[0].trim()
//       searchQuery = x[1].trim()
//
//       searchQuery.commands()
//     } else {
//       commands()
//     }
//   })
// }

function bonJovi() {
  var fs = require('fs');

  fs.readFile('lyrics.txt', 'utf8', function(error, data) {
    if (error) {
      return console.log(error);
    }

    var lyrics = data.split(',');

    var inquirer = require('inquirer');

    inquirer.prompt([
      {
        type: 'list',
        choices: [
          'man', 'woman', 'cowboy'
        ],
        message: 'I am a ',
        name: 'cowboy'
      }, {
        type: 'list',
        choices: [
          'skateboard', 'carpet', 'a steel horse'
        ],
        message: 'on what do you ride?',
        name: 'horse'
      }, {
        type: 'list',
        choices: ['dead or alive'],
        message: 'I am wanted...',
        name: 'wanted'
      }
    ]).then(function(inquirerResponse) {
      if (inquirerResponse.cowboy === 'cowboy' && inquirerResponse.horse === 'a steel horse') {
        console.log(JSON.stringify(lyrics, null, 2));
      } else {
        console.log('Try again');
      }
    });
  });
}

// function calls

function commands() {
  if (command === 'tweets-of') {
    getTweets();
  } else if (command === 'spotify-this') {
    spotifySong();
  } else if (command === 'movie-this') {
    getMovie();
  } else if (command === 'do-what-it-says') {
    // doWhatItSays();
    console.log('This feature is not enabled.');
  } else if (command === 'bon-jovi') {
    bonJovi();
  }
}

commands();
