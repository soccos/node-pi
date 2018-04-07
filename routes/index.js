const Router = require('koa-router');
const mainRouter = new Router();
const articleRouter = require('./article');
const laboratoryRouter = require('./laboratory');
const managementRouter = require('./management');
const resourceRouter = require('./resource');
const logoutRouter = require('./logout');
const forumRouter = require('./forum');
mainRouter
  .use('/', async (ctx, next) => {
    const {data, db} = ctx;
    await next();
  })
  .get('/', async (ctx, next) => {
    const {data, db, query} = ctx;
    const page = query.page? parseInt(query.page): 0;
    const count = await db.DocumentModel.count({disabled: false});
    const paging = ctx.common.paging(page, count);
    data.paging = paging;
    const articles = await db.DocumentModel.find({disabled: false}).sort({toc: -1}).skip(paging.start).limit(paging.perPage);
    data.articles = await Promise.all(articles.map(async article => {
      await article.extendForums();
      return article;
    }));
    data.asideArticles = await db.DocumentModel.getAsideArticles();
    data.forums = await db.ForumModel.find().sort({toc: 1});
    ctx.template = 'interface_home.pug';
    await next();
  })
  .use('/l', laboratoryRouter.routes(), laboratoryRouter.allowedMethods())
  .use('/m', managementRouter.routes(), managementRouter.allowedMethods())
  .use('/f', forumRouter.routes(), forumRouter.allowedMethods())
  .use('/logout', logoutRouter.routes(), logoutRouter.allowedMethods())
  .use('/r', resourceRouter.routes(), resourceRouter.allowedMethods())
  .use('/a', articleRouter.routes(), articleRouter.allowedMethods());
module.exports = mainRouter;

