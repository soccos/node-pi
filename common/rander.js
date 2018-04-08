const pug = require('pug');
const hljs = require('highlight.js');
const path = require('path');
const moment = require('moment');
const MD = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>';
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + MD.utils.escapeHtml(str) + '</code></pre>';
  }
});
moment.locale('zh-cn');
const fromNow = (data) => {
  return moment(data).fromNow();
};
const markdown = (md) => {
  return MD.render(md, 'js');
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