import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const { loading, error, request, clearError } = useHttp();
    const message = useMessage();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = (e) => {
        console.log(e.target);
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {
                ...form,
            });
            message(data.message);
        } catch (e) {}
    };

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {
                ...form,
            });
            auth.login(data.token, data.userId);
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
                            onClick={loginHandler}
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
