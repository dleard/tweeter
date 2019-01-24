"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db, path) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, function (err, res) {
        if (err) throw err;
        callback(null, true);  
      });
      console.log('Tweet inserted'); 
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      const getTweets = (callback) => {
        db.collection("tweets").find().toArray(callback);
      }
      getTweets((err, tweets) => {
        if (err) throw err;
      
        tweets.sort(sortNewestFirst);
        callback(null, tweets);
        console.log('Tweets loaded. Mongo connection closed');
      });
    }
  };
}