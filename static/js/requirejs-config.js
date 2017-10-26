/* domUtil.js */
/*eslint-env browser */
/*eslint no-console: off */
/*global require */

require.config({
  paths: {
    'maquette': ['/lib/maquette/maquette.min',],
    'quagga': ['../lib/quagga/quagga.min',],
  },
  shim: {
    'quagga': {
          exports: 'quagga',
          init() {
            //eslint-disable-next-line no-undef
            this.quagga = Quagga;
          }
    }
  }

});
