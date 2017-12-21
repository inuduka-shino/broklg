/* main.js */
/*eslint-env browser */
/*eslint no-console: off */
/*global define */

define(
  ['../booklog','../clientSaver', '../dbEnviron', '../dbBooklog'],
  //eslint-disable-next-line max-params
  (booklog, clientSaver, loadEnv, dbBooklog)=>{

    const saver = clientSaver.generate(),
          dbBlg = dbBooklog(saver);

  return (ui)=> {

    const message = ui.message;

    ui.bhvSearchISBN.onSubmit((val)=>{
      message(`ISBN:${val}`);
    });
    ui.loadedBooklogArea.then((booklogArea) => {
      booklogArea.bhvClearButton.active();
      booklogArea.bhvClearButton.regHandle(()=>{
        message('----');
        booklogArea.bhvSearchButton.reset();
      });
    });

    const loadedEnv = loadEnv(saver);

    Promise.all([
      ui.loadedBooklogArea,
      loadedEnv,
    ]).then((args) => {
      const booklogArea = args[0];
      const {
        environ,
        saveEnv,
      } = args[1];

      booklogArea.bhvSearchButton.active();

      if (ui.mobile) {
        message('Mobile Start!');
      } else {
        message('ready.');
      }

      if (environ.userid === null) {
        booklogArea.bhvSearchButton.error(true);
        message('useridが登録されていません。');
      }

      booklogArea.bhvSearchButton.regHandle(()=>{
        return booklog.getBookshelf(environ.userid,{
          count: environ.count,
        }).then(async (data)=>{
          message(`${data.tanaName}(${environ.userid})を取得しました。`);
          await dbBlg.saveBooks(data.books);
          message(`${data.tanaName}(${environ.userid})の本を登録しました。`);
        }).catch((err)=>{
          message(`${environ.userid}の取得に失敗しました。。`);
          throw err;
        });
      });

      booklogArea.setVal(environ);
      booklogArea.onSubmit((valObj)=>{
        let badInputFlag = false;
        [
          ['id', 'userid'],
          ['count', 'count'],
        ].forEach((info) => {
          const [iaName, envName] = info;
          if (valObj[iaName] === '') {
            if (environ[envName] === null) {
              booklogArea.hide();
            } else {
              booklogArea.setVal({
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
          booklogArea.bhvSearchButton.reset();
          saveEnv();
        }

        booklogArea.hide();
      });
      ui.bhvOpenEnvInputButton.active();
      ui.bhvOpenEnvInputButton.regHandle(()=>{
        booklogArea.toggle();
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
