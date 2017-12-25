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
    const elmCnt = create('div').addFeature('text');
    const elmTitle = create('div').feature(
      ['text'],
      (elm) => {
        elm
          .setText(title);
      }
    );
    const elmTop = create('div').feature(
      ['attribute','container'],
      (elm)=>{
        elm
          .setAttr('style', `
            display:grid;
            grid-template-columns: 10em 1fr;
          `)
          .append([elmTitle,elmCnt]);
      });
      elmTop.setText = elmCnt.setText;
      elmTop.setText('--');
      return elmTop;
  }
  const parts = {
    rows: {},
  };
  function genParts() {
    parts.children = [
      ['title', 'タイトル'],
      ['catalog','区分'],
      ['author','著者'],
    ].forEach(([name, dispName])=>{
      parts.rows[name] = dispElm(dispName);
    });
    parts.top = create('div').feature(
      ['attribute','container'],
      (top)=>{
          top.setAttr('style', 'display:grid');
          top.append(Object.values(parts.rows));
      }
    );
    return parts.top;
  }
  function setInfo(info) {
    Object.entries(parts.rows).forEach(([name, elm])=>{
      elm.setText(info[name]);
    });
  }
  function hide() {
    //
  }
  return {
    hide,
    genParts,
    setInfo,
  };
});
