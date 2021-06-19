import React, { useState, useEffect, useRef } from 'react';

import Loader from "react-loader-spinner";
import axios from 'axios';
import {Redirect} from "react-router";
import logo from '../static/img/logo.png'

import gsap from 'gsap/all';

const AdminLogin = () => {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [loggedIn, setLoggedIn] = useState(false);
    let [loading, setLoading] = useState(false);

    let formContainer = useRef(null);

    useEffect(() => {
        let token = localStorage.getItem('token');
        if(token) {
            axios.post("https://hotic-polska.pl/admin/verify", {
                token
            })
                .then((res) => {
                    if(res.data.loggedIn === 1) {
                        setLoggedIn(true);
                    }

                });
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post("https://hotic-polska.pl/admin/auth", {
            username,
            password
        })
            .then((res) => {
               if(res.data.loggedIn === 1) {
                   localStorage.setItem('token', res.data.token);
                   setLoggedIn(true);
               }
               else {
                    setLoading(false);
                    gsap.fromTo(formContainer.current, { x: -5 }, { duration: .05, x: 0, repeat: 8, yoyo: true });
               }
            });
    }

    const handleChange = (e) => {
        if(e.target.name === "username") {
            setUsername(e.target.value);
        }
        else {
            setPassword(e.target.value);
        }
    }

    return (loggedIn ? <Redirect to="/admin/panel" /> : ( <main className="adminLogin">
        <header className="adminBeforeLoginHeader">
            <img className="adminLogo" src={logo} alt="logo" />

            <h1 className="formTitle">
                Panel administratora
            </h1>
        </header>
        <form ref={formContainer} className="adminLoginForm" method="POST" onSubmit={(e) => handleSubmit(e)}>
            {!loading ? (<><input className="adminLoginInput" type="text" name="username" placeholder="Login" value={username} onChange={(e) => handleChange(e)} />
            <input className="adminLoginInput" type="password" name="password" placeholder="Hasło" value={password} onChange={(e) => handleChange(e)} />
                <button className="adminLoginSubmitBtn">
                Zaloguj się
                </button></>) : <Loader type="grid" color="#F1602A" /> }
        </form>
    </main>));
}

export default AdminLogin;
