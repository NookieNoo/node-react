import React from 'react';

export const AuthPage = () => {
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
                            />
                            <label htmlFor="password">password</label>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4">Войти</button>
                        <button className="btn grey lighten-1 darken-4">
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
