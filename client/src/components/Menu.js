import React, {useState, useEffect, useRef, useContext} from 'react';

import userIcon from '../static/img/user_circle.svg';
import phone from '../static/img/phone.svg';
import koszyk from '../static/img/koszyk.svg';
import axios from "axios";
import logoutImg from "../static/img/logout.png";
import KoszykContext from "../helpers/KoszykContext";

const Menu = ({modal, setModal}) => {

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

    let wylogujBtn = useRef(null);

    useEffect(() => {
        if(user !== '') {
            wylogujBtn.current.style.display = "flex";
        }
        else {
            wylogujBtn.current.style.display = "none";
        }
    }, [user]);

    const logout = e => {
        e.preventDefault();
        localStorage.removeItem('token');
        window.location = "/";
    }

    const goTo = (n) => {
        let el;
        switch(n) {
            case 1:
               el = document.querySelector("#massageGun");
               break;
            case 2:
                el = document.querySelector("#opinie");
                break;
            default:
                el = document.querySelector("#oNas");
                break;
        }
        el.scrollIntoView({
            top: 0,
            behavior: "smooth"
        });
    }

    const showKoszyk = () => {
        sessionStorage.setItem("showKoszyk", "T");
        window.location.href = "/kup-teraz";
    }

    return <menu className="mainMenu">
        <div className="overMainMenu">
            <h2 className="overMainMenuText">
                Masz pytania? <span className="bold">Zadzwoń!</span>
            </h2>
            <button className="overMainMenuBtn hoverBtn">
                <a href="tel:+48509617919">
                    <img className="phoneIcon" src={phone} alt="telefon" />
                    509 617 919
                </a>
            </button>

            <button className="koszyk" onClick={() => showKoszyk()}>
                <img className="koszykImg" src={koszyk} alt="koszyk" />
                <span className="koszykItems">
                    {!isNaN(localStorage.getItem('ilosc')) && localStorage.getItem('ilosc') ? localStorage.getItem('ilosc') : '0'}
                </span>
            </button>
        </div>
        <ul className="mainMenuList">
            <li className="menuItem" onClick={() => goTo(1)}>Massage Gun x8</li>
            <li className="menuItem" onClick={() => goTo(2)}>Opinie</li>
            <li className="menuItem"><a href="/o-nas">O nas</a></li>
            <li className="menuItem" onClick={() => { setModal(!modal); }}>Kontakt</li>
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
    </menu>
}

export default Menu;
