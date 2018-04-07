// 0-9: 48-57
// A-Z: 65-90
// a-z: 97-122

const stringArr = [];
for(let i = 48; i <= 122; i++) {
  if((i >= 48 && i <= 57) || (i >= 65 && i <= 90) || (i >= 97 && i <= 122)) {
    const str = String.fromCharCode(`0x${i.toString(16)}`);
    stringArr.push(str);
  }
}

const fn = {};

fn.getRandomString = (num) =>{
  let str = '';
  for(let i = 0; i >= 0; i++) {
    const number = Math.floor(Math.random()*stringArr.length);
    str += stringArr[number];
    if(str.length >= num) {
      break;
    }
  }
  return str;
};

module.exports = fn;

