const Router = require('koa-router');
const managementRouter = new Router();
const addRouter = require('./add');
managementRouter
  .use('/', async (ctx, next) => {
    const {data} = ctx;
    if(!data.user) {
      if(ctx.request.get('FROM') !== 'reqAPI') {
        ctx.template = 'interface_management.pug';
      } else {
        ctx.throw(403, '权限不足');
      }
    }
    await next();
  })
  .get('/', async (ctx, next) => {
    const {data, db} = ctx;
    ctx.template = 'interface_management.pug';

    await next();
  })
  .post('/', async (ctx, next) => {
    const {body, data, db} = ctx;
    let {usernameAndPassword=''} = body;
    usernameAndPassword = usernameAndPassword.toString();
    const account = usernameAndPassword.split(':');
    const [username, password] = account;
    if(account.length !== 2) ctx.throw(400, '格式不正确');
    const user = await db.UserModel.findOne({username, password});
    if(!user) ctx.throw(404, '用户不存在');
    data.user = user;
    const obj = {
      username: username,
      uid: user._id
    };
    ctx.cookies.set('userInfo', JSON.stringify(obj), {signed: true});
    ctx.template = 'interface_management.pug';
    await next();
  })
  .use('/add', addRouter.routes(), addRouter.allowedMethods());
module.exports = managementRouter;