/*eslint-env browser */
/*eslint no-console: off */
/*global define */

define((require) => {
  const quagga = require('quagga'),
        isbnjs = require('isbnjs');

  function initQuagga(cntxt, resolve, reject) {
    quagga.init({
      inputStream : {
        name : 'Live',
        type : 'LiveStream',
        target: cntxt.dom,
        constraints: {
          //width: 640,
          //height: 300,
          facingMode: 'environment',
        },
      },
      decoder : {
        readers : ['ean_reader'],

        debug: {
            drawBoundingBox: true,
            showFrequency: true,
            drawScanline: true,
            showPattern: true,
        },
      },
      locator: {
        //halfSample: true,
        patchSize: 'x-large', // x-small, small, medium, large, x-large
      },
    }, (err) => {
        if (err) {
            reject(err);
            return;
        }
        // quagga.stop();
        resolve();
    });
  }
  function detectISBNStart(cntxt) {
    // quagga.stop();
    quagga.onDetected((data) => {
      const cb = cntxt.detectISBNcb;
      if (cb === null) {
        return;
      }
      const retCode = data.codeResult.code;
      //msg(`-- onDetect:${retCode}`);
      const isbncode = isbnjs.parse(retCode);
      if (isbncode === null) {
          return;
      }
      if (isbncode.isIsbn13()) {
          cb(isbncode.asIsbn13(true));
          return;
      }
      if (isbncode.isIsbn10()) {
          cb(isbncode.asIsbn13(true));
          return; //eslint-disable-line no-useless-return
      }
      return; //eslint-disable-line no-useless-return
    });
  }

  function abort(cntxt) {
    //quagga.stop();
    cntxt.hide();
    if (cntxt.detecteAbort !== null) {
      cntxt.detecteAbort();
    }
    cntxt.detectISBNcb = null;
    cntxt.detecteAbort = null;
  }

  function start(cntxt) {
    cntxt.show();
    //quagga.start();
    const prms = new Promise((resolve,reject) =>{
      cntxt.detectISBNcb = resolve;
      cntxt.detecteAbort = reject;
    });
    cntxt.detectISBNcb = null;
    cntxt.detecteAbort = null;
    prms.then(abort.bind(null, cntxt));
    return prms;
  }

  function generate({
    dom,
    show,
    hide,
    message,
  }) {
    const cntxt = {
      dom, // barcode detection camera video
      show, // dom show function
      hide, // dom hide function
      detectISBNcb: null,
      detecteAbort: null,
      message,
    };

    cntxt.initialed = new Promise(initQuagga.bind(null, cntxt));
    cntxt.initialed.then(detectISBNStart.bind(null,cntxt));
    return {
        start: start.bind(null, cntxt),
        abort: abort.bind(null, cntxt),
    };
  }

  return generate;

  /*
  quagga.onProcessed((data) => {
    //message(`onProcesse ... : ${typeof data}`);
  });
  */

  });
