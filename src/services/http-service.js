import store from '../store/index.js'

import axios from 'axios';

export function http() {
    return axios.create({
        baseURL: store.state.apiUrl
    })
}
