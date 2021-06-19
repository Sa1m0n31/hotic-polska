import React, {useEffect, useState} from 'react'
import checkImg from "../../static/img/check.svg";
import more from "../../static/img/circle_right.svg";
import Loader from "react-loader-spinner";
import axios from "axios";
import userOrange from "../../static/img/admin_orange.svg";
import logo from "../../static/img/logo.png";

const Klienci = ({username}) => {
    let [getKlienci, setGetKlienci] = useState(false);
    let [klienci, setKlienci] = useState([]);

    useEffect(() => {
        /* Get all orders */
        axios.get("https://hotic-polska.pl/users")
            .then(async res => {
                setKlienci(res.data.users);
                setGetKlienci(true);
            });
    }, []);

    const openMobileMenu = () => {
        if(typeof document !== 'undefined') {
            document.querySelector(".adminMenu").style.transform = "scaleX(1)";
        }
    }

    return <>
        <header className="adminLoginHeader">
            <div className="adminLoginHeaderTop">
                <button className="hamburgerBtn hamburgerAdmin" onClick={() => openMobileMenu()}>
                    <span className="hamburgerLine"></span>
                    <span className="hamburgerLine"></span>
                    <span className="hamburgerLine"></span>
                </button>

                <h2 className="adminLoginHeaderTitle">
                    Klienci
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
        <main className="adminPanelMain adminPanelKlienci">
        {getKlienci ?
            <div className="zamowieniaTable zamowieniaKlienci">
                <div className="zamowieniaTableHeader">
                    <h3 className="zamowieniaTableHeaderH zamowieniaTable600">
                        Nr klienta
                    </h3>
                    <h3 className="zamowieniaTableHeaderH">
                        Adres email
                    </h3>
                    <h3 className="zamowieniaTableHeaderH">
                        Telefon
                    </h3>
                    <h3 className="zamowieniaTableHeaderH zamowieniaTable500">
                        Imię
                    </h3>
                    <h3 className="zamowieniaTableHeaderH zamowieniaTable500">
                        Nazwisko
                    </h3>
                    <h3 className="zamowieniaTableHeaderH zamowieniaTable1500">
                        Data dołączenia
                    </h3>
                </div>

                {klienci.map((item, i) => {
                       return (
                        <div className="zamowieniaTableRow" key={i}>
                            <h3 className="zamowieniaTableHeaderH zamowieniaTable600">
                                {i+1}
                            </h3>
                            <h3 className="zamowieniaTableHeaderH">
                                {item.username}
                            </h3>
                            <h3 className="zamowieniaTableHeaderH">
                                {item.telefon}
                            </h3>
                            <h3 className="zamowieniaTableHeaderH zamowieniaTable500">
                                {item.imie}
                            </h3>
                            <h3 className="zamowieniaTableHeaderH zamowieniaTable500">
                                {item.nazwisko}
                            </h3>
                            <h3 className="zamowieniaTableHeaderH zamowieniaTable1500">
                                {item.data_zalozenia_konta}
                            </h3>
                        </div>
                    )
                })}

            </div> : <div className="loaderCenter"><Loader type="grid" color="#F1602A" /></div>}
        </main>
    </>
}

export default Klienci;
