/* pageImidiate.js */
/*eslint-env browser */
/*eslint no-console: off */
/*global define,require */

define([
  'domUtil',
],
(domUtil) => {
  const {
    checkLoadedDocument,
    body,
    deviceType,
    create,
    genBar,
  } =domUtil;

  const parts = {};
  const pTitle = create('h2').text('Broklg search');

  const
        pMessage = parts.pMessage = create('span').text('...'),
        pAreaMsg = genBar(pMessage);

  const
        pInputISBN = create('input')
                .addClass('form-control')
                .setAttr('type','text'),
        pLabelISBN = create('label')
          .text('isbn for search:'),
        pSubmitButton = create('button')
          .addClass('btn')
          .setAttr('type', 'submit')
          .append(
            create('span')
            .addClass('small')
            .text('検索')
          ),
        pForm = create('form')
          .append([
            pLabelISBN,
            pInputISBN,
            pSubmitButton,
        ]),
        pInputEnvButton = create('button')
                      .addClass('btn')
                      .addClass('btn-empty')
                      .addClass('btn-light')
                      .text('booklog取得'),
        pAreaPlay = create('div').append([
          genBar([pForm,]),
          genBar([pInputEnvButton,]),
        ]);

  parts.pInputEnvButton = pInputEnvButton;
  parts.isbnParts = {
    pForm,
    pInputISBN,
    pSubmitButton,
  };
  checkLoadedDocument().then(() => {
    const pBody = body();
    pBody.clear();
    parts.body = pBody;
    if (deviceType()==='mobile') {
      parts.mobile = true;
      pBody.addClass('smartphone');
    }
  }).then(()=>{
    parts.body.append([
      pTitle,
      pAreaMsg,
      pAreaPlay,
    ]);
  }).then(() => {
    pMessage.text('imidiate parta loaded and next parts loading ...');
    try {
      //eslint-disable-next-line global-require
      require(['./page'], (page) => {
        try {
          page(parts);
        } catch (err) {
          pMessage.text('error on page.js function!');
          throw err;
        }
      });
    } catch (err) {
      pMessage.text('error on load page.js!');
      throw err;
    }
  });

});
