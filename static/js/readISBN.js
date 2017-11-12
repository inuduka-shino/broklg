/*eslint-env browser */
/*eslint no-console: off */
/*global define */

define((require) => {
  const quagga = require('quagga'),
        isbnjs = require('isbnjs');

  function detectISBN() {
    let abort = null;
    const prms = new Promise((resolve, reject)=>{
        abort = reject;
        //resolve('9784003361313');
        quagga.onDetected((data) => {
          const retCode = data.codeResult.code;
          const isbncode = isbnjs.parse(retCode);
          if (isbncode === null) {
              return;
          }
          if (isbncode.isIsbn13()) {
              resolve(isbncode.asIsbn13(true));
              return;
          }
          if (isbncode.isIsbn10()) {
              resolve(isbncode.asIsbn13(true));
              return; //eslint-disable-line no-useless-return
          }
        });
      });

    return [prms, abort];
  }

  function abort(cntxt) {

    return cntxt.initialed.then(()=>{
      quagga.stop();
      cntxt.hide();

      if (cntxt.detecteAbort !== null) {
        cntxt.detecteAbort();
      }
      cntxt.detecteAbort = null;
    });
  }

  async function start(cntxt) {
    await cntxt.initialed;
    cntxt.show();
    quagga.start();
    const [detectedPrms, abortFunc] = await detectISBN(cntxt);
    cntxt.detecteAbort = abortFunc;
    const isbn = await detectedPrms;
    abort(cntxt);
    return isbn;
  }

  function generate({
    dom,
    show,
    hide,
  }) {
    const cntxt = {
      dom, // barcode detection camera video
      show, // dom show function
      hide, // dom hide function
      detecteAbort: null,
    };

    cntxt.initialed = new Promise((resolve, reject) => {
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
    });
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
