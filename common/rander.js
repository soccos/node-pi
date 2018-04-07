const pug = require('pug');
const path = require('path');
const moment = require('moment');
const MD = require('markdown').markdown;
moment.locale('zh-cn');
const fromNow = (data) => {
  return moment(data).fromNow();
};
const markdown = (md) => {
  return MD.toHTML(md);
};
const render = (template, data) => {
  const options = {
    data,
    catch: true,
    fromNow,
    markdown
  };
  return pug.renderFile(path.resolve(__dirname, `../pages/${template}`), options);
};

module.exports = render;