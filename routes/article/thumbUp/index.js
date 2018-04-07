const Router = require('koa-router');
const thumbUpRouter = new Router();
thumbUpRouter
  .post('/', async (ctx, next) => {
    const {db, params} = ctx;
    const {_id} = params;
    const article = await db.DocumentModel.findOne({_id});
    article.thumbUp += 1;
    await article.save();
    await next();
  });
module.exports = thumbUpRouter;
