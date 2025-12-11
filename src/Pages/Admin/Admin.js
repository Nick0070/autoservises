import './Admin.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export const Admin = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login:', login, 'Password:', password);
        // navigate('/dashboard');
    };

    return (
        <div className='first'>
            <div className='box'>
                <div className='txt'>Авторизация</div>
                
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
                        >
                            Войти
                        </Button>
                        
                    </div>
                </form>
            </div>
        </div>
    );
};


