const colors = require('colors');
module.exports = async (ctx, next) => {
  const {data, db} = ctx;
  //错误处理
  try {
    await next();
  } catch(err) {
    let error;
    if(err.status) {
      ctx.status = err.status;
    } else {
      ctx.status = 500;
    }
    if(typeof err === 'string') {
      error = err;
    } else {
      error = err.message;
    }
    data.error = error;
    if(process.env.NODE_ENV === 'production') {
      console.log(error.bgRed);
    } else {
      console.log(err);
    }
  }
  //返回数据
  const type = ctx.request.accepts('json', 'html');
  const from = ctx.request.get('FROM');
  ctx.type = type;
  if(data.error) {
    ctx.data.status = ctx.status;
    ctx.template = `interface_error.pug`;
  }
  //网站日志
  const log = db.LogModel({
    reqTime: ctx.reqTime,
    ip: ctx.ip,
    method: ctx.method,
    params: JSON.stringify(ctx.body),
    body: JSON.stringify(ctx.data),
    error: JSON.stringify(data.error || '')
  });
  await log.save();
  if(type === 'json' && from === 'NODE-PI') {
    ctx.body = ctx.data;
  } else {
    if(!ctx.template) {
      ctx.status = 404;
      ctx.data.status = ctx.status;
      ctx.template = `interface_error.pug`;
      ctx.data.error = '未找到资源'
    }
    try{
      ctx.body = ctx.common.rander(ctx.template, ctx.data);
    } catch(randerError) {
      console.log(randerError);
      ctx.status = 500;
      ctx.data.error = randerError;
      ctx.body = ctx.common.rander('interface_error.pug', ctx.data);
    }
  }
};