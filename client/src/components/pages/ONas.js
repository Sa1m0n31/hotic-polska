import React, {useContext, useState} from 'react'
import PageHeader from "../PageHeader";
import Footer from "../Footer";
import KoszykContext from "../../helpers/KoszykContext";
import showKoszykUtil from "../../helpers/showKoszyk";
import wrocDoSklepuUtil from "../../helpers/wrocDoSklepuUtil";
import KoszykBottom from "../KoszykBottom";

const ONasPage = () => {
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
                    O nas
                </h1>

<p>
    Witaj w Naszym Sklepie internetowym HOTIC-POLSKA!<br/>
                   Na rynku istniejemy od niedawna, jest to więc dla nas wielkie wyzwanie, aby sprostać Twoim oczekiwaniom. Twoje zadowolenie jest dla nas najważniejsze, bo to dzięki Tobie możemy istnieć. Dlatego możesz mieć pewność, że dołożymy wszelkich starań, aby realizacja zamówienia była na najwyższym poziomie.
</p>
                <p>
                   Jako właściciele podpisujemy się swoim nazwiskiem pod Twoim zamówieniem, więc możesz być spokojny, że realizacja Twojego zamówienia jest dla nas bardzo ważna.
</p>
                <p>
                   Dodatkowo każdy przedmiot przed wysłaniem dokładnie sprawdzamy.
</p>
                <p>
                   Jeżeli będziesz mieć jakiekolwiek pytania lub wątpliwości, dzwoń śmiało! Przez cały dzień odpisujemy na wiadomości, odbieramy telefony i oddzwaniamy do klientów.
</p>

                   <h3>Pozdrawiamy,<br/>
                   Ania i Krzysiek Knap<br/>
                       HOTIC-POLSKA</h3>
            </main>
        </div>
        <KoszykBottom ilosc={ilosc} skorka={skorka} cena={500}
                      wroc={wrocDoSklepu}
                      disabled={true}
        />
        <Footer />
    </>
}

export default ONasPage;
