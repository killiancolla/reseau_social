import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import axios from 'axios';

async function loginUser(credentials) {
    console.log(credentials);
    const url = 'https://social-media-api.eayou.fr/api/users/login'
    // const url = 'http://localhost:8080/login'
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
    .then((data) => { return data })
}



export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username, 
            password
        });
        // console.log(token);
        // setToken(token)
    }

    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     try {
    //       const data = await axios.post("https://social-media-api.eayou.fr/api/users/signup", {
    //         username: 'test',
    //         email: 'test@test.fr',
    //         password: 'test'
    //       }).then(
    //         function(response) {
    //             console.log(response);
    //         })
    //         .catch(function(error) {
    //             console.log(error);
    //         });
    //     //   console.log(data);
    //     //   ctxDispatch({ type: "USER_SIGNIN", payload: data });
    //     //   localStorage.setItem("userInfo", JSON.stringify(data));
    //     //   navigate(redirect || "/");
    //     } catch (error) {
    //         console.log(error);
    //     }
    //   };

    return(
        <div className="login-wrapper">
        <h1>Please Log In</h1>
        <form onSubmit={handleSubmit}>
            <label>
                <p>Username</p>
                <input type="text" onChange={e => setUserName(e.target.value)}/>
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}