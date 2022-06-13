import React, { useState } from 'react';
import axios from 'axios';

const projectID = "e711108e-6d03-4362-984a-366119db9fce";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authObject = { 'Project-ID': projectID, 'User-Name': username, 'User-Secret': password };

        try {
            // username & password => chatengine -> give messages
            await axios.get('https://api.chatengine.io/chats', { headers: authObject });

            // works out -> logged in
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            window.location.reload();
            setError('');
        } catch (error) {
            //error -> try with new username...
            setError('Oops, incorrect credentials.')
        }
    }

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Chat Application</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
                    <div align="center">
                        <button type="submit" className="button">
                            <span>Start Chatting</span>
                        </button>
                    </div>
                    <h2>{error}</h2>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;