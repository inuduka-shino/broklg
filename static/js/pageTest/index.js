/* index.js */
/*eslint-env browser */
/*eslint no-console: off */
/*global define */

define((require)=>{
  const
        booklog = require('../booklog'),
        {
          generate: genSaver,
        } = require('../clientSaver'),
        page = require('./page');
  const saver = genSaver();
  //saver.saveSetting('environ', {
  //  userid: 'xxxxxxxx',
  //});

  const envPrms = saver.loadSetting('environ').then((env)=>{
    return {
      userid: env.userid,
    };
  });
  const pagePrms = new Promise((resolve, reject)=>{
    page.start((ui)=>{
      try {
        resolve(ui);
      } catch (err) {
        reject(err);
      }
    });
  });

  Promise.all([envPrms, pagePrms])
    .then(([env, ui])=>{
      const message = ui.message;
      if (ui.mobile) {
        message('Mobile Start!');
      } else {
        message('ready.');
      }
      ui.onClickButtonA(()=>{
        return booklog.getBookshelf(env.userid).then((data)=>{
          message(`${data.tana.name}を取得しました。`);
        }).catch((err)=>{
          message('jsonp call ERROR!');
          throw err;
        });
      });
      ui.onClickButtonClear(()=>{
        message('----');
      });
      ui.onInputEnvButton(()=>{
        message('click inputEvent button');
      });
      ui.onSubmitEnvInputArea((val)=>{
        message(`submit input area:${val}`);
        env.userid = val;
      });
    });
});

/*
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

});
*/
/*
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
*/
