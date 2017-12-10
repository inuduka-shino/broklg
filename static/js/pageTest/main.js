/* index.js */
/*eslint-env browser */
/*eslint no-console: off */
/*global define */

define((require)=>{
  const
        booklog = require('../booklog'),
        {
          generate: genSaver,
        } = require('../clientSaver');
  const saver = genSaver();
  //saver.saveSetting('environ', {
  //  userid: 'xxxxxxxx',
  //});
  return (ui)=> {
    const environ = {};
    const message = ui.message;

    ui.bhvClearButton.active();
    ui.bhvClearButton.regHandle(()=>{
      message('----');
    });

    ui.bhvSearchButton.regHandle(()=>{
      return booklog.getBookshelf(environ.userid).then((data)=>{
        message(`${data.tana.name}(${environ.userid})を取得しました。`);
      }).catch((err)=>{
        message(`${environ.userid}の取得に失敗しました。。`);
        throw err;
      });
    });

    ui.loadedInputEnv.then((envInputArea)=>{
      envInputArea.onSubmit((val)=>{
        envInputArea.hide();
        message(`submit input area:${val}`);
        environ.userid = val;
      });
      ui.bhvOpenEnvInputButton.active();
      ui.bhvOpenEnvInputButton.regHandle(()=>{
        envInputArea.toggle();
      });
    });

  const envPrms = saver.loadSetting('environ').then((env)=>{
      environ.userid = env.userid;
    }).catch(()=>{
      environ.userid = 'xxxxxx';
    });

    envPrms.then(()=>{
      if (ui.mobile) {
        message('Mobile Start!');
      } else {
        message('ready.');
      }

      ui.bhvSearchButton.active();
    });
  };

});

      /*
      ui.onInputEnvButton(()=>{
        message('click inputEvent button');
      });
      */
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
