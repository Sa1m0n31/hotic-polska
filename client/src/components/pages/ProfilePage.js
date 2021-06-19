import React, {useContext, useEffect, useState} from 'react'
import PageHeader from "../PageHeader";
import Footer from "../Footer";
import axios from "axios";

import Loader from "react-loader-spinner";
import fakturaIcon from '../../static/img/add_to_queue.svg'
import checkOrange from '../../static/img/check-orange.png'
import KoszykBottom from "../KoszykBottom";
import KoszykContext from "../../helpers/KoszykContext";

import showKoszykUtil from "../../helpers/showKoszyk";
import wrocDoSklepuUtil from "../../helpers/wrocDoSklepuUtil";

const ProfilePage = () => {
    let [imie, setImie] = useState("");
    let [nazwisko, setNazwisko] = useState("");
    let [telefon, setTelefon] = useState("");
    let [mail, setMail] = useState("");
    let [ulica, setUlica] = useState("");
    let [budynek, setBudynek] = useState("");
    let [mieszkanie, setMieszkanie] = useState("");
    let [miasto, setMiasto] = useState("");
    let [kod, setKod] = useState("");
    let [loaded, setLoaded] = useState(false);
    let [zmienDane, setZmienDane] = useState(false);
    let [faktura, setFaktura] = useState(false);
    let [firma, setFirma] = useState("");
    let [nip, setNip] = useState("");
    let [ulicaF, setUlicaF] = useState("");
    let [budynekF, setBudynekF] = useState("");
    let [mieszkanieF, setMieszkanieF] = useState("");
    let [kodF, setKodF] = useState("");
    let [miastoF, setMiastoF] = useState("");
    let [updated, setUpdated] = useState(false);
    let [redirect, setRedirect] = useState(false);

    let myContext = useContext(KoszykContext);
    let [ilosc, setIlosc] = useState(myContext.ilosc);
    let [skorka, setSkorka] = useState(myContext.skorka);

    const incrementIlosc = () => {
        setIlosc(ilosc+1);
    }

    const decrementIlosc = () => {
        setIlosc(ilosc-1);
    }

    const setIloscFromChild = (n) => {
        setIlosc(n);
    }

    const changeSkorka = (n) => {
        setSkorka(n);
        localStorage.setItem('skorka', n.toString());
    }

    const showKoszyk = async (add = true, skorkaFirst = 1) => {
        showKoszykUtil();
    }

    const wrocDoSklepu = () => {
        wrocDoSklepuUtil();
    }

    useEffect(() => {
        /* Sprawdzenie czy uzytkownik zalogowany */
        let token = localStorage.getItem('token');
        if(token) {
            axios.post("https://hotic-polska.pl/user/verify", {
                token
            })
                .then((res) => {
                    if(res.data.loggedIn !== 1) {
                        window.location = "/";
                    }
                    else {
                        axios.post("https://hotic-polska.pl/get-user", {
                                token: localStorage.getItem('token')
                        })
                            .then(res => {
                                let faktura = res.data.faktura;
                                if(faktura) {
                                    /* User has faktura data */
                                    setFirma(faktura.firma);
                                    setNip(faktura.nip);
                                    setUlicaF(faktura.ulica);
                                    setBudynekF(faktura.budynek);
                                    setMieszkanieF(faktura.mieszkanie);
                                    setKodF(faktura.kod);
                                    setMiastoF(faktura.miasto);
                                }
                                /* Personal data */
                                setImie(res.data.imie);
                                setNazwisko(res.data.nazwisko);
                                setTelefon(res.data.telefon);
                                setMail(res.data.email);
                                setUlica(res.data.ulica);
                                setBudynek(res.data.budynek);
                                setMieszkanie(res.data.mieszkanie);
                                setKod(res.data.kod);
                                setMiasto(res.data.miasto);
                                setLoaded(true);
                            });
                    }
                })
        }
        else {
            window.location = "/";
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = "/";
    }

    const handleSubmit = e => {
        e.preventDefault();

        setUpdated(true);
        setTimeout(() => {
            setUpdated(false);
        }, 3000);

        if(faktura) {
            axios.post("https://hotic-polska.pl/faktura", {
                mail,
                firma,
                nip,
                ulica: ulicaF,
                budynek: budynekF,
                mieszkanie: mieszkanieF,
                kod: kodF,
                miasto: miastoF
            })
                .then(res => {
                    setUpdated(true);
                })
        }
        if(zmienDane) {
            axios.post("https://hotic-polska.pl/update-user", {
                imie,
                nazwisko,
                telefon,
                mail,
                ulica,
                budynek,
                mieszkanie,
                kod,
                miasto
            })
                .then(res => {
                    console.log(res);
                    setUpdated(true);
                })
        }
    }

    return <>
        <div className="dostawaStep1Container">
            <PageHeader ilosc={ilosc} showKoszyk={showKoszyk} />
            <div className="profile">
                {updated ? <div className="updateOrangeWrapper"><img className="updatedOrange" src={checkOrange} alt="ok" /></div> : "" }
                {!loaded ? <div className="loaderWrapper loaderCenter"><Loader type="grid" color="#F1602A" /></div> : <>
                    <div className="profileRow">
                        <h2 className="profileHeader1">
                            Twoje konto
                        </h2>
                        <button className="profileBtn" onClick={() => { setZmienDane(!zmienDane) }}>
                            {!zmienDane ? "Zmień dane" : "Porzuć zmiany"}
                        </button>
                        <button className="profileBtn" onClick={() => logout()}>
                            Wyloguj się
                        </button>
                    </div>
                    <h2 className="profileHeader1 marginTopBtn">
                        Dane kupującego
                    </h2>
                    {!zmienDane ? <>
                    <div className="profileRow profileRowFlex">
                       <h3 className="profileDane">
                            {imie} {nazwisko}
                        </h3>
                           <h3 className="profileDane">
                                {telefon}
                            </h3>
                           <h3 className="profileDane">
                                {mail}
                            </h3>
                    </div>
                    <h2 className="profileHeader1 marginTopBtn">
                        Adres
                    </h2>
                    <div className="profileRow profileRowFlex profileRowNarrow">
                       <h3 className="profileDane">
                            {mieszkanie === "" ? ulica + " " + budynek : ulica + " " + budynek + "/" + mieszkanie}
                        </h3>
                        <h3 className="profileDane">
                            {kod} {miasto}
                        </h3>
                    </div>
                        </> : <>
                    <label>
                        <input className="zalogujInput" type="text" name="imie"
                               value={imie}
                               onChange={e => { setImie(e.target.value) }}
                               placeholder="Imię"
                        />
                    </label>
                    <label>
                        <input className="zalogujInput" type="text" name="nazwisko"
                               value={nazwisko}
                               onChange={e => { setNazwisko(e.target.value) }}
                               placeholder="Nazwisko"
                        />
                    </label>
                    <label>
                        <input className="zalogujInput" type="text" name="telefon"
                               value={telefon}
                               onChange={e => { setTelefon(e.target.value) }}
                               placeholder="Nr telefonu"
                        />
                    </label>
                    <label>
                        <input className="zalogujInput" type="email" name="email"
                               value={mail}
                               onChange={e => { setMail(e.target.value) }}
                               placeholder="Adres email"
                               disabled={true}
                        />
                    </label>
                    <div className="formOneLine">
                        <label className="ulicaLabel">
                            <input className="zalogujInput inputUlica" type="text" name="ulica"
                                   value={ulica}
                                   onChange={e => { setUlica(e.target.value) }}
                                   placeholder="Ulica"
                            />
                        </label>
                        <label className="budynekLabel">
                            <input className="zalogujInput inputBudynek" type="text" name="budynek"
                                   value={budynek}
                                   onChange={e => { setBudynek(e.target.value) }}
                                   placeholder="Budynek"
                            />
                        </label>
                        <label className="mieszkanieLabel">
                            <input className="zalogujInput inputMieszkanie" type="text" name="mieszkanie"
                                   value={mieszkanie}
                                   onChange={e => {setMieszkanie(e.target.value)}}
                                   placeholder="Mieszkanie"
                            />
                        </label>
                    </div>
                    <div className="formOneLine">
                        <label>
                            <input className="zalogujInput inputKodPocztowy" type="text" name="kod"
                                   value={kod}
                                   onChange={e => {setKod(e.target.value)}}
                                   placeholder="Kod pocztowy"
                            />
                        </label>
                        <label>
                            <input className="zalogujInput inputMiasto" type="text" name="miasto"
                                   value={miasto}
                                   onChange={e => { setMiasto(e.target.value) }}
                                   placeholder="Miasto"
                            />
                        </label>
                    </div>
                        </>}

                    <h2 className="profileHeader1 marginTopBtn">
                        Dane do faktury
                    </h2>
                    <div className="profileRow">
                        <button className="profileBtn profileFakturaBtn" onClick={() => { setFaktura(!faktura) }}>
                            {!faktura ? "Potrzebujesz faktury VAT? Dodaj dane" : "Porzuć zmiany"}
                            <img className="fakturaBtnIcon" src={fakturaIcon} alt="dodaj-dane" />
                        </button>
                    </div>
                    {faktura ? <div className="fakturaVAT">
                        <label>
                            Nazwa firmy
                            <input className="zalogujInput inputFirma" type="text" name="firma"
                                   value={firma}
                                   onChange={e => { setFirma(e.target.value) }}
                            />
                        </label>
                        <label>
                            NIP
                            <input className="zalogujInput inputNIP" type="text" name="nip"
                                   value={nip}
                                   onChange={e => { setNip(e.target.value) }}
                            />
                        </label>
                        <div className="formOneLine">
                            <label className="ulicaLabel">
                                Ulica
                                <input className="zalogujInput inputUlica" type="text" name="ulicaF"
                                       value={ulicaF}
                                       onChange={e => { setUlicaF(e.target.value) }}
                                />
                            </label>
                            <label className="budynekLabel">
                                Nr budynku
                                <input className="zalogujInput inputBudynek" type="text" name="budynekF"
                                       value={budynekF}
                                       onChange={e => { setBudynekF(e.target.value) }}
                                />
                            </label>
                            <label className="mieszkanieLabel">
                                Nr mieszkania
                                <input className="zalogujInput inputMieszkanie" type="text" name="mieszkanieF"
                                       value={mieszkanieF}
                                       onChange={e => { setMieszkanieF(e.target.value) }}
                                />
                            </label>
                        </div>
                        <div className="formOneLine">
                            <label>
                                Kod pocztowy
                                <input className="zalogujInput inputKodPocztowy" type="text" name="kodF"
                                       value={kodF}
                                       onChange={e => { setKodF(e.target.value) }}
                                />
                            </label>
                            <label>
                                Miasto
                                <input className="zalogujInput inputMiasto" type="text" name="miastoF"
                                       value={miastoF}
                                       onChange={e => { setMiastoF(e.target.value) }}
                                />
                            </label>
                        </div>
                    </div> : ""}
                    {zmienDane || faktura ? <button className="zmienDaneSubmitBtn" onClick={(e) => handleSubmit(e)}>
                        Zapisz
                    </button> : ""}
                </>}
            </div>
        </div>
        <Footer />
        <KoszykBottom ilosc={ilosc} skorka={skorka} cena={500}
                      wroc={wrocDoSklepu} increment={incrementIlosc} decrement={decrementIlosc}
                      setIloscFromChild={setIloscFromChild} changeSkorka={changeSkorka}
                      nextStep="/dostawa-step-1" disabled={true}
        />

    </>
}

export default ProfilePage;
