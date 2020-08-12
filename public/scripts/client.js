/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
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
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
const tweetList = [];
  for (const obj of tweets) { 
    $('#tweet-container').append(createTweetElement(obj))
}

};


const createTweetElement = function(tweet) {
let $tweet = `<article class="tweet-list">
<span>
<header class="tweet-list-header">
  <span class="avatar"><img src = ${tweet.user.avatars}> ${tweet.user.name}</span>
  <a class="handle">${tweet.user.handle}</a>
</header>
<p class="tweet-body">
${tweet.content.text} 
</p>
<footer class="tweet-list-footer">
  <p style="float: left;">${tweet.user.created_at}</p>
  <span>
    <a>⚑</a>
    <a>⮔</a>
    <a>&#9829;</a>
  </span>
</footer>
</span>
</article>`;
return $tweet;
}

console.log(renderTweets(data));

});