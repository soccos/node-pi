const Router = require('koa-router');
const addRouter = new Router();
addRouter
  .get('/', async (ctx, next) => {
    const {data, db, query} = ctx;
    const {a} = query;
    if(a) {
    	data.article = await db.DocumentModel.findOne({_id: parseInt(a)});	
    }
    data.resources = await db.ResourceModel.find({}).sort({_id: -1});
    ctx.template = 'interface_add.pug';
    data.forums = await db.ForumModel.find({}).sort({toc: 1});
    await next();
  });
module.exports = addRouter;