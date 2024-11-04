module.exports = (err, req, res, next) => {
  console.error(err.stack); // Logs the error stack trace for debugging

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    status: err.status || 500,
  });
};
