import React, { useState } from 'react';
// import { Login } from './Login.js';
import { Login } from './Login';
import { Signup } from './Signup';

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  
  function handleClick(){
    setIsLogin(!isLogin);
  }
    console.log(isLogin);
  return (
    <div>
      {isLogin ? <Login onSignupClick={handleClick} /> : <Signup onLoginClick ={handleClick} />}
      
    </div>
  );
}
