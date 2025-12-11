import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Admin.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const Admin = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:8080/user_api/api/auth.php', {
                login,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            setMessage(response.data.message);
            if (response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate('/see_bd'); // Перенаправление на страницу see_bd
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Ошибка авторизации');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setMessage('Вы вышли из системы');
    };

    //Если пользователь уже авторизован, перенаправляем его сразу
    
    // if (localStorage.getItem('user')) {
    //     navigate('/see_bd');
    //     return null;
    // }

    return (
        <div className='first'>
            <div className='box'>
                <h2 className='txt'>Авторизация</h2>
                
                {message && <div className="error-message" style={{color: message.includes('Ошибка') ? 'red' : 'green', marginBottom: '15px'}}>{message}</div>}
                
                <form onSubmit={handleSubmit} className='auth-form'>
                    <TextField
                        label="Логин"
                        variant="outlined"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                        className='auth-input'
                        InputProps={{
                            style: {
                                color: 'white',
                                borderColor: 'white'
                            }
                        }}
                        InputLabelProps={{
                            style: {
                                color: 'white'
                            }
                        }}
                    />
                    
                    <TextField
                        label="Пароль"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='auth-input'
                        InputProps={{
                            style: {
                                color: 'white',
                                borderColor: 'white'
                            }
                        }}
                        InputLabelProps={{
                            style: {
                                color: 'white'
                            }
                        }}
                    />
                    
                    <div className='auth-buttons'>
                        <Button 
                            type="submit" 
                            variant="contained"
                            className='auth-button'
                            style={{marginTop: '20px'}}
                        >
                            Войти
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};