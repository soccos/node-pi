const Router = require('koa-router');
const path = require('path');
const resourceRouter = new Router();
resourceRouter
  .post('/', async (ctx, next) => {
    const {data, db, body} = ctx;
    const {user} = data;
    if(!user) ctx.throw(403, '权限不足');
    const {file} = body.files;
    const {size, name, path} = file;
    const {removeImage, articleCoverify, articleImageify, ensurePath} = ctx.tools.imageMagick;
    const {targetPath, coverPath, datePath} = await ensurePath();
    const r = await db.ResourceModel.findOne({}).sort({_id: -1});
    let _id;
    if(r) {
      _id = r._id + 1;
    } else {
      _id = 1;
    }
    await articleImageify(path, `${targetPath}/${_id}.jpg`);
    await articleCoverify(path, `${coverPath}/${_id}.jpg`);
    await removeImage(path);
    const newResource = db.ResourceModel({
      _id,
      name,
      path: datePath,
      size
    });
    await newResource.save();
    await next();
  })
  .del('/:_id', async(ctx, next) => {
    const {params, data, db} = ctx;
    const {user} = data;
    if(!user) ctx.throw(403, '权限不足');
    const {_id} = params;
    const resource = await db.ResourceModel.findOne({_id});
    if(!resource) ctx.throw(404, '图片未找到');
    const {removeImage} = ctx.tools.imageMagick;
    const targetPath = path.resolve(`resources/upload${resource.path}/${_id}.jpg`);
    const coverPath = path.resolve(`resources/upload${resource.path}/cover/${_id}.jpg`);
    await removeImage(targetPath);
    await removeImage(coverPath);
    await resource.remove();
    await next();
  });
module.exports = resourceRouter;