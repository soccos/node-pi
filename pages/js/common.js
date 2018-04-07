$(function() {
  init();
});

function init() {
  // 侧边栏文章目录
  var arr = $('.asideButton');
  var arr1 = $('.asideArticles');
  for(var i = 0; i < arr.length; i++) {
    arr.eq(i).mouseover(function() {
      arr1.addClass('hidden');
      arr.removeClass('bg-eee');
      for(var j = 0; j < arr1.length; j++) {
        if(parseInt($(this).attr('i')) === j) {   
          arr1.eq(j).removeClass('hidden');
          arr.eq(j).addClass('bg-eee');
        }
      }
    })
  }
}


function checkPassword(str) {
  var numberReg = /[0-9]/;
  var lowercaseReg = /[a-z]/;
  var upperCaseReg = /[A-Z]/;
  return numberReg.test(str) && lowercaseReg.test(str) && upperCaseReg.test(str);
}

function screenTopWarning(text) {
  alert(text);
}
function screenTopAlert(text) {
  alert(text);
}

function reqAPI(url, method, data){
  return $.ajax({
    url: url,
    dataType: 'json',
    method: method,
    data: data,
    headers: {
      'FROM': 'NODE-PI'
    }
  });
}

function uploadAPI(url, file) {
  var formData = new FormData();
  formData.append('file', file);
  return $.ajax({
    url: url,
    method: 'POST',
    cache: false,
    data: formData,
    headers: {
      'FROM': 'NODE-PI'
    },
    dataType: 'json',
    contentType: false,
    processData: false,
  });
}

function errorHandle(data) {
  return screenTopWarning(data.responseJSON.error);
}