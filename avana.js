var keys = require("./key.js");
var request = require("request");

var command = process.argv[2];

function getTweets() {

    var username = process.argv[3];
    var twitterURL = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + username + "&limit=20";

    var twitter = require('twitter');

    var twit = new twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });

    twit.get(twitterURL, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                var tweet = tweets[i].text;
                var creation = tweets[i].created_at;
                console.log(tweet);
                console.log(creation);
                console.log("----------")
            }
        }
    })
}


function spotifySong() {
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
        console.log("Song title: " + JSON.stringify(data.tracks.items[0].name, null, 2));
        console.log("Artist: " + JSON.stringify(data.tracks.items[0].artists[0].name, null, 2));
        console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));
        console.log("Song Link: " + JSON.stringify(data.tracks.items[0].artists[0].external_urls.spotify, null, 2));
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
var lyrics = [
  "It's all the same, only the names will change",
  "Everyday, it seems we're wastin' away",
"Another place where the faces are so cold",
"I drive all night just to get back home",
"I'm a cowboy, on a steel horse I ride",
"I'm wanted dead or alive",
"Wanted dead or alive",
"Sometimes I sleep, sometimes it's not for days",
"The people I meet always go their separate ways",
"Sometimes you tell the day",
"By the bottle that you drink",
"And times when you're all alone all you do is think",
"I'm a cowboy, on a steel horse I ride",
"I'm wanted (wanted) dead or alive",
"Wanted (wanted) dead or alive",
"Oh, and I ride",
"Oh, and I'm a cowboy, on a steel horse I ride",
"I'm wanted dead or alive",
"I walk these streets",
"A loaded six-string on my back",
"I play for keeps 'cause I might not make it back",
"I been everywhere, still, I'm standing tall",
"I've seen a million faces",
"And I've rocked them all",
"I'm a cowboy, on a steel horse I ride",
"I'm wanted (wanted) dead or alive",
"I'm a cowboy, I got the night on my side",
"I'm wanted (wanted) dead or alive",
"And I ride, dead or alive",
"I still drive (I still drive) dead or alive",
"Dead or alive, dead or alive, dead or alive, dead or alive"];

    var inquirer = require('inquirer');

    inquirer.prompt([{
            type: "list",
            choices: ['man', 'woman', 'cowboy'],
            message: "I'm a ",
            name: "cowboy"
        },
        {
            type: "list",
            choices: ['skateboard', 'carpet', 'a steel horse'],
            message: "on what do you ride?",
            name: "horse"
        },
        {
            type: "list",
            choices: ['dead or alive'],
            message: "I'm wanted...",
            name: "wanted"
        }
      ])
        .then(function(inquirerResponse) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    if (inquirerResponse.cowboy === 'cowboy' && inquirerResponse.horse === 'a steel horse') {
      console.log(lyrics);
    }
    else {
      console.log("Try again");
    }
  })
  // ]).then(answers => (console.log(lyrics)));
}


// function calls

if (command === "tweets-of") {
    getTweets();
} else if (command === "spotify-this") {
    spotifySong();
} else if (command === "movie-this") {
    getMovie();
} else if (command === "do-what-it-says") {
    console.log("This feature isn't enabled yet.");
} else if (command === "bon-jovi") {
    bonJovi();
}
