$(document).ready(function () {
  const apiRootURL = 'https://rel.ink';
  const $search = $('#search');

  // TODO:
  // 1. prevent user from adding multiple links by clicking fast on "shorten it" button
  // 2. clear link input field when link is successfuly shortened 
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
        .done((data) => {
          addLinks(data.url, data.hashid);

        });

    }
  });

  new ClipboardJS('.copy-btn');

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
    if (!$search.val().startsWith('https://') && !$search.val().startsWith('http://')) {
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


  function addLinks(link, shortLinkHash) {
    const $template = $('.template');
    const shortLink = apiRootURL + '/' + shortLinkHash;
    $template.append(`
      <div class="url-shorten-template">
        <div class="url-shorten-template__col link-col">
          <span class="url-shorten-template__link">${link}</span>
        </div>
        <div class="url-shorten-template__col short-link-col">
          <a href="${shortLink}" target="_blank" class="url-shorten-template__short-link">${shortLink}</a>
          <button class="url-shorten-template__btn copy-btn" type="button" data-clipboard-text="${shortLink}">Copy</button>
        </div>
      </div>
    `);

    const lastLinkNode = $('.url-shorten-template').last();
    lastLinkNode.find('.copy-btn').on('click', function () {
      $('.copy-btn').each(function () {
        if ($(this).hasClass('url-shorten-template__btn--copied')) {
          $(this).removeClass('url-shorten-template__btn--copied');
          $(this).addClass('url-shorten-template__btn');
          $(this).text('Copy');
        }
      });
      $(this).addClass('url-shorten-template__btn--copied').text('Copied');
    });

  }

  // TD: Copy short link to clipboard on button click, using Clipboard API Clipboard.writeText()
  //BUG: Link is copied just for the first displayed shortened link, next doesn't work

  // function copyToClipboard(element, button) {
  //   $(button).click(function () {
  //     navigator.clipboard.writeText($(element).html());
  //     switchBtnClass($(button));
  //   });
  // }

  //TD: Copy short link to clipboard on button click, using document.execCommand('copy')
  //BUG: Link is copied just for the first displayed shortened link, next doesn't work

  function copyToClipboard(shortLink) {
    const $tempElement = $('<input type="hidden">').val(shortLink).appendTo('body').select();
    document.execCommand('copy');
    $tempElement.remove();

    let cbData = event.clipboardData || window.clipboardData || event.originalEvent.clipboardData;
    cbData.setData('textr/html', shortLink);
    console.log(cbData);
  }

  // function switchBtnClass(element) {
  //   $(element).addClass('url-shorten-template__btn--copied').text('copied');
  // }

});