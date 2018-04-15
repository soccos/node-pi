const {articlePerPage} = require('../settings/page');
module.exports = (page, count) => {
  const perPage = articlePerPage;
  return {
    page,
    count,
    perPage,
    pageCount: Math.ceil(count/perPage),
    start: page*perPage,
  }
};