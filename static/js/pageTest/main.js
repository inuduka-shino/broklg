/* index.js */
/*eslint-env browser */
/*eslint no-console: off */
/*global define */

define(
  ['../booklog','../clientSaver'],
  (booklog, clientSaver)=>{

    const saver = clientSaver.generate();

    function saveBooklogs(bookList) {
      return Promise.all(
        bookList.map((bookinfo)=>{
          return saver.saveBooklog(bookinfo.id, bookinfo);
        })
      );
    }

    function saveEnv(savedObj0, environ) {
      let savedObj = {};
      if (savedObj0 !== null) {
        savedObj = savedObj0;
      }
      if (environ.userid === null) {
        return Promise.resolove();
      }
      savedObj.userid = environ.userid;
      savedObj.couont = environ.count;
      return saver.saveSetting('environ', savedObj);
    }
    function loadEnv() {
      return saver.loadSetting('environ')
          .then((savedObj)=>{
            let environ = null;
            if (savedObj === null) {
              environ ={
                userid: null,
                count: null,
              };
            } else {
              environ = {
                userid: savedObj.userid,
                count: savedObj.couont,
              };
            }
            return {
              environ,
              saveEnv: saveEnv.bind(null, savedObj, environ),
            };
          });
    }

  return (ui)=> {

    const message = ui.message;

    ui.bhvClearButton.active();
    ui.bhvClearButton.regHandle(()=>{
      message('----');
      ui.bhvSearchButton.reset();
    });

    const loadedEnv = loadEnv();

    loadedEnv.then(({
        environ,
      })=>{
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

      ui.bhvSearchButton.regHandle(()=>{
        return booklog.getBookshelf(environ.userid,{
          count: environ.count,
        }).then(async (data)=>{
          message(`${data.tanaName}(${environ.userid})を取得しました。`);
          await saveBooklogs(data.books);
          message(`${data.tanaName}(${environ.userid})の本を登録しました。`);
        }).catch((err)=>{
          message(`${environ.userid}の取得に失敗しました。。`);
          throw err;
        });
      });

    });

    Promise.all([
      ui.loadedInputEnv,
      loadedEnv,
    ]).then((args) => {
      const envInputArea = args[0];
      const {
        environ,
        saveEnv,
      } = args[1];
      envInputArea.setVal(environ);
      envInputArea.onSubmit((valObj)=>{
        let badInputFlag = false;
        [
          ['id', 'userid'],
          ['count', 'count'],
        ].forEach((info) => {
          const [iaName, envName] = info;
          if (valObj[iaName] === '') {
            if (environ[envName] === null) {
              envInputArea.hide();
            } else {
              envInputArea.setVal({
                [iaName]: environ[envName],
              });
            }
            badInputFlag = true;
            return false;
          }
          return true;
        });
        if (badInputFlag) {
          return;
        }
        let saveFlag = false;
        if (environ.userid !== valObj.id) {
          environ.userid = valObj.id;
          saveFlag = true;
        }
        if (environ.count !== valObj.count) {
          environ.count = valObj.count;
          saveFlag = true;
        }
        if (saveFlag) {
          ui.bhvSearchButton.reset();
          saveEnv();
        }

        envInputArea.hide();
      });
      ui.bhvOpenEnvInputButton.active();
      ui.bhvOpenEnvInputButton.regHandle(()=>{
        envInputArea.toggle();
      });
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
