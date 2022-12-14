import axios from "axios";
import {getProfile} from "@/router/requests";

export function setAuthToken(token) {
    localStorage.setItem('auth-user-token', token)
    axios.defaults.headers['Authorization'] = 'Bearer ' + token
}

export async function getUserProfile() {
    let user = null

    const { body, code } = await getProfile()
    if(code === 200) {
        user = body
    }

    return user
}

export function convertFormData(data) {
    const formData = new FormData()

    for(const name in data) {
        formData.append(name, data[name])
    }

    return formData
}