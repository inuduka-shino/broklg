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
        parts.pMessage.text(msg);
      };

      // first line buttons
      ui.bhvSearchButton = behaveOfButton({
        pButton: parts.pButton, //eslint-disable-line object-shorthand
        workingLabel: 'working...',
        errorLabel: 'ERROR!',
      });

      ui.bhvClearButton = behaveOfButton({
        pButton: parts.pClearButton,
        workingLabel: '...',
        errorLabel: 'ERROR!',
      });


      ui.bhvOpenEnvInputButton = behaveOfButton({
        pButton: parts.pInputEnvButton,
        workingLabel: 'opened!',
        errorLabel: 'ERROR!',
      });

      ui.loadedInputEnv = new Promise((resolve, reject) => {
        try {
          //eslint-disable-next-line global-require
          require(['envInputArea'], (envInputArea)=>{
            resolve(envInputArea);
          });
        } catch (err) {
          console.log('can not load nevInputArea.js !');
          reject(err);
        }
      }).then((envInputArea)=>{
        envInputArea.hide();
        parts.body.append(envInputArea.genParts());
        return envInputArea;
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
