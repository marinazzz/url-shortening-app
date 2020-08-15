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
          addLinks(data.url, data.hashid);
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

  function addLinks(link, shortLinkHash) {
    let shortLink = apiRootURL + '/' + shortLinkHash;
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

    copyToClipboard($('.url-shorten-template__short-link'));
    //registerEvents();
  }

  //TD: Copy short link to clipboard on button click, using document.execCommand('copy')
  //BUG: Link is copied just for the first displayed shortened link, next doesn't work
  function copyToClipboard(element) {

    $('.copy-btn').click(function () {
      let $temp = $('<input>');
      $('body').append($temp);
      $temp.val($(element).html()).select();
      document.execCommand('copy');
      $temp.remove();

      switchBtnClass();
    });
  }

  function switchBtnClass() {
    $('.copy-btn').addClass('url-shorten-template__btn--copied');
    $('.copy-btn').text('copied');
  }


  // TD: Same function as copyToClipboard, using Clipboard.writeText()
  // BUG: It turns [object Object] instead of short link

  //  function registerEvents() {

  //   $('.copy-btn').click(function () {
  //       navigator.clipboard.writeText($('.url-shorten-template__short-link'))
  //       .then(function () {
  //         $('.copy-btn').addClass('url-shorten-template__btn--copied');
  //         $('.copy-btn').text('copied');
  //       })
  //   });
  // }

});