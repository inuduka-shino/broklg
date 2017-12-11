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
    let activeStat = false;

    const label = pButton.getText();
    const handles = [];

    function error(deactiveFlag=false) {
      // error状態にする。
      stat = 'ERROR';
      if (deactiveFlag) {
        pButton.addClass('btn-light');
        pButton.removeClass('btn-error');
      } else {
        pButton.text(errorLabel);
        pButton.removeClass('btn-light');
        pButton.addClass('btn-error');
      }
    }

    pButton.on('click',() =>{
      if (activeStat === false || stat !== 'release') {
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
        error();
      });
    });
    function regHandle(handle) {
      handles.push(handle);
    }
    function reset() {
      pButton.text(label);
      pButton.removeClass('btn-error');
      pButton.removeClass('btn-light');
      stat = 'release';
    }
    function active() {
      activeStat = true;
      if (stat === 'release') {
        pButton.removeClass('btn-light');
        pButton.removeClass('btn-error');
        return;
      }
      if (stat === 'push') {
        pButton.addClass('btn-light');
        pButton.removeClass('btn-error');
        return;
      }
      if (stat === 'error') {
        pButton.removeClass('btn-light');
        pButton.addClass('btn-error');
      }
    }
    function deactive() {
      activeStat = false;
      pButton.removeClass('btn-error');
      pButton.addClass('btn-light');
    }
    return {
      regHandle,
      reset,
      error,

      active,
      deactive,
    };
  };
});
