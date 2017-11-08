/*eslint-env browser */
/*eslint no-console: off */
/*global define */

define((require) => {
  const {
      create,
    } = require('domUtil');

  function row(children) {
    const parent = create('div').addClass('row');
    parent.append(children);
    return parent;
  }
  function col(child, colSize) {
    return create('div').addClass('col').addClass(colSize).append(child);
  }
  const textElm = {
          text: true,
        },
        pTitle = create('h2', textElm).text('Broklg'),
        pMessage = create('div',textElm).addClass('col').text('...'),
        pButton = create('button',textElm).addClass('btn').text('登録'),
        pAreaMsg = row(pMessage),
        pAreaScan = row(col(pButton,'xs-1'));

  function message(msg) {
    pMessage.text(msg);
  }
  function immediate() {
    return [
      pTitle,
      pAreaMsg,
      pAreaScan,
    ];
  }
  function delay() {
    console.log('ready.');
    message('ready.');

    const pErrorMsg = create('div',textElm).addClass('col').text('error...');
    pAreaMsg.append(pErrorMsg);
  }
  return {
    immediate,
    delay,
  };
});
