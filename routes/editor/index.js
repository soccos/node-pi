const Router = require('koa-router');
const editorRouter = new Router();
editorRouter
  .get('/', async (ctx, next) => {
    const {data, db, query} = ctx;
    data.forums = await db.ForumModel.find({}).sort({toc: 1});
    ctx.template = 'interface_editor.pug';
    await next();
  });
module.exports = editorRouter;