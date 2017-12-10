/*eslint-env browser */
/*eslint no-console: off */
/*global define,require */

define([
    './behaveOfButton',
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


      const onInputEnvButton = behaveOfButton({
        pButton: parts.pInputEnvButton,
        workingLabel: 'opened!',
        errorLabel: 'ERROR!',
      }).regHandle;

      ui.loadedInputEnv = new Promise((resolve, reject) => {
        try {
          //eslint-disable-next-line global-require
          require(['envInputArea'], (envInputArea)=>{
            resolve(envInputArea);
          });
        } catch (err) {
          reject(err);
        }
      }).then((envInputArea)=>{
        console.log('envInputArea Firest HIDE');
        parts.body.append(envInputArea.genParts());
        onInputEnvButton(()=>{
          console.log('envInputArea SHOW');
        });
        envInputArea.onSubmit(()=>{
          console.log('envInputArea HIDE');
        });
        return {
          onSubmit: envInputArea.onSubmit,
        };
      });

      // delay load parts
      message('gui function stat.');
      //eslint-disable-next-line global-require
      require(['main'], (main)=>{
        main(ui);
      });

    }; // end of retrun functio
  }
);
