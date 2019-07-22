import axios from 'axios';

export function logIn(email, password) {
  return new Promise((resolve, reject) => {
    axios.post('/auth/login', {
    email: email,
    password: password
    })
      .then(response => {
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('uid', response.data.uid);
        resolve(true);
      })
      .catch(error => {
        reject(false);
      });
  });
}

export function fetchUserData() {
  return new Promise((resolve, reject) => {
    axios.get('/users/' + sessionStorage.getItem('uid')
    )
      .then(response => {
        sessionStorage.setItem('user', JSON.stringify(response.data));
        resolve(true);
      })
      .catch(error => {
        reject(false);
      });
  })
}

export function logOut(message) {
  sessionStorage.clear();
  if (message) {
    alert(message);
  }
  window.location.replace('/');
}