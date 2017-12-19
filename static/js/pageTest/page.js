/* page.js */
/*eslint-env browser */
/*eslint no-console: off */
/*global define,require */

define([
    '../behaveOfButton',
  ],(
    behaveOfButton
  ) => {
    const ui = {};
    return (parts) => {
      // message
      const message = ui.message = (msg)=>{
        parts.pMessage.setText(msg);
      };

      ui.bhvOpenEnvInputButton = behaveOfButton({
        pButton: parts.pInputEnvButton,
        workingLabel: 'opened!',
        errorLabel: 'ERROR!',
      });

      ui.loadedBooklogArea = new Promise((resolve, reject) => {
        try {
          //eslint-disable-next-line global-require
          require(['booklogArea'], (partsArea)=>{
            resolve(partsArea);
          });
        } catch (err) {
          console.log('can not load nevInputArea.js !');
          reject(err);
        }
      }).then((partsArea)=>{
        partsArea.hide();
        parts.body.append(partsArea.genParts());
        return partsArea;
      });

      // delay load parts
      message('gui function start.');
      //eslint-disable-next-line global-require
      require(['main'], (main)=>{
        main(ui);
      });

    }; // end of retrun functio
  }
);
