// -- throw error --
global.throwErr = (status, err) => {
  const error = new Error(err);
  error.status = status;
  return error;
};

//-- environment --
global.NODE_ENV = process.env.NODE_ENV;

module.exports = {};