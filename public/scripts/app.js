/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

  /**
   * Validates message text to ensure it doesn't contain any html special characters
   * @param {string} msg - the user generated content of their tweet
   * @return {string} div.innerHTML - the cleaned string
   */
  const validateMessageText = (msg) => {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(msg));
    return div.innerHTML;
  };

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
  };

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

  /**
   * Loads all tweets
   */
  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
      .then((tweets) => {
        renderTweets(tweets);
      });
  };

  /**
   * Listens for submit on the tweet message input
   * @param {string} submit - event to listen for
   * @param {function} callback
   */
  $("form[method='POST'").on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const input = $("textarea[name='text']").val();

    // message empty
    if (input.length === 0) {
      $(this).children('h5')[0].style.visibility = 'visible';
      $(this).children('h5')[0].innerText = 'Your tweet is empty!';
    }
    
    // message too long
    else if (input.length > 140) {
      $(this).children('h5')[0].style.visibility = 'visible';
      $(this).children('h5')[0].innerText = 'Your tweet is too long!';
    
    // message ok -> submit
    } else {
      $("textarea[name='text']")[0].value = '';
      $("textarea[name='text'").nextAll('.counter')[0].innerText = 140;
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

  /**
   * Listens for click on the nav bar compose button
   * @param {string} click - event to listen for
   * @param {function} callback
   */
  $("#compose").on('click', function() {
    $(".new-tweet").slideToggle();
    $("textarea[name='text'").focus();
  });

  loadTweets();

});