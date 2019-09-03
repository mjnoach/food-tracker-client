export default function logOut(message) {
  sessionStorage.clear();
  if (message) {
    alert(message);
  }
  window.location.replace('/');
}