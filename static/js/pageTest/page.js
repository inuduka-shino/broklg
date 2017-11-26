/*eslint-env browser */
/*eslint no-console: off */
/*global define */

define((require) => {
  const {
          create,
        } = require('domUtil');

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
        pColButton = col(pButton,'xs-1'),
        pAreaPlay = row(pColButton);


  function message(msg) {
    pMessage.text(msg);
  }
  function clickHandle() {
    message('click button');
    return fetch('https://api.booklog.jp/json/xxxxxxxx',{
      mode: 'cors',
    }).then((response)=>{
      return response.text();
    }).then((text)=>{
      console.log(text);
      message(text);
    }).catch((err)=>{
      console.log(err);
      throw err;
    });
  }
  function immediate() {
    return [
      pTitle,
      pAreaMsg,
      pAreaPlay,
    ];
  }
  function delay(info) {
    console.log('ready.');
    message('ready.');
    if (info.mobile) {
      message('Mobile !');
    }

    let stat = 'init';
    pButton.on('click',() =>{
      if (stat !== 'init') {
        return;
      }
      stat = 'push';
      pButton.text('working...');
      clickHandle().catch(()=>{
        return true;
      }).then(()=>{
        stat = 'init';
        pButton.text('start');
      });
    });
  }
  return {
    immediate,
    delay,
  };
});
