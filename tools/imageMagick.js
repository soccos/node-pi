const os = require('os');
const {spawn} = require('child_process');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const fn = {};
const linux = os.platform() === 'linux';
const spawnProcess = (pathName, args, options = {}) => {
  return new Promise((resolve, reject) => {
    const bat = spawn(pathName, args, options);
    let data = '';
    let err = '';
    bat.stdout.on('data', (d) => {
      data += `${d}\n`;
    });
    bat.stderr.on('data', (e) => {
      err += `${e}\n`;
    });
    bat.on('close', (code) => {
      if(code !== 0) {
        reject(err);
      }
      resolve(data);
    });
    bat.on('error', (e) => {
      reject(e);
    })
  })
};
fn.articleCoverify = (path, targetPath) => {
  if(linux) {
    return spawnProcess('convert', [path, '-resize', `300x200^`, '-gravity', 'Center', '-quality', '90', '-crop', `300x200+0+0`, targetPath]);
  }
  return spawnProcess('magick', ['convert', path, '-resize', `300x200^`, '-gravity', 'Center', '-quality', '90', '-crop', `300x200+0+0`, targetPath]);
};
fn.articleImageify = (path, targetPath) => {
  if(linux) {
    return spawnProcess('convert', [path, '-gravity', 'southeast', '-gravity', 'Center', '-quality', '90', targetPath]);
  }
  return spawnProcess('magick', ['convert', path, '-gravity', 'southeast', '-gravity', 'Center', '-quality', '90', targetPath]);
};

fn.ensurePath = () => {
  const m = moment();
  const year = m.format('YYYY');
  const month = m.format('MM');
  let targetPath = path.resolve(`resources/upload/${year}`);
  if(!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath);
  }
  targetPath = path.resolve(`resources/upload/${year}/${month}`);
  if(!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath);
  }
  const coverPath = targetPath + '/cover';
  if(!fs.existsSync(coverPath)) {
    fs.mkdirSync(coverPath);
  }
  return {
    coverPath,
    targetPath,
    datePath: `/${year}/${month}`
  };
};
fn.removeImage = (path) => {
  fs.unlinkSync(path);
};
module.exports = fn;