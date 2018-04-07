const Router = require('koa-router');
const logoutRouter = new Router();
logoutRouter
  .get('/', async (ctx, next) => {
    const {cookies, data} = ctx;
    cookies.set('userInfo', '');
    delete data.user;
    ctx.redirect('/');
  });
module.exports = logoutRouter;