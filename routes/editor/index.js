const Router = require('koa-router');
const editorRouter = new Router();
editorRouter
  .get('/', async (ctx, next) => {
    const {data, db, query} = ctx;
    data.forums = await db.ForumModel.find({}).sort({toc: 1});
    const {type, id} = query;
    if(type === 'modifyArticle') {
      data.article = await db.DocumentModel.findOne({_id: id});
    }
    ctx.template = 'interface_editor.pug';
    await next();
  });
module.exports = editorRouter;