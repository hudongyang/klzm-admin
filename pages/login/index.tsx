import { NextPage } from 'next'
import Head from "next/head";
import { useState } from 'react';
import * as _ from "lodash";
import axios from "../../libs/axios";
import Cookies from 'universal-cookie'
const css = require('./style.css')

const Page: NextPage = props => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div>
            <Head>
                <title>登陆</title>
            </Head>

            <h1 className={css.title}>Login</h1>

            <div className={css.container}>
                <div className={css.inputItem}>
                    <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="用户名" />
                </div>

                <div className={css.inputItem}>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="密码" />
                </div>

                <button onClick={e => login({username, password})} className={css.loginButton}>登陆</button>
            </div>
        </div>
    )
}

interface User {
    username: string
    password: string
}

const login = async(params: User) => {
    if (_.isEmpty(params.username) || _.isEmpty(params.password)) {
        return alert('用户名或密码不能为空')
    }
    
    const resp = await axios.post('/admin/auth/login', params)
    let data = resp.data

    if (data.errno !== 0) {
        return alert(data.errmsg)
    }

    data = data.data
    localStorage.setItem('token', data.token)
    
    const cookies = new Cookies()
    cookies.set('token', data.token)
    
    localStorage.setItem('user', JSON.stringify(data.userInfo))

    location.href = '/'
}

export default Page
