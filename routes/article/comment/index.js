const Router = require('koa-router');
const commentRouter = new Router();
commentRouter
  .post('/', async (ctx, next) => {
    await next();
  });
module.exports = commentRouter;
