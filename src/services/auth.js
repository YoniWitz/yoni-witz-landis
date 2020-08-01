import store from '../store/index';
import { http } from './http-service';

export function isLoggedIn() {
    const token = localStorage.getItem('token');
    return token != null;
}

export function login(user) {
    return http().post('/auth', user)
        .then(res => {
            if (res) {
                const fakeToken = {
                    token: 'my-token'
                }
                setToken(fakeToken)
            }
        });
}

function setToken(token) {
    localStorage.setItem('token', JSON.stringify(token));
    store.dispatch('authenticate');
}

export function getUsername() {
    return 'Yoni';
}

export function getUserId() {
    return 1;
}

export function registerUser(user) {
    return http().post('/register', user);
}
