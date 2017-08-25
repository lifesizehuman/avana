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

  twit.get("statuses/user_timeline", params,
   function(error, tweets, response){
     if (!error) {
       for(var i = 0; i < tweets.length; i++) {
         console.log(tweets[i].text);
         console.log(tweets[i].created_at);
         console.log("----------")
       } else console.log(error);
     }
   })
  }

if (command === "tweets") {

getTweets();

}
