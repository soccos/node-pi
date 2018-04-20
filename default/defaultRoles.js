module.exports = [
  {
    _id: 'administrator',
    description: 'administrator'
  },
  {
    _id: 'admin',
    description: 'admin'
  },
  {
    _id: 'default',
    description: 'default'
  },
  {
    _id: 'visitor',
    description: 'visitor',
    operations: [
      'viewHome',
      'viewRegister',
      'viewLogin',
      'login',
      'register',
      'viewArticle'
    ]
  }
];