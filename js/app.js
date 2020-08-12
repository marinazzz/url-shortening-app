$(document).ready(function () {

  const $search = $('#search');

  $('#submitBtn').click(function (e) {
    e.preventDefault();
    checkSearchEmpty();
    checkUrlValid();

    if (validation.$validUrl == true) {
      //fetchUrls();
      displayLinks();
    }
  })

  const validation = {
    $searchVal: false,
    $validUrl: false
  };

  function checkSearchEmpty() {
    if ($search.val() === '' || $search.val() === null) {
      $search.addClass('is-invalid');
    } return validation.$searchVal = true;
  }

  function checkUrlValid() {
    if ($search.val().startsWith('https://') == false && $search.val().startsWith('http://') == false) {
      $search.addClass('is-invalid');
    } return validation.$validUrl = true;
  }


  //removes class after input is filled out
  $search.click(removeInvalidClass);

  function removeInvalidClass() {
    if (validation.$searchVal) {
      $search.removeClass('is-invalid');
    }
  }

  let $template = $('.template');
  function displayLinks() {
    $template.append(`
        <div class="url-shorten-template">
              <div class="url-shorten-template__col link-col">
                <span class="url-shorten-template__link">${$('#search').val()}</span>
              </div>
              <div class="url-shorten-template__col short-link-col">
                <a href="" class="url-shorten-template__short-link">https://rel.ink/</a>
                <button class="url-shorten-template__btn" type="button">Copy</button>
              </div>
            </div>
      `);
  }

  //post data

   /* let link = {
     search: $search.val()
   }

  function fetchUrls() {
    $.ajax({
      type: 'POST',
      url: 'https://rel.ink/api/links/',
      data: link,
    }).done(function(){
      displayLinks();
    });
  } */

});