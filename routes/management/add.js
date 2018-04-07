const Router = require('koa-router');
const addRouter = new Router();
addRouter
  .get('/', async (ctx, next) => {
    const {data, db} = ctx;
    data.resources = await db.ResourceModel.find({}).sort({_id: -1});
    ctx.template = 'interface_add.pug';
    data.forums = await db.ForumModel.find({}).sort({toc: 1});
    await next();
  });
module.exports = addRouter;