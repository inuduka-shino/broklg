/* index.js */
/*eslint-env browser */
/*eslint no-console: off */
/*global define */

define((require)=>{
  const domUtil = require('domUtil');
  const pageMain = require('./pageMain/page');

  const bodyDom = pageMain.immediate();
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
    pageMain.delay(info);
  });
});
