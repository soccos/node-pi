require('./settings/global.js');
const Koa = require('koa');
const app = new Koa();
const favicon = require('koa-favicon');
const koaBody = require('koa-body');
const {upload} = require('./settings');
const mainRouter = require('./routes');
const {init, body, log, cookie} = require('./middleware');
const colors = require('colors');
const {mongodb} = require('./settings');
const {key} = require('./settings/cookie');

const staticServe = path => {
  return require('koa-static')(path, {
    setHeaders: function(response, path, stats) {
      response.setHeader('Cache-Control', `public, ${process.env.NODE_ENV==='production'?'max-age=604800': 'no-cache'}`)
    }
  });
};

app.on('error', (err) =>{
  if(!['write ECONNABORTED', 'read ECONNRESET'].includes(err.message)) {
    console.log(err);
  }
});
try{
  app.keys = [key];
  app.use(koaBody(upload.koaBodySetting));
  app.use(staticServe('./pages'));
  app.use(staticServe('./resources'));
  app.use(staticServe('./node_modules'));
  app.use(favicon(__dirname + '/resources/default/favicon.ico'));
  app.use(log);
  app.use(init);
  app.use(cookie);
  app.use(mainRouter.routes());
  app.use(body);  
  app.listen('6543');
  console.log(`server is running at 6543...`.green);
} catch(err) {
  console.log(`启动失败`.red);
  console.log(err)
}
