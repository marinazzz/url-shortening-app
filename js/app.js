$(document).ready(function () {
  const apiRootURL = 'https://rel.ink';
  const $search = $('#search');

  $('#submitBtn').click(function (e) {
    e.preventDefault();
    checkSearchEmpty();
    checkUrlValid();

    if (validation.$validUrl && validation.$searchVal) {
      $.ajax({
        method: 'POST',
        url: 'https://rel.ink/api/links/',
        data: {
          url: $search.val().trim()
        },
        dataType: "json"
      })
        .done((data, textStatus, jqXHR) => {
          addLink(data.url, data.hashid);
        });
    }
  });

  // there is no need to use $ in front object property names since they are not jQuery objects
  const validation = {
    $searchVal: false,
    $validUrl: false
  };

  function checkSearchEmpty() {
    if ($search.val() === '' || $search.val() === null) {
      $search.addClass('is-invalid');
      validation.$searchVal = false;
      return;
    }
    validation.$searchVal = true;
  }

  // please refactor this using checkSearchEmpty function as a reference
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

  function addLink(link, shortLinkHash) {
    const shortLink = apiRootURL + '/' + shortLinkHash;
    $template.append(`
      <div class="url-shorten-template">
        <div class="url-shorten-template__col link-col">
          <span class="url-shorten-template__link">${link}</span>
        </div>
        <div class="url-shorten-template__col short-link-col">
          <a href="${shortLink}" target="_blank" class="url-shorten-template__short-link">${shortLink}</a>
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