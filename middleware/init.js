const middleware = require('../middleware');
const common = require('../common');
const db = require('../dataModels');
const settings = require('../settings');
const init = async (ctx, next) => {
  if (ctx.request.body !== undefined) {
    ctx.body = ctx.request.body
  }
  ctx.reqTime = Date.now();
  ctx.middleware = middleware;
  ctx.common = common;
  ctx.settings = settings;
  ctx.tools = {
    string: require('../tools/string'),
    imageMagick: require('../tools/imageMagick')
  };
  ctx.db = db;
  ctx.data = {url: ctx.url};
  await next();
};
module.exports = init;