const Router = require('koa-router');
const thumbUpRouter = require('./thumbUp');
const articleRouter = new Router();
articleRouter
  .get('/:_id', async (ctx, next) => {
    const {data, db, params} = ctx;
    const {_id} = params;
    const article = await db.DocumentModel.findOne({_id});
    if(article.disabled) ctx.throw(404, '文章已被封禁');
    await article.extendForums();
    data.article = article;
    ctx.template = 'interface_article.pug';
    data.asideArticles = await db.DocumentModel.getAsideArticles();
    article.visit += 1;
    await article.save();
    await next();
  })
  .post('/', async (ctx, next) => {
    const {body, data, db} = ctx;
    const {user} = data;
    if(!user) {
      ctx.throw(403, '权限不足');
    }
    const lastArticle = await db.DocumentModel.findOne({}).sort({toc: -1});
    let _id;
    if(lastArticle) {
      _id = lastArticle._id + 1;
    } else {
      _id = 1;
    }
    const {article} = body;
    article._id = _id;
    const {cids} = article;
    const arr = [];
    for(let _id of cids) {
      const forum = await db.ForumModel.findOne({_id});
      if(forum) {
        arr.push(_id);
        forum.count += 1;
        await forum.save();
      }
    }
    article.cids = arr;
    const newArticle = db.DocumentModel(article);
    await newArticle.save();
    await next();
  })
  .use('/:_id/thumbUp', thumbUpRouter.routes(), thumbUpRouter.allowedMethods());
module.exports = articleRouter;