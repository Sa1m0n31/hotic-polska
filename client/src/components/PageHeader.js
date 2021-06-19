import React, { useEffect, useState, useRef, useContext } from 'react';

import logo from '../static/img/logo.png';
import koszyk from '../static/img/shopping-bags.svg';
import userIcon from "../static/img/user_circle_black.svg";
import axios from "axios";
import exit from "../static/img/x.png";
import logoutImg from '../static/img/logout.png'

import {gsap} from "gsap/all";

const PageHeader = (props) => {
    useEffect(() => {
        /* Sprawdzenie czy uzytkownik zalogowany */
        let token = localStorage.getItem('token');
        if(token) {
            axios.post("https://hotic-polska.pl/user/verify", {
                token
            })
                .then((res) => {
                    if(res.data.loggedIn === 1) {
                        setUser(res.data.username);
                    }
                })
        }
    }, []);

    let [user, setUser] = useState("");
    let [koszykBottom, setKoszykBottom] = useState(false);

    useEffect(() => {
        if(user !== '') {
            wylogujBtn.current.style.display = "flex";
        }
        else {
            wylogujBtn.current.style.display = "none";
        }
    }, [user]);

    let mobileMenu = useRef(null);
    let mobileMenuChild1 = useRef(null);
    let mobileMenuChild2 = useRef(null);
    let mobileMenuChild3 = useRef(null);
    let wylogujBtn = useRef(null);

    const handleClickKoszyk = () => {
            setKoszykBottom(true);
            props.showKoszyk(false);
    }

    const openMenu = (e) => {
        e.preventDefault();
        gsap.set([mobileMenuChild1.current, mobileMenuChild2.current, mobileMenuChild3.current], { display: "block" });
        gsap.to(mobileMenu.current, { width: "100vw", duration: .4 })
            .then(() => {
                gsap.to([mobileMenuChild1.current, mobileMenuChild2.current, mobileMenuChild3.current], { opacity: 1, duration: .4 });
            });
    }

    const closeMenu = (e) => {
        e.preventDefault();
        gsap.to([mobileMenuChild1.current, mobileMenuChild2.current, mobileMenuChild3.current], { opacity: 0, duration: .4 })
            .then(() => {
                gsap.to(mobileMenu.current, { width: 0, duration: .4 })
            })
            .then(() => {
                gsap.set([mobileMenuChild1.current, mobileMenuChild2.current, mobileMenuChild3.current], { display: "none" });
            });
    }

    const logout = e => {
        e.preventDefault();
        localStorage.removeItem('token');
        window.location = "/";
    }

    const goKontakt = () => {
        sessionStorage.setItem('hotic-kontakt', 'T');
        window.location = "/";
    }

    return (<header className="pageHeader">
        <a href="/">
            <img className="pageHeaderLogo" src={logo} alt="hotic-polska" />
        </a>
        <div className="pageHeaderRight">
            {/*Mobile menu */}
            <button className="hamburgerBtn" onClick={e => openMenu(e)}>
                <span className="hamburgerLine"></span>
                <span className="hamburgerLine"></span>
                <span className="hamburgerLine"></span>
            </button>
            <div className="mobileMenu" ref={mobileMenu}>
                <button className="exitMenu" onClick={(e) => closeMenu(e)} ref={mobileMenuChild1}>
                    <img className="exitMenuImg" src={exit} alt="exit" />
                </button>

                <div className="mobileMenuList" ref={mobileMenuChild3}>
                    <a href="https://hotic-polska.pl">
                        <img className='landingLogo mobileMenuLogo' src={logo} alt="logo" />
                    </a>
                        <ul ref={mobileMenuChild2}>
                        <li className="menuItem"><a href="/#massageGun">Massage Gun x8</a></li>
                        <li className="menuItem"><a href="/#opinie">Opinie</a></li>
                        <li className="menuItem"><a href="/o-nas">O nas</a></li>
                        <li className="menuItem" onClick={() => { goKontakt() }}>Kontakt</li>
                    </ul>
                </div>
            </div>

            {/* Desktop menu */}
            <ul className="mainMenuList">
                <li className="menuItem"><a href="/#massageGun">Massage Gun x8</a></li>
                <li className="menuItem"><a href="/#opinie">Opinie</a></li>
                <li className="menuItem"><a href="/o-nas">O nas</a></li>
                <li className="menuItem menuItemOrangeHover" onClick={() => { goKontakt() }}>Kontakt</li>
                <li className="menuItem menuItemBordered">
                    <a href="/zaloguj-zarejestruj">
                        <img className="menuUserIcon" src={userIcon} alt="zaloguj-zarejestruj" />
                        {user === "" ? "Zaloguj / Zarejestruj" : user}
                    </a>
                    <button className="pageHeaderWyloguj" onClick={e => logout(e)} ref={wylogujBtn}>
                        <img className="logoutImg" src={logoutImg} alt="wyloguj-sie" />
                        Wyloguj się
                    </button>
                </li>
            </ul>
            {<button className="koszyk pageKoszyk" onClick={() => handleClickKoszyk()}>
                <img className="koszykImg" src={koszyk} alt="koszyk" />
                <span className="koszykItems">
                    {props.ilosc > 0 ? props.ilosc : "0"}
                </span>
            </button>}
        </div>
    </header>)
}

export default PageHeader;
