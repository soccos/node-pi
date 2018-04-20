const Router = require('koa-router');
const router = new Router();
router
  .get('/', async (ctx, next) => {
    ctx.template = 'interface_register.pug';
    await next();
  })
  .post('/', async (ctx, next) => {
    const sendEmail = ctx.nodeModules.sendEmail;
    await sendEmail({
      to: 'p_xigui@163.com',
      subject: '注册账号',
      html: `<h2>test</h2>`
    });
    await next();
  });
module.exports = router;