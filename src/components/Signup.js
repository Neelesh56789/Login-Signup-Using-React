import React, { useState } from 'react';

export const Signup = ({ onLoginClick }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nameVerification() || !emailVerification() || !passVerification()) {
            alert('Fill the input fields correctly');
            return;
        }

        const inputObj = {
            name,
            email,
            pass: password,
        };
        alert('You have successfully registered!');
        onLoginClick(); 
    }

    const nameVerification = () => {
        return /^[A-Za-z\s]+$/.test(name);
    }

    const emailVerification = () => {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
    }

    const passVerification = () => {
        return password.length >= 8;
    }

    return (
        <div className="signup-container">
            <div className="signup">
                <h3>Sign-Up</h3>
            </div>
            <div className="input-fields">
                <input value={name} onChange={e => setName(e.target.value)} className="name" placeholder="Name" />
                <input value={email} onChange={e => setEmail(e.target.value)} className="email" placeholder="Email" />
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="password" placeholder="Password" />
            </div>
            <div className="buttons">
                <button className="signup-btn" onClick={handleSubmit}>SignUp</button>
                <button className="login-btn" onClick={onLoginClick}>Login</button>
            </div>
        </div>
    );
}
