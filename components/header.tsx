import { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import User from "../models/user";
import { oc } from "ts-optchain";

const HeaderLine = () => {
    const [user, setUser] = useState<User>(null)

    useEffect(() => {
        const userStr = localStorage.getItem('user')

        if (!isEmpty(userStr)) {
            setUser(JSON.parse(userStr))
        }
    }, [])

    return (
        <header style={{lineHeight: '50px', background: '#324057', padding: '0 15px', textAlign: 'right'}}>
            <h2 style={{color: "white", margin: 0, width: '90%'}}>{oc(user).username()}</h2>
        </header>
    )
}

export default HeaderLine