/*eslint-env browser */
/*eslint no-console: off */
/*global define */

define([
  'domUtil',
  './main',
],
(domUtil, main) => {
  const {
          checkLoadedDocument,
          body,
          deviceType,
          create,

        } =domUtil;

    const ui = {};

  function row(children) {
    const parent = create('div').addClass('row');
    parent.append(children);
    return parent;
  }
  function col(child, colSize) {
    return create('div').addClass('col').addClass(colSize).append(child);
  }
  function respSelf(val) {
    return ()=>{
      return val;
    };
  }
  function genBar(children=null) {
    const pOuter = create('div').addClass('row'),
          pInner = create('div').addClass('col');
    pOuter.append(pInner);
    if (children !== null) {
      pInner.append(children);
    }
    pOuter.directAppend = pOuter.append;
    pOuter.append = pInner.append;
    pOuter.inner = pInner;

    return pOuter;
  }
  const textElm = {
          text: true,
        },
        pTitle = create('h2', textElm).text('Broklg search');

  const
        pMessage = create('span',textElm).text('...'),
        pAreaMsg = genBar(pMessage),
        message = ui.message = (msg) => {
          pMessage.text(msg);
        };

  const
        pButton = create('button',textElm)
                      .addClass('btn')
                      .addClass('btn-empty')
                      .text('start'),
        pClearButton = create('button',textElm)
                      .addClass('btn')
                      .addClass('btn-empty')
                      .text('clear'),
        pInputEnvButton = create('button',textElm)
                      .addClass('btn')
                      .addClass('btn-empty')
                      .text('input Env'),
        pAreaPlay = genBar(
          [
            pButton,
            pInputEnvButton,
            pClearButton,
          ]);

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

  const envInputArea = (()=>{
    const handlers=[];
    const pInput = create('input')
            .addClass('form-control')
            .setAttr('type','text'),
          pLabel = create('label', textElm)
            // .addClass('big')
            .text('booklog userId:'),
          pSubmitButton = create('button')
            .addClass('btn')
            .setAttr('type', 'submit')
            .append(
              create('span',textElm)
              .addClass('small')
              .text('登録')
            ),
          pForm = create('form')
            .append([pLabel,pInput, pSubmitButton])
            .on(
              'submit',
              (event)=>{
                event.preventDefault();
                handlers.reduce((prevObj, func)=>{
                  try {
                    return prevObj.then(func.bind(null,pInput.val()));
                  } catch (err) {
                    return Promise.reject(err);
                  }
                }, Promise.resolve());
              });
    const pArea = genBar([pForm]);
    function genParts() {
      return [
         pArea,
        //row(col(create('div',textElm).text('AAA'))),
      ];
    }
    function onSubmit(func) {
      handlers.push(func);
    }
    return {
      genParts,
      onSubmit,
    };
  })();

  const loaded = checkLoadedDocument().then(() => {
    const pBody = body();
    pBody.clear();
    if (deviceType()==='mobile') {
      ui.mobile = true;
      pBody.addClass('smartphone');
    }
    return pBody;
  }).then((pBody)=>{
    pBody.append([
      pTitle,
      pAreaMsg,
      pAreaPlay,
    ]);
    return pBody;
  }).then((pBody)=>{
    // ------
    ui.onClickButtonA = behaveOfButton({
      pButton: pButton, //eslint-disable-line object-shorthand
      workingLabel: 'working...',
      errorLabel: 'ERROR!',
    }).regHandle;
    ui.onClickButtonClear = behaveOfButton({
      pButton: pClearButton, //eslint-disable-line object-shorthand
      workingLabel: '...',
      errorLabel: 'ERROR!',
    }).regHandle;

    pBody.append(envInputArea.genParts());
    ui.onInputEnvButton = behaveOfButton({
      pButton: pInputEnvButton,
      workingLabel: 'opened!',
      errorLabel: 'ERROR!',
    }).regHandle;
    ui.onSubmitEnvInputArea = envInputArea.onSubmit;

    return Promise.resolve();
  }).then(() => {
    main(ui);
  });

});
