module.exports = (err, res) => {
  if (!err.statusCode || err.statusCode === 500) {
    res.status(500).send({ message: 'Ошибка сервера' });
  } else {
    res.status(err.statusCode).send({ message: err.message });
  }
};
