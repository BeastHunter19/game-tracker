import axios from 'axios'

export default {
    install: (app) => {
        app.config.globalProperties.$axios = axios.create({
            baseURL: 'http://localhost:3000',
            timeout: 1000
        })
    }
}
