import React, {useContext, useState} from 'react'
import PageHeader from "../PageHeader";
import Footer from "../Footer";
import location from "../../static/img/location.svg";
import KoszykContext from "../../helpers/KoszykContext";
import showKoszykUtil from "../../helpers/showKoszyk";
import wrocDoSklepuUtil from "../../helpers/wrocDoSklepuUtil";
import KoszykBottom from "../KoszykBottom";

const Page404 = () => {
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
                <main className="politykaPrywatnosciMain page404">
                    <h1 className="politykaPrywatnosciHeader">
                        Upss... Nie udało się znaleźć podanej ścieżki
                    </h1>

                    <button className="wybierzPaczkomatBtn hoverBtn">
                        <a href="/">
                            Wróć do strony głównej
                        </a>
                    </button>
                </main>
            </div>
        <KoszykBottom ilosc={ilosc} skorka={skorka} cena={500}
                      wroc={wrocDoSklepu}
                      disabled={true}
        />
            <Footer />
    </>
}

export default Page404;
