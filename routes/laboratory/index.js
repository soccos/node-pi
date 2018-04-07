const Router = require('koa-router');
const laboratoryRouter = new Router();
laboratoryRouter
  .get('/line', async (ctx, next) =>{
    ctx.template = 'laboratory/line/index.html';
    await next();
  });
module.exports = laboratoryRouter;