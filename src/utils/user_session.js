import { axiosInstance } from '../App.js';

export function logIn(email, password) {
  return new Promise((resolve, reject) => {
    axiosInstance.post('/auth/login', {
    email: email,
    password: password
    })
      .then(response => {
        console.log('logIn\n', response.data);
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('uid', response.data.uid);
        axiosInstance.defaults.headers['Authorization'] = response.data.token;
        resolve(true);
      })
      .catch(error => {
        console.log('logIn\n', error.response.data.errors);
      });
  });
}

export function fetchUserData() {
  return new Promise((resolve, reject) => {
    axiosInstance.get('/users/' + sessionStorage.getItem('uid')
    )
      .then(response => {
        console.log('fetchUserData\n', response.data);
        sessionStorage.setItem('user', JSON.stringify(response.data));
        resolve(true);
      })
      .catch(error => {
        console.log('fetchUserData\n', error.response.data.errors);
      });
  })
}