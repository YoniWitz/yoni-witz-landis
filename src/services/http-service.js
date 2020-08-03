import store from '../store/index.js';
import * as auth from './auth'

import axios from 'axios';

export function http() {
    return axios.create({
        baseURL: store.state.apiUrl,
        hearers: {
            Authorization: auth.getToken()
        }
    })
}
