/* envInputArea.js */
/*eslint-env browser */
/*eslint no-console: off */
/*global define */

define([
  'domUtil',
],
(domUtil) => {
  const {
    create,
    genBar,
  } =domUtil;


  const handlers=[];
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
  const pArea = genBar([pForm]);
  function setVal(valObj) {
    if (typeof valObj.id !== 'undefined') {
      pInputId.setVal(valObj.id);
    }
    if (typeof valObj.Count !== 'undefined') {
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
  return {
    genParts,
    onSubmit,
    setVal,
    hide,
    show,
    toggle,
  };
});
