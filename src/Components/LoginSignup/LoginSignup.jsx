import './LoginSignup.css'
import user_icon from '../Assets/login.png'
import password_icon from '../Assets/password.png'
import { useState } from 'react';



const LoginSignup = () => {
    const [useMatricule, setMatricule] = useState('');
    const [usePassword, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await Login(useMatricule, usePassword);
            window.location.href = '/#/mes_fiches';
        } catch (error) {
            console.error('Error:', error);
        }
    }

        return <div className='h-screen flex items-center'>
            <div className= 'container'>
            <div className= 'header'>
            <div className= 'text'>Login</div>
            <div className= 'underline'></div>
            </div>
            <div className='inputs'>
            <div className='input'>
            <img src={user_icon} alt="" />
            <input type="text" placeholder="Matricule interne" required value={useMatricule} onChange={(e) => setMatricule(e.target.value)} />
            </div>
            <div className='input'>
            <img src={password_icon} alt="" />
            <input type="password" placeholder="Mot de passe" required value={usePassword} onChange={(e) => setPassword(e.target.value)} />
            </div>
            </div>
            <div className="submit-container">
            <div className="submit" onClick={handleLogin}>Login</div>
            </div>
            </div>
        </div>
    }

const Login = async (matricule, password) => {
    const API_URL = 'http://localhost:8080';
    try {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ matricule, password })
    });
    const data = await response.json();

    localStorage.setItem('token', data.token);

    return data;
    } catch (error) {
        throw error;
    }
}

export default LoginSignup