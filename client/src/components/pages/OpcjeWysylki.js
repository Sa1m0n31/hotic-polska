import React, {useContext, useState} from 'react'
import PageHeader from "../PageHeader";
import checked from "../../static/img/checked.svg";
import Footer from "../Footer";
import KoszykBottom from "../KoszykBottom";
import KoszykContext from "../../helpers/KoszykContext";
import showKoszykUtil from "../../helpers/showKoszyk";
import wrocDoSklepuUtil from "../../helpers/wrocDoSklepuUtil";

const OpcjeWysylki = () => {
    /* Domyslnie dane o ilosci i skorce pobierane z kontekstu (0, 1) */
    let myContext = useContext(KoszykContext);
    let [ilosc, setIlosc] = useState(myContext.ilosc);
    let [skorka, setSkorka] = useState(myContext.skorka);

    const showKoszyk = () => {
        showKoszykUtil();
    }

    const wrocDoSklepu = () => {
        wrocDoSklepuUtil();
    }

    return <>
        <div className="dostawaStep1Container">
            <PageHeader ilosc={ilosc} showKoszyk={showKoszyk} />
            <main className="politykaPrywatnosciMain">
                <h1 className="politykaPrywatnosciHeader">
                    Opcje wysyłki
                </h1>
                <h2>
                    Dostawa
</h2>
                <p>
                    Dostawa Produktów jest ograniczona tylko i wyłącznie do obszaru Rzeczpospolitej Polskiej i odbywa się pod adresem wskazanym przez Klienta podczas składania Zamówienia.
                    Dostawa zamówionych Produktów jest realizowana za pośrednictwem:  firm kurierskich: InPost (kurier, paczkomat), DPD oraz DHL. Sprzedawca dopuszcza możliwość odbioru osobistego Produktu zamówionego w Sklepie Internetowym.
                    Waga jednej przesyłki może wynosić maksymalnie 5 kg. Każda kolejna nadana przesyłka wiąże się z dodatkowymi kosztami (tak jak za nową przesyłkę) zgodnie z obowiązującym cennikiem.
                    Termin realizacji Dostawy jest liczony od momentu wydania paczki Dostawcy przez Sprzedawcę celem doręczenia jej Klientowi na adres wskazany przez niego podczas składania Zamówienia i wynosi: od 1 do 5 dni roboczych. Z przyczyn niezależnych od Sprzedawcy, leżących po stronie Dostawcy, czas Dostawy może się wydłużyć.
                </p>

                    <h2>Koszt wysyłki kurierem:
</h2>
                <p>
                    InPost przedpłata: 0 zł<br/>
                    Paczkomat InPost: 0zł<br/>
                    InPost pobranie: 15,35 zł<br/>
                    DPD: 15,93 zł<br/>
                    DPD pobranie: 19,50 zł<br/>
                    DHL: 18,31 zł<br/>
                    DHL pobranie: 21,39 zł<br/>
                </p>
            </main>
        </div>
        <KoszykBottom ilosc={ilosc} skorka={skorka} cena={500}
                      wroc={wrocDoSklepu}
                      disabled={true}
        />
        <Footer />
    </>
}

export default OpcjeWysylki;
