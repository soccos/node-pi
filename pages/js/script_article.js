function thumbUp(id) {
  reqAPI('/a/'+id+'/thumbUp', 'POST', {})
    .done(function() {
      screenTopAlert('点赞成功。');
    })
    .fail(function(data){
      screenTopWarning(data.error);
    })
}