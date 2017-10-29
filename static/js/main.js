/*eslint-env browser */
/*eslint no-console: off */
/*global define */
/*member */


define((require) => {
  const quagga = require('quagga'),
        isbnjs = require('isbnjs'),
        {
          $
        } = require('./domUtil');

  const $barcode = $('barcode'),
        $message = $('message'),
        $isbn = $('detected_isbn');

  function message(msg) {
    $message.text(msg);
  }
  //
  quagga.init({
    inputStream : {
      name : 'Live',
      type : 'LiveStream',
      target: $barcode.dom,
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
          console.log(err);
          return;
      }
      console.log('Initialization finished. Ready to start');
      message('quagga start');
      quagga.start();
  });

  /*
  quagga.onProcessed((data) => {
    //message(`onProcesse ... : ${typeof data}`);
  });
  */
  const detectISBN = new Promise((resolve)=>{
      quagga.onDetected((data) => {
        const retCode = data.codeResult.code;
        message(`detected.: ${retCode}`);
        const isbncode = isbnjs.parse(retCode);
        if (isbncode === null) {
            return;
        }
        if (isbncode.isIsbn13()) {
            resolve(isbncode.asIsbn13(true));
            $isbn.text(isbncode.asIsbn13(true));
            return;
        }
        if (isbncode.isIsbn10()) {
            resolve(isbncode.asIsbn10(true));
            return; //eslint-disable-line no-useless-return
        }
      });
    });
    detectISBN.then((isbnStr)=>{
        message(`DETECTED!: ${isbnStr}`);
        quagga.end();
    });

  });
