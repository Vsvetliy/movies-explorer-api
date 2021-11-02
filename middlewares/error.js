module.exports = (err, req, res, next) => {
  if (!err.statusCode || err.statusCode === 500) {
    res.status(500).send({ message: err.message });
  } else {
    res.status(err.statusCode).send({ message: err.message });
  }
};
