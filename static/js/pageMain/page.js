/*eslint-env browser */
/*eslint no-console: off */
/*global define */

define((require) => {
  const domUtil = require('domUtil');
  const br = domUtil.create.bind(null, 'br');
  const div = domUtil.create('div').append;
  const p = domUtil.create('p',{text:true}).text;
  return {
    doms: ()=>{
      return [
        'test test',
        br(),
        'elment to created dvy omUtil',
        br(),
        div(['aaa',br(),'bbb']),
        p('ppppp'),
      ];
    },
    handle: () => {
      return null;
    },
  };
});
