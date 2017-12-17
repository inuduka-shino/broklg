/* dbBooklog.js */
/*eslint-env browser */
/*eslint no-console: off */
/*global define */

define([], () => {

  let saver = null;

  function saveBooks(bookList) {
    return Promise.all(
      bookList.map((bookinfo)=>{
        return saver.saveBooklog(bookinfo.asin, bookinfo);
      })
    );
  }
  function getBookInfo(asin) {
    return saver.loadBooklog(asin);
  }

  return function (saver0) {
    saver = saver0;
    return {
      saveBooks,
      getBookInfo,
    };
  };

});
