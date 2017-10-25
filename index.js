/* static-page index.js */
/*eslint-env node */
/*eslint max-statements: ["warn", 20]*/
/*eslint no-console: off */

const path = require('path'),
      Koa = require('koa'),
      Router = require('koa-router'),
      serv = require('koa-static');

const app = new Koa();
const router = new Router();

router.get(/.*/, serv(
  path.join(__dirname, './static/'), {
    index: 'main.html',
    extensions: ['html']
  }
));

app
.use(router.routes())
.use(router.allowedMethods());

module.exports = app;
