/* index.js */
/*eslint-env browser */
/*eslint no-console: off */
/*global define */

define((require)=>{
  const domUtil = require('domUtil');
  const page = require('./page');

  const bodyDom = page.immediate();
  domUtil.checkLoadedDocument().then(() => {
    const body = domUtil.body();
    body.clear();
    const info = {
      body,
    };
    if (domUtil.deviceType()==='mobile') {
      info.mobile = true;
      body.addClass('smartphone');
    }
    body.append(bodyDom);
    page.delay(info);
  });
});
