/*eslint-env browser */
/*eslint no-console: off */
/*global require */
/*member */


require(['quagga', 'isbnjs', './domUtil'],(quagga, isbnjs, domUtil) => {
  const $ = domUtil.$;

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
  //$barcode.addClass('hide');
  const dummy = Promise.resolve({
    codeResult: {
      code: '9784003361313',
    }
  });
  const detectISBN = new Promise((resolve)=>{
      quagga.onDetected((data) => {
      //dummy.then((data) => {
        const retCode = data.codeResult.code;
        message(`detected.: ${retCode}`);
        const isbncode = isbnjs.parse(retCode);
        if (isbncode === null) {
            return;
        }
        message(`detected.: ${retCode}:${isbncode.isIsbn13()}`);
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
    detectISBN.then((isbnStr)=>{
        $isbn.text(isbnStr);
        quagga.stop();
        $barcode.addClass('hide');
    });

  });
