module.exports = async (ctx, next) => {
  const {db, data, cookies} = ctx;
  const userInfo = cookies.get('userInfo');
  if(userInfo) {
    try{
      const {username, uid} = JSON.parse(decodeURI(userInfo));
      const user = await db.UserModel.findOne({_id: uid, username});
      if(user) {
        data.user = user;
      }
    } catch(err) {
      ctx.cookies.set('userInfo', '', {signed: true});
    }
  }
  await next();
};