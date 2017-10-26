/*eslint-env browser */
/*eslint no-console: off */
/*global define */
/*member */


define((require) => {
  const quagga = require('quagga'),
        {
          $
        } = require('./domUtil');

  const $barcode = $('barcode'),
        $message = $('message');

  function message(msg) {
    $message.set(msg);
  }
  //
  quagga.init({
    inputStream : {
      name : 'Live',
      type : 'LiveStream',
      target: $barcode.dom,
      constraints: {
        width: 640,
        height: 300,
        facingMode: 'environment',
      },
    },
    decoder : {
      readers : ['ean_reader'],

      /* debug: {
          drawBoundingBox: true,
          showFrequency: true,
          drawScanline: true,
          showPattern: true,
      }, */
    }
  }, (err) => {
      if (err) {
          console.log(err);
          return;
      }
      console.log('Initialization finished. Ready to start');
      quagga.start();
  });
  quagga.onDetected((data) => {
    message(`detected!: ${data.codeResult.code}`);
  });
});
