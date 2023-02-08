import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

// async function loginUser(credentials) {
//     console.log(credentials);
//     const url = 'https://social-media-api.eayou.fr/api/users/login'
//     // const url = 'http://localhost:8080/login'
//     fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(credentials)
//     })
//     .then(data => data.json())
//     .then((data) => { return data })
// }





export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState("");
  
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // https://social-media-api.eayou.fr/api/users/signup
      let res = await fetch("http://social-media-api/api/users/signup", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });
      console.log('res: ',res);
    
      const reader = res.body.getReader();
        const { value } = await reader.read();
        const result = new TextDecoder("utf-8").decode(value);
        const data = JSON.parse(result);
        console.log('data: ',data);

      if (res.status === 200) {
        setUserName("");
        setEmail("");
        setMessage("User created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

    return(
        <div className="login-wrapper">
        <h1>Please Log In</h1>
        <form onSubmit={handleSubmit}>
            <label>
                <p>Username</p>
                <input type="text" onChange={e => setUserName(e.target.value)}/>
            </label>
            <label>
                <p>Email</p>
                <input type="email" onChange={e => setEmail(e.target.value)}/>
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>

            <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}