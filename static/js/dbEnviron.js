/* saveEnviron.js */
/*eslint-env browser */
/*eslint no-console: off */
/*global define */

define([], () => {

    function saveEnv(saver, savedObj0, environ) {
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

    function loadEnv(saver) {

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
              saveEnv: saveEnv.bind(null, saver, savedObj, environ),
            };
          });
    }

    return loadEnv;
  }
);
