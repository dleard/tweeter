/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

data[0].created_at = Date.parse('22 Jan 2019 00:00:00 GMT');
data[1].created_at = Date.parse('22 Oct 2018 00:00:00 GMT');

$(function() {
  
  function renderTweets(tweets) {
    tweets.forEach(function(tweet) {
      const $tweet = createTweetElement(tweet);
      $('.tweets').append($tweet);
    });
  }

const createTweetElement = (tweetObj) => {
  const {name, handle} = tweetObj.user;
  const avatarURL = tweetObj.user.avatars.regular;
  const {text} = tweetObj.content;
  const timeStampDifference = Date.now() - new Date(tweetObj.created_at);
  const differenceInDays = (timeStampDifference / (1000 * 60 * 60 * 24));
  let time = `${Math.trunc(differenceInDays)} days ago`;
  if (differenceInDays < 1) {
      time = 'Today';
  } else if (differenceInDays > 1 && differenceInDays < 2) {
      time = 'Yesterday';
  } else if (differenceInDays > 30 && differenceInDays < 365) {
      if (differenceInDays / 30 < 2) { time = `${Math.trunc(differenceInDays / 30)} month ago`; }
      else { time = `${Math.trunc(differenceInDays / 30)} months ago`; }
  } else if (differenceInDays > 365) {
      if (differenceInDays / 365 < 2) { time = `${Math.trunc(differenceInDays / 365)} year ago`; }
      else { time = `${Math.trunc(differenceInDays / 365)} years ago`; }
  }

  const header = `<header> <img src = ${avatarURL}> <h2>${name}</h2> <p>${handle}</p></header>`;
  const section = `<section><p>${text}</p></section>`;
  const footer = `<footer><p>${time}</p><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></footer>`;
  
  const tweet = `<article>${header}${section}${footer}</article>`;

  return tweet;
}

renderTweets(data);
});