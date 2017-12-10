/* behaveOfButton.js */
/*eslint-env browser */
/*eslint no-console: off */
/*global define */


define(()=>{
  return function ({
                  pButton,
                  workingLabel,
                  errorLabel,
              }) {
    let stat = 'release'; // push error
    const label = pButton.getText();
    const handles = [];

    pButton.on('click',() =>{
      if (stat !== 'release') {
        return;
      }
      stat = 'push';
      pButton.text(workingLabel);
      pButton.addClass('btn-light');

      const prmsHandles = handles.reduce(
          (prevPrms,handle)=>{
            return prevPrms.then(handle);
          },
          Promise.resolve()
        );
      prmsHandles.then(()=>{
        stat = 'release';
        pButton.text(label);
        pButton.removeClass('btn-light');
      },(err)=>{
        // message(err);
        console.log('Error on ClickHandle');
        console.log(err);
        stat = 'ERROR';
        pButton.text(errorLabel);
        pButton.addClass('btn-error');
      });
    });
    function regHandle(handle) {
      pButton.removeClass('btn-light');
      handles.push(handle);
    }

    return {
      regHandle,
    };
  };
});
