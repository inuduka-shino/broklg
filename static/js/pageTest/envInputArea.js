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
  const pInput = create('input')
          .addClass('form-control')
          .setAttr('type','text'),
        pLabel = create('label')
          // .addClass('big')
          .text('booklog userId:'),
        pSubmitButton = create('button')
          .addClass('btn')
          .setAttr('type', 'submit')
          .append(
            create('span')
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
    hide,
    show,
    toggle,
  };
});
