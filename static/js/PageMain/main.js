/*eslint-env browser */
/*eslint no-console: off */
/*global define */

define((require) => {
  const domUtil = require('domUtil'),
        readISBN= require('readISBN');

  const $ = domUtil.$;
  const $barcode = $('barcode'),
        $message = $('message');
        //$isbn = $('detected_isbn');

  //$barcode.addClass('hide');
  function message(msg) {
    $message.text(msg);
  }

  const isbnBarcode = readISBN({
    dom: $barcode.dom,
    show: $barcode.removeClass.bind(null,'hide'),
    hide: $barcode.addClass.bind(null,'hide'),
  });
  isbnBarcode.start().then((isbn)=>{
    message(`DETECT!:${isbn}`);
  });

});
