/* index.js */
/*eslint-env browser */
/*eslint no-console: off */
/*global define */

define((require)=>{
  const maquette = require('maquette'),
        domUtil = require('domUtil'),
        pageMain = require('./pageMain/renderBody');

  const projector=maquette.createProjector();

  pageMain.setEnv(
    {
      scheduleRender: projector.scheduleRender,
      smartphone: domUtil.deviceType()==='mobile',
    }
  );

  domUtil.checkLoadedDocument().then(() => {
      projector.replace(
        document.body,
        pageMain.bodyRender
      );
  });
});
