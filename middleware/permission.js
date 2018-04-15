const operations = require('../settings/operations');
const fn = {};

fn.getOperationByPath = (path, method) => {
  path = path.replace(/\?.*/, '');
  let pathArr = path.split('/');
  pathArr.shift();
  let operation;
  let operationObj = Object.assign({}, operations);
  if(pathArr[0] === '') return 'viewHome';
  for(let path of pathArr) {
    const obj = operationObj[path];
    if(obj) {
      operationObj = obj;
      if(obj[method]) {
        operation = obj[method].operation;
      }
    } else {
      const parameter = operationObj['parameter'];
      if(parameter) {
        operationObj = parameter;
        if(parameter[method]) {
          operation = parameter[method].operation;
        }
      } else {
        operation = undefined;
        break;
      }
    }
  }
  return operation;
};

fn.ensurePermission = async (ctx, next) => {
  const {url, db, data, method} = ctx;
  const operation = fn.getOperationByPath(url, method);
  if(!operation) {
    throwErr(404, 'not found');
  }
  data.operation = operation;
  ctx.getOperationByPath = fn.getOperationByPath;
  const userOperations = {};
  if(!data.user) {
    const rote = await db.RoleModel.findOne({name: 'visitor'});
    if(!rote) throwErr(500, 'the role of visitor does not exist');
    await Promise.all(rote.operations.map(async _id => {
      const operation = await db.OperationModel.findOne({_id});
      if(operation){
        userOperations[operation.name] = operation;
      }
    }))
  } else {
    if(data.user.roles.length === 0) {
      data.user.roles.push(5);
    }
    await Promise.all(data.user.roles.map(async _id => {
      const operation = await db.OperationModel.findOne({_id});
      if(operation && !userOperations[operation.name]) {
        userOperations[operation.name] = operation;
      }
    }));
  }
  ctx.userOperations = userOperations;
  if(!ctx.userOperations[data.operation]) {
    throwErr(403, `${data.operation}: inadequate permissions`);
  }
  await next();
};

module.exports = fn.ensurePermission;
