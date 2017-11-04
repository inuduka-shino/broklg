/* domUtil.js */
/*eslint-env browser */
/*eslint no-console: off */
/*global require */

require.config({
  paths: {
    'maquette': ['/lib/maquette/maquette.min',],
    'domUtil': ['/lib/domUtil',],
    'quagga': ['../lib/quagga/quagga.min',],
    'isbnjs': ['../lib/isbnjs/isbn',],
  },
  shim: {
    'quagga': {
        exports: 'quagga',
        init() {
          //eslint-disable-next-line no-undef
          this.quagga = Quagga;
        }
    },

    'isbnjs': {
        exports: 'isbn',
        init() {
          //eslint-disable-next-line no-undef
          this.isbn = ISBN;
        }
    },

  }

});
