$(document).ready(function () {
  // place your code here

  function checkSearchEmpty() {
    $('#search').val(function() {
      if($(this).val() === ''){
        $('.invalid-feedback').css('display', 'block');
      } return;
    })
  }

  $('#submitBtn').click(function(e) {
    e.preventDefault();
    checkSearchEmpty();
  })

});