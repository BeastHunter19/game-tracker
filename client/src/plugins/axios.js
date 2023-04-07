import axios from 'axios'

export default {
    install: (app) => {
        app.config.globalProperties.$axios = axios.create({
            baseURL: import.meta.env.VITE_BACKEND_URL,
            withCredentials: true,
            responseType: 'json',
            headers: { 'ngrok-skip-browser-warning': true }
        })
    }
}
