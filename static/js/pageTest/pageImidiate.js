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
        pInputEnvButton = parts.pInputEnvButton = create('button')
                      .addClass('btn')
                      .addClass('btn-empty')
                      .addClass('btn-light')
                      .text('input Env'),
        pAreaPlay = genBar(
          [
            pInputEnvButton,
          ]);

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
