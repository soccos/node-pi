const Router = require('koa-router');
const forumRouter = new Router();
forumRouter
  .get('/:_id', async (ctx, next) => {
    const {data, db, params, query} = ctx;
    const {_id} = params;
    data.forum = await db.ForumModel.findOne({_id});
    data.forums = await db.ForumModel.find({}).sort({toc: 1});
    const page = query.page? parseInt(query.page): 0;
    const count = await db.DocumentModel.count({cids: _id, disabled: false});
    const paging = ctx.nodeModules.paging(page, count);
    data.paging = paging;
    const articles = await db.DocumentModel.find({cids: _id, disabled: false}).sort({toc: -1}).skip(paging.start).limit(paging.perPage);
    data.articles = await Promise.all(articles.map(async article => {
      await article.extendForums();
      return article;
    }));
    data.asideArticles = await db.DocumentModel.getAsideArticles();
    ctx.template = 'interface_forum.pug';
    await next();
  })
  .post('/', async (ctx, next) => {
    const {data, db, body} = ctx;
    const {user} = data;
    if(!user) ctx.throw(403, '权限不足');
    const lastForum = await db.ForumModel.findOne({}).sort({toc: -1});
    let _id = 1;
    if(lastForum) {
      _id = lastForum._id + 1;
    }
    const {forum} = body;
    forum._id = _id;
    const newForum = db.ForumModel(forum);
    await newForum.save();
    await next();
  });
module.exports = forumRouter;