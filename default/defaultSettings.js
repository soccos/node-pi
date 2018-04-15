module.exports = [
  {
    type: 'cookie',
    maxAge: 7*24*60*60*1000,
    signed: true,
    key: 'node-pi'
  },
  {
    type: 'page',
    articleListPerPage: 5,
    commentListPerPage: 10
  },
  {
    type: 'email',
    expiryDate: 1000*60*15,
    host: 'smtp.163.com',
    port: 465,
    user: 'username',
    pass: 'password'
  },
  {
    type: 'upload',
    uploadDir: 'temp',
    multipart: true,
    maxFields: 5,
    hash: 'md5',
    keepExtensions: true
  },
  {
    type: 'server',
    name: 'NODE-PI',
    github: 'https://github.com/soccos/node-pi.git',
    port: 6543,
    address: '0.0.0.0'
  },
  {
    type: 'cache',
    staticServe: 604800,
    favicon: 604800,
    resource: 604800
  },
  {
    type: 'dataId',
    article: 2,
    comment: 0,
    resource: 0,
    role: 6,
    permission: 4,
    forum: 0
  }
];