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
    parts.img = create('img');
    parts.top = create('div').feature(
      ['attribute','container'],
      (top)=>{
          top
            .setAttr('style', 'display:grid')
            .append(Object.values(parts.rows))
            .append(parts.img);
      }
    );

    parts.img.feature(['attribute'], (p) => {
      parts.top.setImg = p.setAttr.bind(null, 'src');
    });
    return parts.top;
  }
  function setInfo(info) {
    Object.entries(parts.rows).forEach(([name, elm])=>{
      elm.setText(info[name]);
    });
  }
  function setImg(url) {
    return parts.top.setImg(url);
  }
  function hide() {
    //
  }
  return {
    hide,
    genParts,
    setInfo,
    setImg,
  };
});
