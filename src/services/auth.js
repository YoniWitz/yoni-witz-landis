import store from '../store/index.js'

export function isLoggedIn() {
    const token = localStorage.getItem('token');
    return token != null;
}

export function login() {
    const token = {
        username: 'Yoni'
    }
    setToken(token)
}

function setToken(token) {
    localStorage.setItem('token', JSON.stringify(token));
    store.dispatch('authenticate');
}

export function getUsername() {
    return 'Yoni';
}

export function getUserId(){
    return 1;
}
