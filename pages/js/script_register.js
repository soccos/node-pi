function submit() {
  var obj = {
    email: $('#email').val(),
    password: $('#password').val()
  };
  if(obj.email === '') {
    return screenTopWarning('请输入邮箱地址');
  }
  var reg = /[0-9a-zA-Z]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]+/;
  if(!reg.test(obj.email)) {
    return screenTopWarning('请输入合法的邮箱地址')
  }
  if(!obj.password) {
    return screenTopWarning('请输入密码');
  }
  if(obj.password.length < 8) {
    return screenTopWarning('密码长度不能少于8位');
  }
  if(!checkPassword(obj.password)) {
    return screenTopWarning('密码必须含有数字、小写字母和大写字母');
  }
  reqAPI('/register', 'POST', obj)
    .done(function() {
      window.location.href = '/register?email='+obj.email;
    })
    .fail(function(data) {
      return errorHandle(data);
    })
}

var hash = {
  'qq.com': 'http://mail.qq.com',
  'gmail.com': 'http://mail.google.com',
  'sina.com': 'http://mail.sina.com.cn',
  '163.com': 'http://mail.163.com',
  '126.com': 'http://mail.126.com',
  'yeah.net': 'http://www.yeah.net/',
  'sohu.com': 'http://mail.sohu.com/',
  'tom.com': 'http://mail.tom.com/',
  'sogou.com': 'http://mail.sogou.com/',
  '139.com': 'http://mail.10086.cn/',
  'hotmail.com': 'http://www.hotmail.com',
  'live.com': 'http://login.live.com/',
  'live.cn': 'http://login.live.cn/',
  'live.com.cn': 'http://login.live.com.cn',
  '189.com': 'http://webmail16.189.cn/webmail/',
  'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
  'yahoo.cn': 'http://mail.cn.yahoo.com/',
  'eyou.com': 'http://www.eyou.com/',
  '21cn.com': 'http://mail.21cn.com/',
  '188.com': 'http://www.188.com/',
  'foxmail.com': 'http://www.foxmail.com',
  'outlook.com': 'http://www.outlook.com'
};
var _mail = $("#address").text().split('@')[1];
for (var j in hash){
  if(j === _mail){
    $("#address").attr("href", hash[_mail]);
  }
}