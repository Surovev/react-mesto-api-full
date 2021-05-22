require('dotenv').config();
const { JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const LoginError = require('../errors/LoginError');

module.exports = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) { token = token.substring(7); }
  try {
    if (!token) {
      throw new LoginError('Необходима авторизация');
    }
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // записываем пейлоуд в объект запроса
    next(); // пропускаем запрос дальше
  } catch (err) {
    next(err);
  }
};
