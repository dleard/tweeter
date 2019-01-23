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

// change dates in hardcoded data to be different from each other
data[0].created_at = Date.parse('22 Jan 2019 00:00:00 GMT');
data[1].created_at = Date.parse('22 Oct 2018 00:00:00 GMT');

$(function() {
  
  /**
   * Iterates through all tweet objects, passes them to createTweetElement and appends all results to section '.tweets'
   * @param {tweets} tweets 
   */
  function renderTweets(tweets) {
    tweets.forEach(function(tweet) {
      const $tweet = createTweetElement(tweet);
      $('.tweets').prepend($tweet);
    });
  }

const validateMessageText = (msg) => {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(msg));
  return div.innerHTML;
}

/**
 * Parses a single tweet object into an HTML element
 * @param {object} tweetObj - an object containing tweet information
 * @returns {String} tweet - a string in html format containing all tweet information
 */
const createTweetElement = (tweetObj) => {
  const {name, handle} = tweetObj.user;
  const avatarURL = tweetObj.user.avatars.regular;
  const text = validateMessageText(tweetObj.content.text);
  const differenceInDays = ((Date.now() - new Date(tweetObj.created_at)) / (1000 * 60 * 60 * 24));
  let tweetTime = `${Math.trunc(differenceInDays)} days ago`;
  
  // Finds the date format to return based on number of days
  if (differenceInDays < 1) {
      tweetTime = 'Today';
  } else if (differenceInDays > 1 && differenceInDays < 2) {
      tweetTime = 'Yesterday';
  } else if (differenceInDays > 30 && differenceInDays < 365) {
      if (differenceInDays / 30 < 2) { tweetTime = `${Math.trunc(differenceInDays / 30)} month ago`; }
      else { tweetTime = `${Math.trunc(differenceInDays / 30)} months ago`; }
  } else if (differenceInDays > 365) {
      if (differenceInDays / 365 < 2) { tweetTime = `${Math.trunc(differenceInDays / 365)} year ago`; }
      else { tweetTime = `${Math.trunc(differenceInDays / 365)} years ago`; }
  }

  const header = `<header> <img src = ${avatarURL}> <h2>${name}</h2> <p>${handle}</p></header>`;
  const section = `<section><p>${text}</p></section>`;
  const footer = `<footer><p>${tweetTime}</p><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></footer>`;  
  const tweet = `<article>${header}${section}${footer}</article>`;

  return tweet;
}

const loadTweets = () => {
  $.ajax('/tweets', { method: 'GET' })
  .then((tweets) => {
    renderTweets(tweets);
  });
}

$("form[method='POST'").on('submit', function(event) {
  event.preventDefault();
  const data = $(this).serialize();
  const input = $("textarea[name='text']").val();
  if (input.length === 0) {
    $(this).children('h5')[0].style.visibility = 'visible';
    $(this).children('h5')[0].innerText = 'Your tweet is empty!';
  }
  else if (input.length > 140) {
    $(this).children('h5')[0].style.visibility = 'visible';
    $(this).children('h5')[0].innerText = 'Your tweet is too long!';
    
  } else {
    $("textarea[name='text']")[0].value = '';
    $(this).children('h5')[0].style.visibility = 'hidden';
    $.ajax({
      method: "POST",
      url: "/tweets",
      data
    }).done(function() {
      $('.tweets').empty();
      loadTweets();
    });
  }  
});

$("#compose").on('click', function() {
  if ($(".new-tweet")[0].style.display === '') { 
    $(".new-tweet")[0].style.display = 'block';
    $("textarea[name='text'").focus();
  }
  else $(".new-tweet")[0].style.display = ''

});

loadTweets();

});