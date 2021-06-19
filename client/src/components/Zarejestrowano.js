import React, { useEffect } from 'react'
import { Redirect } from "react-router";
import PageHeader from "./PageHeader";
import Footer from "./Footer";

const Zarejestrowano = () => {
    useEffect(() => {
        sessionStorage.removeItem('hotic-zarejestrowano');
    }, []);

    return sessionStorage.getItem("hotic-zarejestrowano") === 'T' ? <>
        <div className="dostawaStep1Container">
            <PageHeader />
            <main className="dostawaStep1 komunikatContainer">
                <h1 className="komunikat">
                    Twoje konto zostało pomyślnie zarejestrowane!<br/>Cieszymy się, że jesteś z nami! :)
                </h1>
                <button className="hoverBtn innowacyjnaPomocBtn">
                    <a href="/zaloguj-zarejestruj">
                        Zaloguj się
                    </a>
                </button>
                <button className="hoverBtn innowacyjnaPomocBtn marginTopBtn">
                    <a href="/kup-teraz">
                        Przejdź do sklepu
                    </a>
                </button>
            </main>
        </div>
        <Footer />
    </> : <Redirect to="/" />
}

export default Zarejestrowano;
