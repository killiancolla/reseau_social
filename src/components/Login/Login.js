import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';



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

export default function Login({ setToken })
{
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState("");
    const [messageLogin, setMessageLogin] = useState("");

    let handleSignup = async (e) =>
    {
        e.preventDefault();
        try {
            let res = await fetch("https://social-media-api.eayou.fr/api/users/signup", {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                }),
            });

            const reader = res.body.getReader();
            const { value } = await reader.read();
            const result = new TextDecoder("utf-8").decode(value);
            const data = JSON.parse(result);
            console.log('data: ', data);

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

    const handleLogin = async e =>
    {
        e.preventDefault();

        const url = 'https://social-media-api.eayou.fr/api/users/login'
        fetch(url, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer eyJhbGciOiJzaGEyNTYiLCJ0eXAiOiJKV1QifQ.eyJpZCI6IjI5IiwidXNlcm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJpc0FkbWluIjoiYWRtaW4ifQ.0YC7SFEy3S7Ge7vplF9MVEkrlkOGPzStGeMXMtmBdA0',
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
            redirect: 'follow'
        })
            .then((response) => response.json()).then(result => console.log(result))
            .catch(error => console.log(error)
            )
    };

    return (
        <CssVarsProvider>
            <main>
                <Sheet
                    sx={{
                        width: 300,
                        mx: 'auto', // margin left & right
                        my: 4, // margin top & botom
                        py: 3, // padding top & bottom
                        px: 2, // padding left & right
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        borderRadius: 'sm',
                        boxShadow: 'md',
                    }}
                    variant="outlined"
                >
                    <div>
                        <Typography level="h4" component="h1">
                            <b>Welcome!</b>
                        </Typography>
                        <Typography level="body2">Sign in to continue.</Typography>
                    </div>
                    <form onSubmit={handleLogin} method="post">
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                onChange={e => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </FormControl>

                        <Button sx={{ mt: 1 /* margin top */ }} type='submit'>Log in</Button>
                    </form>
                    <Typography
                        endDecorator={<Link href="/sign-up">Sign up</Link>}
                        fontSize="sm"
                        sx={{ alignSelf: 'center' }}
                    >
                        Don&apos;t have an account?
                    </Typography>
                </Sheet>
            </main>
        </CssVarsProvider>
    );

    // return(
    //     <div className="login-wrapper">
    //         <h1>Please Sign Up</h1>
    //         <form onSubmit={handleSignup} method='post'>
    //             <label>
    //                 <p>Username</p>
    //                 <input type="text" onChange={e => setUserName(e.target.value)}/>
    //             </label>
    //             <label>
    //                 <p>Email</p>
    //                 <input type="email" onChange={e => setEmail(e.target.value)}/>
    //             </label>
    //             <label>
    //                 <p>Password</p>
    //                 <input type="password" onChange={e => setPassword(e.target.value)}/>
    //             </label>
    //             <div>
    //                 <button type="submit">Submit</button>
    //             </div>

    //             <div className="message">{message ? <p>{message}</p> : null}</div>
    //         </form>

    //         <h1>Please Log in</h1>
    //         <form onSubmit={handleLogin} method='post'>
    //             <label>
    //                 <p>Email</p>
    //                 <input type="email" onChange={e => setEmail(e.target.value)}/>
    //             </label>
    //             <label>
    //                 <p>Password</p>
    //                 <input type="password" onChange={e => setPassword(e.target.value)}/>
    //             </label>
    //             <div>
    //                 <button type="submit">Submit</button>
    //             </div>
    //             <div className="message">{messageLogin ? <p>{messageLogin}</p> : null}</div>
    //         </form>
    //     </div>
    // )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}