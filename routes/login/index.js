const Router = require('koa-router');
const router = new Router();
router
  .get('/', async (ctx, next) => {
    ctx.template = 'interface_login.pug';
    await next();
  })
  .post('/', async (ctx, next) => {
    await next();
  });
module.exports = router;