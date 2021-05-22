const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((data) => {
    if (data.message) {
      return Promise.reject(`Ошибка: ${data.message}`);
    } else {
      throw Promise.reject(`Ошибка: ${res.status}`);
    }
  });
};

module.exports = checkResponse;
