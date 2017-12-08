/* domUtil.js */
/*eslint-env browser */
/*eslint no-console: off */
/*global require */

(function (config) {
  if (typeof require === 'undefined') {
    require = config; //eslint-disable-line no-global-assign, no-native-reassign
  } else {
    require.config(config);
  }

}({
  paths: {
    'maquette': ['/lib/maquette/maquette.min',],
    'quagga': ['../lib/quagga/quagga.min',],
    'isbnjs': ['../lib/isbnjs/isbn',],
    'domUtil': ['/lib/common/domUtil',],
    'jsonp': ['/lib/common/jsonp',],
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

}));
