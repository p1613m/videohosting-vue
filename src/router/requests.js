import axios from "axios";

async function apiRequest(method, url, data = null) {
    let body, code, response

    try {
        response = await axios[method](url, data)
    } catch (e) {
        response = e.response;
    }

    body = response.data
    code = response.status

    return { body, code }
}

export async function sendRegistration(data) {
    return await apiRequest('post', '/registration', data);
}

export async function sendLogin(data) {
    return await apiRequest('post', '/auth', data)
}

export async function getProfile() {
    return await apiRequest('get', '/profile')
}

export async function userLogout() {
    return await apiRequest('delete', '/logout')
}

export async function sendProfile(data) {
    return await apiRequest('patch', '/profile', data)
}

export async function videoSearch(searchString = '') {
    return await apiRequest('get', `/videos?search=${searchString}`)
}