global.throwErr = (status, err) => {
  const error = new Error(err);
  error.status = status;
  return error;
};
module.exports = {};