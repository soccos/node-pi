const fs = require('fs');
const path = require('path');

const fn = (dir) => {
  const arr = fs.readdirSync(path.resolve(__dirname, '../'+dir));
  const obj = {};
  for(let name of arr) {
    name = name.replace('.js', '');
    if(name === 'index') continue;
    obj[name] = require(path.resolve(__dirname, '../'+dir) + `/${name}.js`)
  }
  return obj;
};

module.exports = fn;
