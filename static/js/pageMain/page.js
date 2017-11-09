/*eslint-env browser */
/*eslint no-console: off */
/*global define */

define((require) => {
  const {
          create,
        } = require('domUtil'),
        readISBN = require('../readISBN');

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
        pButton = create('button',textElm)
                      .addClass('btn')
                      .addClass('btn-empty')
                      .text('Scan'),
        pAbortButton = create('button',textElm)
                     .addClass('btn')
                     .addClass('btn-empty')
                     .addClass('hide')
                     .text('Abort'),
        pAreaMsg = row(pMessage),
        pAreaScan = row([
          col(pButton,'xs-2'),
          col(pAbortButton,'xs-2')
        ]);


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
  function delay(info) {
    console.log('ready.');
    message('ready.');
    if (info.mobile) {
      message('Mobile !');
    }
    const pErrorMsg = create('div',textElm).addClass('col').text('error...');
    pAreaMsg.append(pErrorMsg);

    const pReader = create('div').addClass('hide');
    pAreaScan.append(pReader);
    const reader = readISBN({
      dom: pReader.dom,
      show: ()=>{
        pReader.removeClass('hide');
      },
      hide: ()=>{
        pReader.addClass('hide');
      }
    });

    pButton.on('click',() => {
      reader.start();
      pButton.addClass('hide');
      pAbortButton.removeClass('hide');
    });
    pAbortButton.on('click',() => {
      reader.abort();
      pAbortButton.addClass('hide');
      pButton.removeClass('hide');
    });

  }
  return {
    immediate,
    delay,
  };
});
