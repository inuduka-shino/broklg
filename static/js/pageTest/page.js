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

      ui.bhvSearchISBN = (()=>{
        const {
          pForm,
          pInputISBN,
        } = parts.isbnParts;

        const handlers = [];
        function onSubmit(handler) {
          handlers.push(handler);
        }

        pForm.addFeature(['event']);
        pInputISBN.addFeature(['val']);
        pForm.on('submit', (event)=>{
          event.preventDefault();
          handlers.forEach((handler)=>{
            handler(pInputISBN.val());
          });
        });

        return {
          onSubmit,
        };

      })();

      ui.bhvOpenEnvInputButton = behaveOfButton({
        pButton: parts.pInputEnvButton,
        workingLabel: 'opened!',
        errorLabel: 'ERROR!',
      });

      [
        ui.loadedBooklogArea,
        ui.loadedBooklogInfoArea,
      ] = [
        'booklogArea',
        'booklogInfoArea'
      ].map((modulePath)=>{
        return new Promise((resolve, reject) => {
          try {
            //eslint-disable-next-line global-require
            require([modulePath], (partsArea)=>{
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
