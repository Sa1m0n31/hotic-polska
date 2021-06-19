import React, { useEffect, useState } from 'react';

import axios from 'axios';

import zamowieniaIcon from '../static/img/zamowienia_icon.svg'
import produktIcon from '../static/img/edytuj_icon.svg'
import klienciIcon from '../static/img/klienci_icon.svg'
import ustawieniaIcon from '../static/img/ustawienia_icon.svg'
import userOrange from '../static/img/admin_orange.svg'
import logo from '../static/img/logo.png'
import checkImg from '../static/img/check.svg'
import more from '../static/img/circle_right.svg'

import user from '../static/img/user.png';
import {Redirect} from "react-router";
import Loader from "react-loader-spinner";
import Zamowienia from "./AdminPanelPages/Zamowienia";
import Edycja from "./AdminPanelPages/Edycja";
import Klienci from "./AdminPanelPages/Klienci";
import Ustawienia from "./AdminPanelPages/Ustawienia";
import SingleZamowienie from "./AdminPanelPages/SingleZamowienie";
import x from '../static/img/x.png'

const AdminPanel = () => {
    let [loggedIn, setLoggedIn] = useState(true);
    let [username, setUsername] = useState('');
    let [page, setPage] = useState('Panel zamówień');
    let [single, setSingle] = useState(true);

    /* Powrot z podstrony SingleZamowienie */
    useEffect(() => {
        if(sessionStorage.getItem('singleRedirect')) {
            setPage(sessionStorage.getItem('singleRedirect'));
            sessionStorage.removeItem('singleRedirect');
        }
    }, []);

    useEffect(() => {
        let token = localStorage.getItem('token');
        if(token) {
            axios.post("https://hotic-polska.pl/admin/verify", {
                token
            })
                .then((res) => {
                    if(res.data.loggedIn === 1) {
                        setLoggedIn(true);
                        setUsername(res.data.username);
                    }
                    else {
                        setLoggedIn(false);
                    }
                });
        }
        else {
            setLoggedIn(false);
        }
    });

    useEffect(() => {
        if(window.innerWidth <= 900) mobileMenuClose();
    }, [page]);

    const logout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
    }

    const mobileMenuClose = () => {
        if(typeof document !== 'undefined') {
            document.querySelector(".adminMenu").style.transform = "scaleX(0)";
        }
    }

    return (
        loggedIn ? (<main className="adminLogin adminPanel">
            <menu className="adminMenu">
                <h2 className="adminMenuHeader">
                    Panel administratora
                </h2>

                <button className="adminMenuMobileClose" onClick={() => mobileMenuClose()}>
                    <img className="adminMenuMobileCloseImg" src={x} alt="exit" />
                </button>

                <ul className="adminMenuList">
                    <li className={page === 'Panel zamówień' ? "adminMenuItem adminMenuItemActive" : "adminMenuItem"} onClick={() => { setPage('Panel zamówień'); setSingle(!single); }}>
                        <img className="adminMenuIcon" src={zamowieniaIcon} alt="zamowienia" />
                        Zamówienia
                    </li>
                    <li className={page === 'Edycja produktu' ? "adminMenuItem adminMenuItemActive" : "adminMenuItem"} onClick={() => setPage('Edycja produktu')}>
                        <img className="adminMenuIcon" src={produktIcon} alt="edycja-produktu" />
                        Edycja produktu
                    </li>
                    <li className={page === 'Klienci' ? "adminMenuItem adminMenuItemActive" : "adminMenuItem"} onClick={() => setPage('Klienci')}>
                        <img className="adminMenuIcon" src={klienciIcon} alt="klienci" />
                        Klienci
                    </li>
                    <li className={page === 'Ustawienia' ? "adminMenuItem adminMenuItemActive" : "adminMenuItem"} onClick={() => setPage('Ustawienia')}>
                        <img className="adminMenuIcon" src={ustawieniaIcon} alt="ustawienia" />
                        Ustawienia
                    </li>
                </ul>

                <button className="adminLogoutBtn" onClick={() => logout()}>
                    Wyloguj się
                </button>
                <button className="backToFrontBtn">
                    <a href="/">
                        Wróć do strony głównej
                    </a>
                </button>
            </menu>
                {page === 'Panel zamówień' ? <Zamowienia username={username} singleUp={single} /> : ""}
                {page === 'Edycja produktu' ? <Edycja username={username} /> : ""}
                {page === "Klienci" ? <Klienci username={username} /> : ""}
                {page === "Ustawienia" ? <Ustawienia username={username} /> : ""}
        </main>) : <Redirect to="/admin" />
    )
}

export default AdminPanel;
