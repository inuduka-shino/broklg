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
                .addFeature(['class', 'text', 'event'])
                .addClass('btn')
                .addClass('btn-empty')
                .addClass('btn-light')
                .setText('取得開始'),
  pClearButton = parts.pClearButton = create('button')
                .addFeature(['class', 'text', 'event'])
                .addClass('btn')
                .addClass('btn-empty')
                .addClass('btn-light')
                .setText('clear');

  const pInputId = create('input')
          .addFeature(['val', 'class', 'attribute'])
          .addClass('form-control')
          .setAttr('type','text'),
        pInputCount = create('input')
          .addFeature(['val', 'class', 'attribute'])
          .addClass('form-control')
          .setAttr('type','text'),
        pLabelId = create('label')
          .addFeature('text')
          .setText('booklog userId:'),
        pLabelCount = create('label')
          .addFeature('text')
          .setText('count:'),
        pSubmitButton = create('button')
          .addFeature(['class', 'text', 'attribute', 'event', 'container'])
          .addClass('btn')
          .setAttr('type', 'submit')
          .append(
            create('span')
            .addFeature(['class', 'text'])
            .addClass('small')
            .setText('登録')
          ),
        pForm = create('form')
          .addFeature(['container', 'event'])
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
  const pArea = create('div')
    .addFeature(['container', 'class'])
    .append([
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
      //row(col(create('div',textElm).setText('AAA'))),
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
