$(document).ready(function () {

  const $search = $('#search');

  $('#submitBtn').click(function(e) {
    e.preventDefault();
    checkSearchEmpty();
    checkUrlValid();
  })

  let $searchVal = false;
  function checkSearchEmpty() {
      if($search.val() === '' || $search.val() === null) {
        $search.addClass('is-invalid');
      } return $searchVal = true;
  }

  function checkUrlValid() {
    if($search.val().startsWith('https://') == false && $search.val().startsWith('http://') == false) {
      $search.addClass('is-invalid');
    }
  }

  //removes class after input is filled out
  $search.click(removeInvalidClass);

  function removeInvalidClass() {
    if($searchVal) {
      $search.removeClass('is-invalid');
    }
  }
});