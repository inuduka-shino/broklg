/* booklogInfoArea.js */
/*eslint-env browser */
/*eslint no-console: off */
/*global define */

define([
  'domUtil',
],
(
  domUtil,
) => {
  const {
    create,
  } =domUtil;

  function dispElm(title) {
    const elmCnt = create('div').addFeatre('text');
    const elmTitle = create('div').featre(
      'text',
      (elm) => {
        elm.setText(title);
      });
    return create('div').feature(
      'container',
      (elm)=>{
        elm.append([elmTitle,elmCnt]);
      });
  }
  const parts = {};
  function genParts() {
    parts.title = dispElm();
    parts.top = create('div').feature(
      ['attribute','container'],
      (parts)=>{
          parts.setAttr('style', 'display:grid');
      }
    );
  }

  return {
    genParts,
    setInfo,
  };
});
