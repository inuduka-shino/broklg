/*eslint-env browser */
/*eslint no-console: off */
/*global define */

define((require) => {
  const {
          checkLoadedDocument,
          body,
          deviceType,
          create,

        } = require('domUtil');

    const ui = {};
    const loaded = checkLoadedDocument().then(() => {
      const pBody = body();
      pBody.clear();
      if (deviceType()==='mobile') {
        ui.mobile = true;
        pBody.addClass('smartphone');
      }
      return pBody;
    });

  function row(children) {
    const parent = create('div').addClass('row');
    parent.append(children);
    return parent;
  }
  function col(child, colSize) {
    return create('div').addClass('col').addClass(colSize).append(child);
  }
  const textElm = {
          text: true,
        },
        pTitle = create('h2', textElm).text('Broklg search'),
        pMessage = create('div',textElm).addClass('col').text('...'),
        pAreaMsg = row(pMessage),
        pButton = create('button',textElm)
                      .addClass('btn')
                      .addClass('btn-empty')
                      .text('start'),
        pClearButton = create('button',textElm)
                      .addClass('btn')
                      .addClass('btn-empty')
                      .text('clear'),
        pColButton = col(pButton,'xs-2'),
        pAreaPlay = row([pColButton, col(pClearButton,'xs-2')]);


  const message = ui.message = (msg) => {
    pMessage.text(msg);
  };


  loaded.then((pBody)=>{
    pBody.append([
      pTitle,
      pAreaMsg,
      pAreaPlay,
    ]);
  });

  function behaveOfButton({
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

      const prmsHandles = handles.reduce(
          (prevPrms,handle)=>{
            return prevPrms.then(handle);
          },
          Promise.resolve()
        );
      prmsHandles.then(()=>{
        stat = 'release';
        pButton.text(label);
      },(err)=>{
        message(err);
        console.log('Error on ClickHandle');
        console.log(err);
        stat = 'ERROR';
        pButton.text(errorLabel);
      });
    });

    function regHandle(handle) {
      handles.push(handle);
    }

    return {
      regHandle,
    };
  }

  function delay() {
    ui.onClickButtonA = behaveOfButton({
      pButton: pButton, //eslint-disable-line object-shorthand
      workingLabel: 'working...',
      errorLabel: 'ERROR!',
    }).regHandle;
    ui.onClickButtonClear = behaveOfButton({
      pButton: pClearButton, //eslint-disable-line object-shorthand
      workingLabel: 'working...',
      errorLabel: 'ERROR!',
    }).regHandle;
    return Promise.resolve();
  }

  function start(handler) {
    return loaded.then(async ()=>{
      await delay();
      await handler(ui);
    });
  }
  return {
    start,
  };
});
