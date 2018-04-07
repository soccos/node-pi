$(function() {
  $('#file').on('change', function() {
    chooseFile();
  })
});

function chooseFile() {
  var file = $('#file')[0].files[0];
  uploadAPI('/r', file)
    .done(function() {
      window.location.reload();
    })
    .fail(function(data) {
      screenTopWarning(data.error);
    })
}

function deleteImage(id) {
  reqAPI('/r/'+id, 'DELETE', {})
    .done(function() {
      window.location.reload();
    })
    .fail(function(data) {
      screenTopWarning(data.error);
    })
}

function submit(id) {
  var title = $('#title').val();
  var cover = $('#cover').val();
  var cids = $('#cids').val();
  cids = cids.split(',');
  var abstract = $('#abstract').val();
  var content = $('#content').val();
  if([title, cover, abstract, content].indexOf('') !== -1) {
    return screenTopWarning('输入不能为空，请检查');
  }
  if(cids.length === 0) return screenTopWarning('分类未填写');
  var article = {
    title: title,
    cover: cover,
    cids: cids,
    abstract: abstract,
    content: content
  };
  var url = '/a';
  var method = 'POST';
  if(id) {
    url = '/a/'+id;
    method = 'PATCH';
  }
  reqAPI(url, method, {article: article})
    .done(function() {
      screenTopAlert('提交成功');
    })
    .fail(function(data) {
      screenTopWarning(data.error);
    })
}

function addForum() {
  var color = $('#color').val();
  var description = $('#description').val();
  var displayName = $('#displayName').val();
  if([color, description, displayName].indexOf('') !== -1) {
    return screenTopWarning('输入不能为空，请检查');
  }
  var forum = {
    color: color,
    description: description,
    displayName: displayName
  };
  reqAPI('/f', 'POST', {forum: forum})
    .done(function() {
      screenTopAlert('添加分类成功');
    })
    .fail(function(data) {
      screenTopWarning(data.error);
    })
}