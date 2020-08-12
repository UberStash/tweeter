
$(document).ready(function() {
  
  $('#tweet-text').keyup(function() {
    let textInput = this.value;
    let charCount = 140
    charCount -= textInput.length;

    
    const counter = $(this).parent().find('output');
    $(counter).text(`${charCount}`)
   

   
   if(charCount < 0) {
      $(counter).addClass('turnRed')
    } else {
      $(counter).removeClass('turnRed')
    }

  });

  


});