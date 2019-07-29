import { NextPage } from 'next'
import { oc } from "ts-optchain";
import { isEmpty } from "lodash";
import User from '../models/user';
import { useState, useEffect } from 'react';

const Page: NextPage = () => {
    const [user, setUser] = useState<User>(null)

    useEffect(() => {
        const userStr = localStorage.getItem('user')

        if (!isEmpty(userStr)) {
            setUser(JSON.parse(userStr))
        }
    }, [])

    return (
        <main style={{textAlign: 'center', marginTop: '150px', fontSize: '24px', color: '#409EFF'}}>
            Welcome <span>{oc(user).username()}</span>
        </main>
    )
}

export default Page;