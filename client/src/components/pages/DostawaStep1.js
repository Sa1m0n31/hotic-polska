import React, {useEffect, useRef, useState} from 'react'
import PageHeader from "../PageHeader";
import Footer from "../Footer";
import axios from "axios";
import {Redirect} from "react-router";
import gsap from "gsap/all";
import Loader from "react-loader-spinner";
import Toast from "../Toast";
import KoszykBottom from "../KoszykBottom";
import KoszykContext from "../../helpers/KoszykContext";

import wrocDoSklepuUtil from "../../helpers/wrocDoSklepuUtil";
import showKoszykUtil from "../../helpers/showKoszyk";

const DostawaStep1 = () => {
    let [login, setLogin] = useState("");
    let [password, setPassword] = useState("");
    let [redirection, setRedirection] = useState(false);
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState("");
    let [ilosc, setIlosc] = useState(parseInt(localStorage.getItem('ilosc')));
    let [skorka, setSkorka] = useState(parseInt(localStorage.getItem('skorka')));


    useEffect(() => {
        let token = localStorage.getItem('token');
        if(token) {
            if(localStorage.getItem('ilosc')) {
                axios.post("https://hotic-polska.pl/user/verify", {
                    token
                })
                    .then(res => {
                        if(res.data.loggedIn === 1) {
                            setRedirection(true);
                        }
                    });
            }
            else {
                window.location = "/";
            }
        }
        if(localStorage.getItem('ilosc')) {
            setIlosc(parseInt(localStorage.getItem('ilosc')));
            setSkorka(parseInt(localStorage.getItem('skorka')));
        }
    }, []);

    let toastWrapper = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        /* Walidacja formularza */
        if((login === "")||(password === "")) {
            setError("Wypełnij pola formularza");
            gsap.fromTo(toastWrapper.current, { x: "-50%", y: 100, opacity: 0 }, { x: "-50%", y: 0, opacity: 1, duration: .5 });
            setTimeout(() => {
                gsap.to(toastWrapper.current, { opacity: 0, duration: .5 });
            }, 2000);
            setLoading(false);
            return 0;
        }

        /* Wyslanie zadania do API */
        axios.post("https://hotic-polska.pl/login-user", {
            username: login,
            password: password
        })
            .then(res => {
                if(res.data.loggedIn === 1) {
                    /* Login successful */
                    localStorage.setItem("token", res.data.token);
                    window.location = "/";
                }
                else {
                    /* Login not successful */
                    setLoading(false);
                    setError("Niepoprawne dane logowania");
                        gsap.fromTo(toastWrapper.current, { x: "-50%", y: 100, opacity: 0 }, { x: "-50%", y: 0, opacity: 1, duration: .5 });
                        setTimeout(() => {
                            gsap.to(toastWrapper.current, { opacity: 0, duration: .5 });
                        }, 2000);
                }
            })
    }

    const showKoszyk = (add) => {
        showKoszykUtil();
    }

    const incrementIlosc = () => {
        setIlosc(ilosc+1);
    }

    const decrementIlosc = () => {
        setIlosc(ilosc-1);
    }

    const setIloscFromChild = (n) => {
        setIlosc(n);
    }

    const wrocDoSklepu = () => {
       wrocDoSklepuUtil();
    }

    const changeSkorka = (n) => {
        setSkorka(n);
        localStorage.setItem('skorka', n.toString());
    }

    return <>
        {redirection ? <Redirect to="/dostawa-step-2" /> :
        <div className="dostawaStep1Container">
            <PageHeader ilosc={ilosc} showKoszyk={showKoszyk} />
            <main className="dostawaStep1">
                <div className="dostawaStep1FormContainer">
                    <div className="dostawaStep1Zaloguj">
                        <h2 className="dostawaZalogujHeader">
                            Zaloguj się
                        </h2>
                        <h3 className="dostawaZalogujSubheader">
                            Wpisz dane podane przy rejestracji i przejdź dalej
                        </h3>
                        {loading ? <div className="loaderWrapper"><Loader type="grid" color="#F1602A" /></div> : <form method="POST" className="zalogujForm" onSubmit={e => handleSubmit(e)}>
                            <input className="zalogujInput" type="text" name="username" placeholder="Email"
                                   value={login}
                                   onChange={e => setLogin(e.target.value)}
                            />
                            <input className="zalogujInput" type="password" name="password" placeholder="Hasło"
                                   value={password}
                                   onChange={e => setPassword(e.target.value)}
                            />
                            <button type="submit" className="zalogujBtn hoverBtn">
                                Zaloguj się
                            </button>
                        </form>}

                        {loading ? "" : <button className="zalozKontoBtn">
                            <a href="zaloguj-zarejestruj">
                                Załóż konto
                            </a>
                        </button>}
                    </div>

                    <div className="dostawaStep1BezRejestracji">
                        <h2 className="dostawaZalogujHeader">
                            Zakupy bez rejestracji
                        </h2>
                        <h3 className="dostawaZalogujSubheader">
                            Kontynuuj jako gość
                        </h3>
                        <button className="zalogujBtn przejdzDalejBtn hoverBtn">
                            <a href="/dostawa-step-2">
                                Przejdź dalej
                            </a>
                        </button>
                    </div>
                </div>
            </main>
        </div>}
        <div className="toastWrapper" ref={toastWrapper}>
            <Toast error={error} />
        </div>
        <Footer />
        <KoszykBottom ilosc={ilosc} skorka={skorka} cena={500}
                      wroc={wrocDoSklepu} increment={incrementIlosc} decrement={decrementIlosc}
                      setIloscFromChild={setIloscFromChild} changeSkorka={changeSkorka}
                      nextStep="/dostawa-step-2" disabled={true}
        />
    </>
}

export default DostawaStep1;
