/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

 const tweetData = {
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

var $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
//console.log($tweet); // to see what it looks like
$('.tweets').append($tweet); // t
});