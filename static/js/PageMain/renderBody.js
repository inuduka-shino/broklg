/* regClient renderBody.js */
/*eslint-env browser */
/*eslint no-console: off */
/*global define */

//eslint-disable-next-line max-statements
define((require)=>{
  const maquette = require('maquette');
  //let scheduleRender = null;
  const h = maquette.h;

  return (()=>{
    const bodyClasses = {
      smartphone: false,
    };
    function setEnv(envObj) {
      bodyClasses.smartphone = envObj.smartphone;
      //scheduleRender = envObj.scheduleRender;
    }

    function render() {
      return h('body',
        {
          classes: bodyClasses,
        },
        []
      );
    }

    return {
      setEnv,
      render,
    };
  })();
});
