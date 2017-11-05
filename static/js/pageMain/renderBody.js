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
        [
          h('h2', 'broklg'),
          h('div', 'barcode on SPA.:'),
          h('div', {id:'message'}, ''),
          h('div', {id:'barcode'}, ''),
        ]
      );
    }

    return {
      setEnv,
      render,
    };
  })();
});
