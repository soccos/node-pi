var markdown = window.markdownit();
update();
$('#title, #abstract, #content').on('input', function() {
  update();
});

function mdToHtml(md) {
  return markdown.render(md);
}
function update() {
  var title = $('#title').val();
  if(title === '') title = '未输入标题';
  var abstract = $('#abstract').val();
  if(abstract === '') abstract = '未输入摘要';
  var content = $('#content').val();
  if(content === '') content = '未输入内容';
  $('#title_').text(title);
  $('#abstract_').text(abstract);
  $('#content_').html(mdToHtml(content));
}
