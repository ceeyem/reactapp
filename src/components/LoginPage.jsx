import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, TOKEN_NAME } from "../constants";

function LoginPage() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginFailed, setLoginFailed] = useState("")
    const navigate = useNavigate();

    const handleUsernameChange = (evt) => {
        setUsername(evt.target.value)
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value)
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        setLoginFailed("");
        fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then(data => {
                localStorage.removeItem(TOKEN_NAME)
                localStorage.setItem(TOKEN_NAME, data.jwt)
                navigate('/dashboard', { replace: true });
            })
            .catch((error) => {
                console.log('error: ' + error);
                setLoginFailed("Incorrect Login");
            });

        setUsername("")
        setPassword("")
    }

    const formDivStyle = {
        margin: "auto",
        padding: "20px",
        width: "80%"
    }
    return (
        <div>
            <div style={formDivStyle}>
                <h1>Log In</h1>
                <form className="ui form" onSubmit={handleSubmit}>
                    <div className="field">
                        <label>Username</label>
                        <input value={username} onChange={handleUsernameChange} type="text" placeholder="username" />
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input value={password} onChange={handlePasswordChange} type="password" placeholder="password" />
                    </div>

                    <button className="ui button" type="submit">Login</button>
                </form>
                <p>{loginFailed}</p>
            </div>
        </div>
    )
}

export default LoginPage
