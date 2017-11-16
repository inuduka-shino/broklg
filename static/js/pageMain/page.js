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
                     .text('Abort'),
        pAreaMsg = row(pMessage),
        pColButton = col(pButton,'xs-2'),
        pColAbortButton = col(pAbortButton,'xs-2').addClass('hide'),
        pAreaScan = row([
          pColButton,
          pColAbortButton,
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
    const pTraceMsg = create('div',textElm).addClass('col').text('trace..');
    //pAreaMsg.append(pErrorMsg);
    pAreaMsg.append(pTraceMsg);
    function trace(msg) {
      const d = new Date();
      pTraceMsg.text(`${d.toLocaleTimeString()}:${msg}`);
    }
    trace('trace test');
    const pReader = create('div');
    pAreaScan.append(pReader);
    const reader = readISBN({
      dom: pReader.dom,
      show: ()=>{
        pReader.removeClass('hide');
      },
      hide: ()=>{
        pReader.addClass('hide');
      },
      message: trace,
    });

    /*
    reader.start().then((isbn)=>{
      message(`detected:${isbn}`);
    });
    */

    pButton.on('click',() => {
      reader.start().then((isbn)=>{
        message(`detected:${isbn}`);
      });
      pColButton.addClass('hide');
      pColAbortButton.removeClass('hide');
    });
    pAbortButton.on('click',() => {
      message('abort');
      reader.abort();
      pColAbortButton.addClass('hide');
      pColButton.removeClass('hide');
    });

  }
  return {
    immediate,
    delay,
  };
});
