/* index.js */
/*eslint-env browser */
/*eslint no-console: off */
/*global define */

define((require)=>{
  const domUtil = require('domUtil');
  const pageMain = require('./pageMain/page'),
        pageMainIndex = require('./pageMain/index');

  domUtil.checkLoadedDocument().then(() => {
    const body = domUtil.body();
    body.clear();
    if (domUtil.deviceType()==='mobile') {
      body.addClass('smartphone');
    }
    body.append(pageMain.doms());
    pageMainIndex(pageMain.handle());
  });
});
