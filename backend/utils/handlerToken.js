require('dotenv').config();
let { JWT_SECRET, NODE_ENV } = process.env;

if (NODE_ENV !== 'production' && NODE_ENV !== null) {
  JWT_SECRET = 'dev-secret';
}

module.exports = JWT_SECRET;
