module.exports = [
  {
    _id: 'cookie',
    maxAge: 7*24*60*60*1000,
    signed: true,
    key: 'node-pi'
  },
  {
    _id: 'page',
    articleListPerPage: 5,
    commentListPerPage: 10
  },
  {
    _id: 'email',
    expiryDate: 1000*60*15,
    oneDayCount: 50,
    host: 'smtp.163.com',
    port: 465,
    user: 'username',
    pass: 'password'
  },
  {
    _id: 'upload',
    uploadDir: 'temp',
    multipart: true,
    maxFields: 5,
    hash: 'md5',
    keepExtensions: true
  },
  {
    _id: 'server',
    name: 'TEST',
    github: 'https://github.com/soccos/node-pi.git',
    port: 6545,
    address: '0.0.0.0'
  },
  {
    _id: 'cache',
    staticServe: 604800,
    favicon: 604800,
    resource: 604800
  },
  {
    _id: 'dataId',
    article: 0,
    comment: 0,
    resource: 0,
    role: 1,
    operation: 0,
    forum: 0
  }
];
