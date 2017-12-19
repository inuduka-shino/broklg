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
  const pTitle = create('h2')
          .addFeature('text')
          .setText('Broklg search');

  const
        pMessage = parts.pMessage = create('span')
            .addFeature('text')
            .setText('...'),
        pAreaMsg = genBar(pMessage);

  const
        pInputISBN = create('input')
                .addFeature(['class','attribute'])
                .addClass('form-control')
                .setAttr('type','text'),
        pLabelISBN = create('label')
          .addFeature('text')
          .setText('isbn for search:'),
        pSubmitButton = create('button')
          .addFeature(['class','attribute', 'event' , 'container'])
          .addClass('btn')
          .setAttr('type', 'submit')
          .append(
            create('span')
            .addFeature(['class','text'])
            .addClass('small')
            .setText('検索')
          ),
        pForm = create('form')
          .addFeature(['container'])
          .append([
            pLabelISBN,
            pInputISBN,
            pSubmitButton,
        ]),
        pInputEnvButton = create('button')
            .addFeature(['class','text', 'event'])
            .addClass('btn')
            .addClass('btn-empty')
            .addClass('btn-light')
            .setText('booklog取得'),
        pAreaPlay = create('div')
            .addFeature(['container'])
            .append([
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
    const pBody = body().addFeature(['container', 'text']);
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
    pMessage.setText('imidiate parta loaded and next parts loading ...');
    try {
      //eslint-disable-next-line global-require
      require(['./page'], (page) => {
        try {
          page(parts);
        } catch (err) {
          pMessage.setText('error on page.js function!');
          throw err;
        }
      });
    } catch (err) {
      pMessage.setText('error on load page.js!');
      throw err;
    }
  });

});
