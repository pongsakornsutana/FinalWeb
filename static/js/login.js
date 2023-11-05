const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);
const UsernameCon = urlParams.get('username');
const passwordCon = urlParams.get('password');

window.onload = loginLoad;

