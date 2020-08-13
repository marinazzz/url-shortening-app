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

  const validation = {
    searchVal: false,
    validUrl: false
  };

  function checkSearchEmpty() {
    if ($search.val() === '' || $search.val() === null) {
      $search.addClass('is-invalid');
      validation.$searchVal = false;
      return;
    }
    validation.$searchVal = true;
  }

  function checkUrlValid() {
    if (($search.val().startsWith('https://') === false) && ($search.val().startsWith('http://') === false)) {
      $search.addClass('is-invalid');
      validation.$validUrl = false;
      return;
    }
    validation.$validUrl = true;
  }

  $search.click(removeInvalidClass);

  function removeInvalidClass() {
    if ($search.hasClass('is-invalid')) {
      $search.removeClass('is-invalid');
    }
  }

  let $template = $('.template');

  const shortLink;
  function addLink(link, shortLinkHash) {
    const shortLink = apiRootURL + '/' + shortLinkHash;
    $template.append(`
      <div class="url-shorten-template">
        <div class="url-shorten-template__col link-col">
          <span class="url-shorten-template__link">${link}</span>
        </div>
        <div class="url-shorten-template__col short-link-col">
          <a href="${shortLink}" target="_blank" class="url-shorten-template__short-link">${shortLink}</a>
          <button class="url-shorten-template__btn copy-btn" type="button">Copy</button>
        </div>
      </div>
    `);
  }

});