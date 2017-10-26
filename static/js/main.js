/*eslint-env browser */
/*eslint no-console: off */
/*global define */
/*member */


define((require) => {
  const quagga = require('quagga'),
        {
          $
        } = require('./domUtil');

  const $barcode = $('barcode');
  //
  quagga.init({
    inputStream : {
      name : 'Live',
      type : 'LiveStream',
      target: $barcode.dom
    },
    decoder : {
      readers : ['code_128_reader']
    }
  }, (err) => {
      if (err) {
          console.log(err);
          return;
      }
      console.log('Initialization finished. Ready to start');
      quagga.start();
  });
});
