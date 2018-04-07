const log = async (ctx, next) => {
  await next();
  const resTime = Date.now() - ctx.reqTime;
  const {method, status, data} = ctx;
  let url = ctx.url;
  url = url.replace(/\?.*/, '');
  if(status === 200) {
    console.log(`${new Date().toLocaleString()}` + ' ' + ` ${status} `.bgGreen + ' ' + (data.user? data.user._id: 'visitor') + ' ' + ` ${method} `.bgBlue + ' ' + ` ${url} `.bgGreen + ' ' + ` ${resTime}ms `)
  } else if(status === 500) {
    console.log(`${new Date().toLocaleString()}` + ' ' + ` ${status} `.bgRed + ' ' + (data.user? data.user._id: 'visitor') + ' ' + ` ${method} `.bgBlue + ' ' + ` ${url} `.bgGreen + ' ' + ` ${resTime}ms `)
  } else {
    console.log(`${new Date().toLocaleString()}` + ' ' + ` ${status} `.bgRed + ' ' + (data.user? data.user._id: 'visitor') + ' ' + ` ${method} `.bgBlue + ' ' + ` ${url} `.bgGreen + ' ' + ` ${resTime}ms `)
  }
};
module.exports = log;