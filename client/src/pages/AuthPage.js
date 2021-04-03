import React, { useState } from 'react';
import { useHttp } from '../hooks/http.hook';

export const AuthPage = () => {
    const { loading, error, request } = useHttp();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const changeHandler = (e) => {
        console.log(e.target);
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {
                ...form,
            });
            console.log('data', data);
        } catch (e) {}
    };

    console.log(form);
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сократи Ссылку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div className="input-field">
                            <input
                                placeholder="Введите email"
                                id="email"
                                type="text"
                                name="email"
                                className="yellow-input"
                                autoComplete="off"
                                onChange={changeHandler}
                            />
                            <label htmlFor="email">email</label>
                        </div>
                        <div className="input-field">
                            <input
                                placeholder="Введите пароль"
                                id="password"
                                type="password"
                                name="password"
                                autoComplete="off"
                                onChange={changeHandler}
                            />
                            <label htmlFor="password">password</label>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            disabled={loading}
                        >
                            Войти
                        </button>
                        <button
                            className="btn grey lighten-1 darken-4"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
