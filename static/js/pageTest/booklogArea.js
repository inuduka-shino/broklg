/* booklogArea.js */
/*eslint-env browser */
/*eslint no-console: off */
/*global define */

define([
  'domUtil',
  '../behaveOfButton',
],
(
  domUtil,
  behaveOfButton,
) => {
  const {
    create,
    genBar,
  } =domUtil;


  const handlers=[];
  const parts = {},
  pGetBooklogButton = parts.pGetBooklogButton = create('button')
                .addClass('btn')
                .addClass('btn-empty')
                .addClass('btn-light')
                .text('booklog取得'),
  pClearButton = parts.pClearButton = create('button')
                .addClass('btn')
                .addClass('btn-empty')
                .addClass('btn-light')
                .text('clear');

  const pInputId = create('input')
          .addClass('form-control')
          .setAttr('type','text'),
        pInputCount = create('input')
                .addClass('form-control')
                .setAttr('type','text'),
        pLabelId = create('label')
          .text('booklog userId:'),
        pLabelCount = create('label')
          .text('count:'),
        pSubmitButton = create('button')
          .addClass('btn')
          .setAttr('type', 'submit')
          .append(
            create('span')
            .addClass('small')
            .text('登録')
          ),
        pForm = create('form')
          .append([
            pLabelId,pInputId,
            pLabelCount,pInputCount,
            pSubmitButton])
          .on(
            'submit',
            (event)=>{
              event.preventDefault();
              handlers.reduce((prevObj, func)=>{
                try {
                  return prevObj.then(
                    func.bind(null, {
                      id: pInputId.val(),
                      count: pInputCount.val(),
                    })
                  );
                } catch (err) {
                  return Promise.reject(err);
                }
              }, Promise.resolve());
            });
  const pArea = create('div').append([
    genBar([pGetBooklogButton, pClearButton,]),
    genBar([pForm]),
  ]);
  function setVal(valObj) {
    if (typeof valObj.userid !== 'undefined') {
      pInputId.setVal(valObj.userid);
    }
    if (typeof valObj.count !== 'undefined') {
      pInputCount.setVal(valObj.count);
    }
  }
  function hide() {
    pArea.addClass('hide');
  }
  function show() {
    pArea.removeClass('hide');
  }
  function toggle() {
    pArea.toggleClass('hide');
  }
  function genParts() {
    return [
       pArea,
      //row(col(create('div',textElm).text('AAA'))),
    ];
  }
  function onSubmit(func) {
    handlers.push(func);
  }

  const
    bhvSearchButton = behaveOfButton({
      pButton: parts.pGetBooklogButton, //eslint-disable-line object-shorthand
      workingLabel: 'working...',
      errorLabel: 'ERROR!',
    }),
    bhvClearButton = behaveOfButton({
      pButton: parts.pClearButton,
      workingLabel: '...',
      errorLabel: 'ERROR!',
    });

  return {
    genParts,
    onSubmit,
    setVal,
    hide,
    show,
    toggle,

    bhvSearchButton,
    bhvClearButton,
  };
});
