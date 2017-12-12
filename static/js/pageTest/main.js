/* index.js */
/*eslint-env browser */
/*eslint no-console: off */
/*global define */

define(
  ['../booklog','../clientSaver'],
  (booklog, clientSaver)=>{

  return (ui)=> {
    const {
        environ,
        loadEnv,
        saveEnv,
    } = (()=>{
      const environ ={};
      const saver = clientSaver.generate();
      let saveObj = null;

      function loadEnv() {
        return saver.loadSetting('environ')
          .then((val)=>{
            saveObj = val;
            if (saveObj === null) {
              environ.userid = null;
            } else {
              environ.userid = saveObj.userid;
            }
          });

      }
      function saveEnv() {
        let val = null;
        if (saveObj === null) {
          val = {};
        } else {
          val = saveObj;
        }
        val.userid = environ.userid;
        return saver.saveSetting('environ', val);
      }

      return {
        environ,
        loadEnv,
        saveEnv,
      };
    })();

    const message = ui.message;

    ui.bhvClearButton.active();
    ui.bhvClearButton.regHandle(()=>{
      message('----');
      ui.bhvSearchButton.reset();
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
        if (val === '') {
          if (environ.userid===null) {
            envInputArea.hide();
          } else {
            envInputArea.setVal(environ.userid);
          }
          return;
        }
        if (environ.userid !== val) {
          ui.bhvSearchButton.reset();
          message(`submit input area:${val}`);
          environ.userid = val;
          saveEnv();
        }
        envInputArea.hide();
      });
      ui.bhvOpenEnvInputButton.active();
      ui.bhvOpenEnvInputButton.regHandle(()=>{
        envInputArea.toggle();
      });
    });


    loadEnv().then(()=>{
      ui.bhvSearchButton.active();

      if (ui.mobile) {
        message('Mobile Start!');
      } else {
        message('ready.');
      }
      if (environ.userid === null) {
        ui.bhvSearchButton.error(true);
        message('useridが登録されていません。');
      }
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
