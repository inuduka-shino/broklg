/*eslint-env browser */
/*eslint no-console: off */
/*global define */

define((require) => {
  const {
          create,
          head,
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
  //eslint-disable-next-line no-unused-vars
  function clickHandleFetch() {
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
  function callJsonp(url,params) {
    const callbackName = params.callback;
    const paramStr = Object.entries(params).map((keyval)=>{
      return keyval.join('=');
    }).join('&');

    const $script = create('script');
    $script
      .setAttr('type', 'text/javascript')
      .setAttr('src', [url, paramStr].join('?'));
    const prms = new Promise((resolve, reject)=>{
      window[callbackName] = (data)=>{
        resolve(data);
        $script.remove();
        // delete window[callbackName];
      };
      try {
        head().append($script);
      } catch (err) {
        reject(err);
      }
    });
    return prms;
  }
  function clickHandle() {
    message('click button');
    const prms = callJsonp(
      'https://api.booklog.jp/json/xxxxxx',
      {
        category: '0',
        count: 15,
        callback: 'callback',
      }
    );
    return prms.then((data)=>{
      message(`${data.tana.name}を取得しました。`);
    }).catch((err)=>{
      message('jsonp call ERROR!');
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
