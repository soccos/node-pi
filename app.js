//-- global function --
require('./settings/global');

//-- change the color of the console --
require('colors');

const {mongodbUrl, key} = require('./settings/secret');
const mongoose = require('mongoose');
(async () => {
  try {

    //-- connect database --
    await mongoose.connect(mongodbUrl);
    console.log(`connected database`.green);

    //-- initServerSettings --
    const settings = await initServerSettings();

    //-- initPermissions --
    await initPermission();

    //-- initRoles --
    await initRoles();

    //-- staticServe --
    const staticServe = (path) => {
      let cacheControl;
      if(NODE_ENV === 'production') {
        cacheControl = `public, max-age=${settings.cache.staticServe}`;
      } else {
        cacheControl = `public, no-cache`;
      }
      return require('koa-static')(path, {
        setHeaders: function(response, path, stats) {
          response.setHeader('Cache-Control', cacheControl);
        }
      });
    };

    //-- createServer --
    const favicon = require('koa-favicon');
    const koaBody = require('koa-body');
    const Koa = require('koa');
    const app = new Koa();

    //-- cookie key --
    app.keys = [settings.cookie.key];
    const {multipart, uploadDir, maxFields, hash, keepExtensions} = settings.upload;

    //-- upload, query, body --
    app.use(koaBody({
      multipart,
      formidable: {
        maxFields,
        uploadDir,
        hash,
        keepExtensions
      }
    }));

    //-- staticServe --
    app.use(staticServe('./pages'));
    app.use(staticServe('./common'));
    app.use(staticServe('./node_modules'));

    //-- favicon --
    app.use(favicon(__dirname + '/resources/default/favicon.ico'));

    const middleware = require('./middleware');

    //-- cookie --
    app.use(middleware.cookie);

    //-- init data --
    app.use(middleware.init);

    //-- render data, handle error --
    app.use(middleware.body);

    //-- permission --
    app.use(middleware.permission);

    //-- routes --
    const router = require('./routes');
    app.use(router.routes());

    app.listen(settings.server.port);

    console.log(`server is running at ${settings.server.port}`.green);

  } catch (err) {

    console.log(err);
    console.log(` an error occurred while starting server `.bgRed);

  }
})();

/*//-- initPermissions --
async function initPermission() {
  const OperationModel = require('./dataModels/OperationModel');
  const operations = await OperationModel.find({});
  const defaultOperations = require('./default/defaultOperations');
  if(operations.length === 0) {
    console.log(`init operations...`);
    await Promise.all(defaultOperations.map(async p => {
      const operation = OperationModel(p);
      await operation.save();
    }));
    console.log(`done.`);
  }
}*/
async function initPermission() {
  const OperationModel = require('./dataModels/OperationModel');
  const SettingModel = require('./dataModels/SettingModel');
  const operations = require('./settings/operations');
  const operationsOfDB = await OperationModel.find({});
  if(operationsOfDB.length === 0) {
    console.log(`init operations...`);
    const arr = [];
    const getOperation = (obj) => {
      if(obj.operation) {
        arr.push(obj.operation);
      }
      for(let o in obj) {
        if(typeof(obj[o]) === 'object') {
          getOperation(obj[o]);
        }
      }
    };
    getOperation(operations);
    for(let name of arr) {
      const _id = await SettingModel.getNewId('operation', 1);
      const newOperation = OperationModel({
        _id,
        name,
        description: name
      });
      await newOperation.save();
    }
    console.log(`done.`);
  }
}

//-- initRoles --
async function initRoles() {
  const RoleModel = require('./dataModels/RoleModel');
  const roles = await RoleModel.find({});
  const defaultRoles = require('./default/defaultRoles');
  if(roles.length === 0) {
    console.log(`init roles...`);
    await Promise.all(defaultRoles.map(async p => {
      const role = RoleModel(p);
      await role.save();
    }));
    console.log(`done.`);
  }
}

//-- initServerSettings --
async function initServerSettings() {
  const SettingModel = require('./dataModels/SettingModel');
  const defaultSettings = require('./default/defaultSettings');
  const settingsOfDB = await SettingModel.find({});
  const settings = {};
  if(defaultSettings.length === settingsOfDB.length) {
    for(let s of settingsOfDB) {
      settings[s.type] = s;
    }
  } else if(settingsOfDB.length === 0){
    console.log(`init settings...`);
    await Promise.all(defaultSettings.map(async s => {
      settings[s.type] = s;
      const setting = SettingModel(s);
      await setting.save();
    }));
    console.log(`done.`);
  } else {
    throwErr(500, 'settings error');
  }
  return settings;
}


