/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */




$(document).ready(function() {
  // HIDES STUFF WHEN LOADING
  $('.new-tweet').hide();
  $('.error').hide();



  $('#text').on('submit', function(event) {
    event.preventDefault();
    
    const input = event.target.text.value;
    
    $('.error').hide();
    
    if (input && input.length < 140) {
      $('.new-tweet').hide();
      const input = $('#text').serialize();
    
    
      $.post('/tweets/', input , (res) => {
        renderTweets();
      });
    } else if (!input) {
    
      $('#error-too-few').slideDown(400);
    
    
    } else {
      $('#error-too-many').slideDown(400);
    }
  });

  // RENDERS ALL TWEETS ONTO PAGE
  const renderTweets = function() {
    $.ajax({ url: '/tweets/', method: 'GET', dataType: 'JSON' })
      .then(function(response) {
        $('#tweet-container').empty();
        for (const obj of response) {
          $('#tweet-container').prepend(createTweetElement(obj));
        }
      });
  };
      
  // CREATES A TWEET ELEMENT
  const createTweetElement = function(tweet) {
              
    // ESCAPE FUNCTION TO PROTECT FROM 'Cross-Site Scripting'
    const escape =  function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
      
        
    
    // FORM TOGGLE FOR NEW TWEET
    $('#form-toggle').on('click', function(event) {
      if ($('.new-tweet').first().is(':hidden')) {
        $('.new-tweet').slideDown('slow');
        $('.new-tweet').hide();
      }
      
    });

    // HELPER FUNCTION TO CALCULATE TIME SINCE CREATED
    const timer = function(date) {
      const current = new Date().getTime();
      const diffrence = current - date;
      const minutes = Math.round((diffrence / 1000) / 60);
      const hours = Math.round(minutes / 60);
      const days = Math.round(hours / 24);
      const weeks = Math.round(days / 7);
      const years = Math.round(days / 365);
      if (minutes < 60) {
        return `${minutes} mins ago`;
      } else if (minutes >= 60 && hours < 24) {
        return `${hours} hours ago`;
      } else if (hours >= 24 && days < 7) {
        return `${days} days ago`;
      } else if (days >= 7 && weeks < 52) {
        return `${weeks} weeks ago`;
      } else {
        return `${years} years ago`;
      }
    };

    
    const $tweet = `
      <article class='tweet-list'>
        <span>
          <header class='tweet-list-header'>
            <span class='avatar'><img src = ${tweet.user.avatars}> ${tweet.user.name}</span>
            <a class='handle'>${tweet.user.handle}</a>
          </header>
           <p class='tweet-body'>
            ${escape(tweet.content.text)} 
          </p>
          <footer class='tweet-list-footer'>
            <p style='float: left;'>${timer(tweet.created_at)}</p>
            <span>
              <a>⚑</a>
              <a>⮔</a>
              <a>&#9829;</a>
            </span>
          </footer>
        </span>
      </article>
    `;
    return $tweet;
  };

  renderTweets();

});

