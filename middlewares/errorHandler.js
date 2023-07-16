const errorHandler = (error, req, res, next) => {
  console.error(error);
  return res.status(error.statusCode || 500).json({
    msg: error.message,
    data: error.data?.msg,
  });
};

module.exports = errorHandler;
