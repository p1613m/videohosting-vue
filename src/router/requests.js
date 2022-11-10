import axios from "axios";
import {convertFormData} from "@/use/functions";

async function apiRequest(method, url, data = null) {
    let body, code, response

    if(method === 'patch' && data instanceof FormData) {
        method = 'post'
        data.append('_method', 'patch')
    }

    try {
        response = await axios[method](url, data, {
            headers: {
                'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json'
            }
        })
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

export async function videoSearch(searchString = '', page = 1) {
    return await apiRequest('get', `/videos?search=${searchString}&page=${page}`)
}

export async function sendVideo(data) {
    return await apiRequest('post', '/videos', convertFormData(data))
}

export async function getVideo(id) {
    return await apiRequest('get', `/videos/${id}`)
}

export async function getMyVideos() {
    return await apiRequest('get', '/videos/my')
}

export async function deleteUserVideo(id) {
    return await apiRequest('delete', `videos/${id}`)
}

export async function updateVideo(id, data) {
    return await apiRequest('patch', `/videos/${id}`, convertFormData(data))
}

export async function likeVideo(id) {
    return await apiRequest('post', `/videos/${id}/like`)
}