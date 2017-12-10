/* static-page index.js */
/*eslint-env node */
/*eslint max-statements: ["warn", 20]*/
/*eslint no-console: off */

const path = require('path'),
      Koa = require('koa'),
      Router = require('koa-router'),
      serv = require('koa-static-server');

const app = new Koa();
const router = new Router();

router.get('/lib/quagga/*', serv({
  rootDir: path.join(__dirname, 'node_modules/quagga/dist/'),
  rootPath: '/lib/quagga',
}));
router.get('/lib/isbnjs/*', serv({
  rootDir: path.join(__dirname, 'node_modules/isbnjs/'),
  rootPath: '/lib/isbnjs',
}));

router.get('', serv({
  rootDir: path.join(__dirname, 'static/'),
  rootPath: '/',
  index: 'index.html',
}));
router.get(/.*/, serv({
  rootDir: path.join(__dirname, 'static/'),
  rootPath: '/',
  index: 'index.html',
}));

app
.use(router.routes())
.use(router.allowedMethods());

module.exports = app;
