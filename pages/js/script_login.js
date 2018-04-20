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
    return screenTopWarning('密码长度不可能少于8位');
  }
  if(!checkPassword(obj.password)) {
    return screenTopWarning('密码必须含有数字、小写字母和大写字母');
  }
  reqAPI('/login', 'POST', obj)
    .done(function() {
      var url;
      if(
        document.referrer.toString().indexOf('register')>=0 ||
        document.referrer.toString().indexOf('logout')>=0 ||
        document.referrer.toString().indexOf('login')>=0 ||
        document.referrer == ""
      ){
        url = '/';
      }else{
        if(document.referrer.match('127.0.0.1:6543') || document.referrer.match('gouri.xin') ){
          url = '/';
        }else{
          url = document.referrer;
        }
      }
      window.location.href = url || '/';
    })
    .fail(function(data) {
      return errorHandle(data);
    })
}