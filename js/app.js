$(document).ready(function () {
  const apiRootURL = 'https://rel.ink';
  const $search = $('#search');
  const $submitBtn = $('#submitBtn');

  $submitBtn.click(function (e) {
    e.preventDefault();

    checkSearchEmpty();
    checkUrlValid();

    if (validation.$validUrl && validation.$searchVal) {
      $submitBtn.attr('disabled', true);
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
          clearInputField();
          $submitBtn.attr('disabled', false);
        })
        .fail(() => {
          showAlert();
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
      clearInputField();
      return;
    }
    validation.$searchVal = true;
  }

  function checkUrlValid() {
    if (!$search.val().startsWith('https://') && !$search.val().startsWith('http://')) {
      $search.addClass('is-invalid');
      validation.$validUrl = false;
      clearInputField();
      return;
    }
    validation.$validUrl = true;
  }

  $search.click(() => {
    if ($search.hasClass('is-invalid')) {
      $search.removeClass('is-invalid');
    }
  });

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

  function showAlert() {
    $('.alert').addClass('alert--show');
    $('.close').click(() => {
      $('.alert').removeClass('alert--show');
    });
  }

  function clearInputField() {
    if (validation.$validUrl || validation.$searchVal) {
      $search.val('');
    }
  }

});