/* index.js */
/*eslint-env browser */
/*eslint no-console: off */
/*global define */

define((require)=>{
  const domUtil = require('domUtil');

  domUtil.checkLoadedDocument().then(() => {
    const body = domUtil.body();
    body.addClass('test');
    body.text('test');
    if (domUtil.deviceType()==='mobile') {
      body.addClass('smartphone');
      body.text('smartphone test');
    }
    body.addClass('test2');
  });
});
