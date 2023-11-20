import { useState } from "react";
export const Login = ({onSignupClick}) =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!emailVerification() || !passVerification()) {
            alert('Fill the input fields correctly');
            return;
        }
        else{
        const inputObj = {
            email,
            pass: password,
        };
        alert('You have successfully Logged In!');
        clear();
    }
    }

    const emailVerification = () => {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
    }

    const passVerification = () => {
        return password.length >= 8;
    }

    const clear = () =>{
        setEmail('');
        setPassword('');
    }
    return (
        
        <div className = "login-container">
            <div className = "login">
                <h3>Login</h3>
            </div>
            <div className="input-fields">
                <input value={email} onChange={e => setEmail(e.target.value)} className="email" placeholder="Email" />
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="password" placeholder="Password" />
            </div>
            <div className="buttons">
                <button className="signup-btn" onClick={onSignupClick}>SignUp</button>
                <button className="login-btn" onClick={handleSubmit}>Login</button>
            </div>
        </div>
        
    )
}