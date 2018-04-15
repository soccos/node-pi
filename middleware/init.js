const common = require('../nodeModules');
const db = require('../dataModels');
const settings = require('../settings');
const init = async (ctx, next) => {
  if (ctx.request.body !== undefined) {
    ctx.body = ctx.request.body
  }
  ctx.reqTime = Date.now();
  ctx.common = common;
  ctx.settings = settings;
  ctx.tools = {
    string: require('../tools/string'),
    imageMagick: require('../tools/imageMagick')
  };
  ctx.middleware = {
    logger: require('./logger')
  };
  ctx.db = db;
  ctx.data = {url: ctx.url};
  await next();
};
module.exports = init;