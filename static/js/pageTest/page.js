/*eslint-env browser */
/*eslint no-console: off */
/*global define,require */

define([
    '/lib/common/behaveOfButton.js',
  ],(
    behaveOfButton
  ) => {
    const ui = {};
    return (parts) => {
      // message
      const message = ui.message = (msg)=>{
        parts.pMessage.text(msg);
      };

      // 1lien buttons
      ui.onClickButtonA = behaveOfButton({
        pButton: parts.pButton, //eslint-disable-line object-shorthand
        workingLabel: 'working...',
        errorLabel: 'ERROR!',
      }).regHandle;

      ui.onClickButtonClear = behaveOfButton({
        pButton: parts.pClearButton,
        workingLabel: '...',
        errorLabel: 'ERROR!',
      }).regHandle;

      ui.onInputEnvButton = behaveOfButton({
        pButton: parts.pInputEnvButton,
        workingLabel: 'opened!',
        errorLabel: 'ERROR!',
      }).regHandle;

      // delay load parts
      new Promise((resolve, reject) => {
        try {
          //eslint-disable-next-line global-require
          require(['envInputArea'], (envInputArea)=>{
            parts.body.append(envInputArea.genParts());
            ui.onSubmitEnvInputArea = envInputArea.onSubmit;
            resolve();
          });
        } catch (err) {
          reject(err);
        }
      }).then(()=>{
        message('gui function stat.');
        //eslint-disable-next-line global-require
        require(['main'], (main)=>{
          main(ui);
        });
      });

    }; // end of retrun functio
  }
);
