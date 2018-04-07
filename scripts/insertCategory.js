const {ForumModel} = require('../dataModels');
(async () =>{
  try {
    const total = 10;
    const d = await ForumModel.findOne({}).sort({toc: -1});
    let begin;
    if(d) {
      const begin = d._id + 1;
    } else {
      begin = 1;
    }
    for(let i = begin; i < total; i++) {
      const newDocument = ForumModel({
        _id: i,
        displayName: `分类${i}`,
        abbr: `分${i}`
      });
      await newDocument.save();
      let num = ((i/total)*100).toFixed(2);
      if(num > 100) num = 100;
      console.log(`已完成：${num}%`);
    }
  } catch(err) {
    console.log(err)
  }
})();