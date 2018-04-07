const {DocumentModel} = require('../dataModels');
(async () =>{
  try {
    const total = 100000;
    const d = await DocumentModel.findOne({}).sort({toc: -1});
    let begin;
    if(d) {
      const begin = d._id + 1;
    } else {
      begin = 1;
    }
    for(let i = begin; i < total; i++) {
      const newDocument = DocumentModel({
        _id: i,
        aid: i*32,
        title: `这是第${i}条记录`,
        abstract: `这是第${i}篇文章的摘要。`,
        content: `这是第${i}篇文章的内容。`,
        l: 'pwbb',
        type: 'article',
        cids: i*3,
        visit: 0,
        uid: 1
      });
      await newDocument.save();
      const num = ((i/total)*100).toFixed(2);
      if(num > 100) num = 100;
      console.log(`已完成：${num}%`);
    }
  } catch(err) {
    console.log(err)
  }
})();