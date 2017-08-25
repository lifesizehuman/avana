var keys = require("./key.js");



var request = require("request");

var command = "";

for (var i = 2; i < process.argv.length; i++) {
  command += process.argv[i] + " ";
}

var twit = require('twitter');

function getTweets() {
  if (command === "get tweets") {

    twitter = require('twitter');
    var twit = twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
  });

  twit.get("http://api.twitter.com/1.1/statuses/user_timeline.json?count=2",
   function(error, response, body){
     if (!error && response.statusCode === 200) {
       console.log(response);
    }
  })
 }
}

getTweets();
