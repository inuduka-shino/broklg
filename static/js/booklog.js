/* booklog.js */
/*eslint-env browser */
/*eslint no-console: off */
/*global define */

define((require)=>{
  const
        {
          callJsonp,
        } = require('jsonp');


  function getBookshelf(user, param0={}) {
    const param = Object.assign(
          {
            category: 0,
            rank: 0,
            status: 0,
            //status の意味
            /*
              status=0 「すべて」
              status=1 「読みたい」
              status=2 「いま読んでる」
              status=3 「読み終わった」
              status=4 「積読」
            */
            count: 0,
            callback: 'bkcb',
          },
          param0
        );
    ['category','rank','status'].forEach((propName)=>{
      if (param[propName] === 0) {
        Reflect.deleteProperty(param, propName);
      }
    });
    return callJsonp(
      [
        'https://api.booklog.jp/json',
        user,
      ].join('/'),
      param
    );
  }
  return {
    getBookshelf,
  };
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
