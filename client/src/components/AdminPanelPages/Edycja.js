import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import Loader from "react-loader-spinner";
import userOrange from "../../static/img/admin_orange.svg";
import logo from "../../static/img/logo.png";
import Toast from "../Toast";
import gsap from "gsap/all";

const Edycja = ({username}) => {
    let [nazwa, setNazwa] = useState("");
    let [opis, setOpis] = useState("");
    let [cena, setCena] = useState(500);
    let [loaded, setLoaded] = useState(false);
    let [error, setError] = useState("");
    let [green, setGreen] = useState(false);

    let toastWrapper = useRef(null);

    useEffect(() => {
        axios.get("https://hotic-polska.pl/product-data")
            .then(res => {
               setNazwa(res.data.productData[0].nazwa);
               setOpis(res.data.productData[0].opis);
               setCena(res.data.productData[0].cena);
               setLoaded(true);
            });
    }, []);

    const changeProduct = async () => {
        if(isNaN(cena)) {
            await setError("Cena powinna być liczbą");
            await toastCallback();
            return 0;
        }
        if(nazwa.length < 3) {
            await setError("Za krótka nazwa");
            await toastCallback();
            return 0;
        }

        axios.post("https://hotic-polska.pl/edit-product", {
            price: cena,
            name: nazwa
        })
            .then(async (res) => {
                if(res.data.success) {
                    await setGreen(true);
                    await setError("Zmiany zostały wprowadzone");
                    await toastCallback();
                }
            });
    }

    const toastCallback = () => {
        gsap.fromTo(toastWrapper.current, { x: "-50%", y: 100, opacity: 0 }, { x: "-50%", y: 0, opacity: 1, duration: .5 });
        setTimeout(() => {
            gsap.to(toastWrapper.current, { opacity: 0, duration: .5 });
        }, 2000);
        setTimeout(() => {
            setGreen(false);
        }, 2500);
    }

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
                    Edycja produktu
                </h2>

                <h3 className="adminLoginZalogowanyJako">
                    <img className="adminLoginZalogowanyJakoImg" src={userOrange} alt="admin" />
                    {window.innerWidth > 600 ? "Zalogowany jako" : ""} <b> {username}</b>
                </h3>
            </div>
            <div className="adminLoginHeaderBottom">
                <button className="adminProduktBtn" onClick={() => changeProduct()}>
                    Zapisz
                </button>

                <img className="logoTop" src={logo} alt="hotic-polska" />

            </div>
        </header>
        <main className="adminPanelMain">
        {loaded ? <>
        <div className="edycjaSection">
            <h2 className="edycjaSectionTitle">
                Nazwa produktu
            </h2>
            <input className="edycjaNazwaProduktu" type="text" value={nazwa} onChange={(e) => setNazwa(e.target.value)} />
        </div>
        <div className="edycjaSection">
            <h2 className="edycjaSectionTitle">
                Cena
            </h2>
            <input className="edycjaNazwaProduktu" type="number" value={cena} onChange={(e) => setCena(e.target.value)} />
        </div>
            </> : <div className="loaderCenter"><Loader type="grid" color="#F1602A" /></div>}
        </main>
        <div className="toastWrapper" ref={toastWrapper}>
            <Toast error={error} green={green} />
        </div>
    </>
}

export default Edycja;
