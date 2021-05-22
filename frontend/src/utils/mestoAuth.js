export const BASE_URL = 'http://localhost:3000';
const checkResponse = require('../utils/checkResponse');

export const register = ({ password, email }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then(checkResponse);
};
export const authorize = ({ password, email }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then(checkResponse);
};
export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(checkResponse);
};

// const token = { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M…0MDB9.DlN5pejVcprk5Nwo7rxvzy4Dk4UELS6tbKv_6hrIg9E' };

// TODO: если в ответе сервера есть json при ошибке - возвращать промис с текстом оттуда. Если нет - оставить как сейчас.
// точно такая же обработка ошибок должна быть в api.js

// const checkResponse = (res) => {
//   if (res.ok) {
//     return res.json();
//   }
//   return res.json().then((data) => {
//     if (data.message) {
//       return Promise.reject(`Ошибка: ${data.message}`);
//     } else {
//       throw Promise.reject(`Ошибка: ${res.status}`);
//     }
//   });
// };

// register({
//   password: '123456hhHa',
//   email: 'aalabam-aalabam@maild.ru'
// })
//   .then(res => console.log(res));
// getContent(token)
//   .then(res => console.log(res));

// {data: {…}}
// data: {_id: "606c4f75546906001995a170", email: "aalabam-aalabam@maild.ru"}
// __proto__: Object
