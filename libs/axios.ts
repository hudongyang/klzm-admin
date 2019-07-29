import Axios from "axios";
import * as _ from 'lodash'
import Cookies from 'universal-cookie'
import { IncomingMessage } from "http";

const cookies = new Cookies()
const baseURL = 'http://127.0.0.1:8360'
const axios = Axios.create({
    baseURL
})

export const createAxios = (req: IncomingMessage) => {
    const axios = Axios.create({
        baseURL
    })

    axios.interceptors.request.use(config => {

        const cookies = new Cookies(req.headers.cookie)
        const token = cookies.get('token')

        if (!_.isEmpty(token)) {
            config.headers['x-xbyjshop-token'] = token
        }
        
        return config
    })
    
    return axios
}

axios.interceptors.request.use(config => {
    const token = cookies.get('token')

    if (!_.isEmpty(token)) {
        config.headers['x-xbyjshop-token'] = token
    }

    return config
})

export default axios