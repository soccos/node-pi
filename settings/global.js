// -- throw error --
global.throwErr = (status, err) => {
  const error = new Error(err);
  error.status = status;
  throw error;
};

//-- environment --
global.NODE_ENV = process.env.NODE_ENV;

module.exports = {};