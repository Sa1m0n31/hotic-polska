import React, { useEffect, useState } from 'react';

import axios from 'axios';

import zamowieniaIcon from '../../static/img/zamowienia_icon.svg'
import produktIcon from '../../static/img/edytuj_icon.svg'
import klienciIcon from '../../static/img/klienci_icon.svg'
import ustawieniaIcon from '../../static/img/ustawienia_icon.svg'
import userOrange from '../../static/img/admin_orange.svg'
import logo from '../../static/img/logo.png'

import {Redirect} from "react-router";
import Loader from "react-loader-spinner";
import Klienci from "./../AdminPanelPages/Klienci";
import Ustawienia from "./../AdminPanelPages/Ustawienia";
import x from '../../static/img/x.png'
import check from '../../static/img/check.svg'

const SingleZamowienie = () => {
    let [loggedIn, setLoggedIn] = useState(true);
    let [username, setUsername] = useState('');
    let [page, setPage] = useState('Szczegóły zamówienia');
    let [single, setSingle] = useState(true);
    let [loaded, setLoaded] = useState(false);
    let [szczegoly, setSzczegoly] = useState(null);

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
                        /* Pobranie pojedynczego zamówienia */
                        let id = sessionStorage.getItem('orderId');
                        if(id) {
                            axios.post("https://hotic-polska.pl/get-order", {
                                id
                            })
                                .then((res) => {
                                    if(res.data.order !== 0) {
                                        setSzczegoly(res.data.order);
                                    }
                                    setLoaded(true);
                                });
                        }
                        else {
                            setLoaded(true);
                        }
                    }
                    else {
                        setLoggedIn(false);
                    }
                });
        }
        else {
            setLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        if(window.innerWidth <= 900) mobileMenuClose();
        if(page !== 'Szczegóły zamówienia') {
            sessionStorage.setItem('singleRedirect', page);
            window.location.href = "/admin/panel";
        }
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

    const openMobileMenu = () => {
        if(typeof document !== 'undefined') {
            document.querySelector(".adminMenu").style.transform = "scaleX(1)";
        }
    }

    return (
        loggedIn ? (<main className="adminLogin adminPanel adminPanelSingleZamowienie">
            <menu className="adminMenu">
                <h2 className="adminMenuHeader">
                    Panel administratora
                </h2>

                <button className="adminMenuMobileClose" onClick={() => mobileMenuClose()}>
                    <img className="adminMenuMobileCloseImg" src={x} alt="exit" />
                </button>

                <ul className="adminMenuList">
                    <li className="adminMenuItem adminMenuItemActive" onClick={() => { setPage('Panel zamówień'); setSingle(!single); }}>
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
            <header className="adminLoginHeader">
                <div className="adminLoginHeaderTop">
                    <button className="hamburgerBtn hamburgerAdmin" onClick={() => openMobileMenu()}>
                        <span className="hamburgerLine"></span>
                        <span className="hamburgerLine"></span>
                        <span className="hamburgerLine"></span>
                    </button>

                    <h2 className="adminLoginHeaderTitle">
                        Szczegóły zamówienia
                    </h2>

                    <h3 className="adminLoginZalogowanyJako">
                        <img className="adminLoginZalogowanyJakoImg" src={userOrange} alt="admin" />
                        {window.innerWidth > 600 ? "Zalogowany jako" : ""} <b> {username}</b>
                    </h3>
                </div>
                <div className="adminLoginHeaderBottom">
                    <img className="logoTop" src={logo} alt="hotic-polska" />

                </div>
            </header>
            <main className="adminPanelMain">
                {loaded ? <>
                    {szczegoly ? <div className="szczegolyZamowienia">
                        <h2 className="szczegolyZamowieniaTitle">
                            Szczegóły zamówienia
                        </h2>
                        <div className="szczegolyZamowieniaInner">
                            <div className="szczegolyZamowieniaLeft">
                                <div className="szczegolyZamowieniaItem">
                                    <h3 className="szczegolyZamowieniaLabel">
                                        Imię i nazwisko
                                    </h3>
                                    <h3 className="szczegolyZamowieniaData">
                                        {szczegoly.imie} {szczegoly.nazwisko}
                                    </h3>
                                </div>
                                <div className="szczegolyZamowieniaItem">
                                    <h3 className="szczegolyZamowieniaLabel">
                                        Numer telefonu
                                    </h3>
                                    <h3 className="szczegolyZamowieniaData">
                                        {szczegoly.telefon}
                                    </h3>
                                </div>
                                <div className="szczegolyZamowieniaItem">
                                    <h3 className="szczegolyZamowieniaLabel">
                                        Adres email
                                    </h3>
                                    <h3 className="szczegolyZamowieniaData">
                                        {szczegoly.email}
                                    </h3>
                                </div>
                                <div className="szczegolyZamowieniaItem">
                                    <h3 className="szczegolyZamowieniaLabel">
                                        Zamówienie opłacone
                                    </h3>
                                    <h3 className="szczegolyZamowieniaData">
                                        <img className="szczegolyZamowieniaIcon" src={szczegoly.oplacone ? check : x} alt="oplacone" />
                                    </h3>
                                </div>
                                <div className="szczegolyZamowieniaItem">
                                    <h3 className="szczegolyZamowieniaLabel">
                                        Faktura
                                    </h3>
                                    <h3 className="szczegolyZamowieniaData">
                                        <img className="szczegolyZamowieniaIconFaktura" src={szczegoly.faktura.czyFaktura ? check : x} alt="faktura" />
                                    </h3>
                                </div>
                                <div className="szczegolyZamowieniaItem">
                                    <h3 className="szczegolyZamowieniaLabel">
                                        Data złożenia zamówienia
                                    </h3>
                                    <h3 className="szczegolyZamowieniaData">
                                        {szczegoly.data_zlozenia_zamowienia}
                                    </h3>
                                </div>
                            </div>
                            <div className="szczegolyZamowieniaRight">
                                <div className="szczegolyZamowieniaItem">
                                    <h3 className="szczegolyZamowieniaLabel">
                                        Ilość
                                    </h3>
                                    <h3 className="szczegolyZamowieniaData">
                                        {szczegoly.ilosc}
                                    </h3>
                                </div>
                                <div className="szczegolyZamowieniaItem">
                                    <h3 className="szczegolyZamowieniaLabel">
                                        Skórka
                                    </h3>
                                    <h3 className="szczegolyZamowieniaData">
                                        {szczegoly.skorka === 1 ? "Czarna" : "Srebrna"}
                                    </h3>
                                </div>
                                <div className="szczegolyZamowieniaItem">
                                    <h3 className="szczegolyZamowieniaLabel">
                                        Adres zamieszkania
                                    </h3>
                                    <h3 className="szczegolyZamowieniaData">
                                        {szczegoly.adres}<br/>
                                        {szczegoly.kod_pocztowy} {szczegoly.miasto}
                                    </h3>
                                </div>
                                <div className="szczegolyZamowieniaItem">
                                    <h3 className="szczegolyZamowieniaLabel">
                                        Sposób dostawy
                                    </h3>
                                    <h3 className="szczegolyZamowieniaData">
                                        {szczegoly.dostawa.rodzaj}
                                    </h3>
                                </div>
                                <div className="szczegolyZamowieniaItem">
                                    <h3 className="szczegolyZamowieniaLabel">
                                        Adres dostawy
                                    </h3>
                                    <h3 className="szczegolyZamowieniaData">
                                        {szczegoly.dostawa.adresDostawy.adres}<br/>
                                        {szczegoly.dostawa.adresDostawy.kod_pocztowy} {szczegoly.dostawa.adresDostawy.miasto}
                                    </h3>
                                </div>
                                <div className="szczegolyZamowieniaItem">
                                    <h3 className="szczegolyZamowieniaLabel">
                                        Dane do faktury
                                    </h3>
                                    <h3 className="szczegolyZamowieniaData">
                                        {szczegoly.faktura.czyFaktura ? <>{szczegoly.faktura.dane_do_faktury.nazwa_firmy}<br/>
                                        {szczegoly.faktura.dane_do_faktury.nip}<br/>
                                            {szczegoly.faktura.dane_do_faktury.adresFirmy}<br/>
                                            {szczegoly.faktura.dane_do_faktury.kod_firmy} {szczegoly.faktura.dane_do_faktury.miasto_firmy}
                                        </>: "Nie dotyczy"}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div> : <div className="szczegolyError">
                        Nie udało się znaleźć żądanego zamówienia
                    </div> }
                </> : <div className="loaderCenter"><Loader type="grid" color="#F1602A" /></div>}
            </main>
        </main>) : <Redirect to="/admin" />
    )
}

export default SingleZamowienie;
