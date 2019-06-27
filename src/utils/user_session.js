import axios from 'axios';

export function logIn(email, password) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.REACT_APP_API_URL + '/login', {
    email: email,
    password: password
    })
      .then(response => {
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('uid', response.data.uid);
        resolve(true);
      })
      .catch(error => {
        console.log(error);
      });
  });
}

export function fetchUserData() {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_API_URL + '/users/' + sessionStorage.getItem('uid'), {
      headers: {
        Authorization: sessionStorage.getItem('token')
      }
    })
      .then(response => {
        console.log(response.data);
        sessionStorage.setItem('user', JSON.stringify(response.data));
        resolve(true);
      })
      .catch(error => {
        console.log(error);
      });
  })
}