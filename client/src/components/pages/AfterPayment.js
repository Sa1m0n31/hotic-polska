import React, {useEffect} from 'react'
import PageHeader from "../PageHeader";
import Footer from "../Footer";

import checked from '../../static/img/checked.svg'

const AfterPayment = () => {
    useEffect(() => {
       if(localStorage.getItem('oplacono')) {
           localStorage.removeItem('oplacono');
       }
       else {
           window.location.href = "/";
       }
    }, []);

    return <>
        <div className="dostawaStep1Container">
            <PageHeader ilosc={0} />
            <main className="afterPaymentMain">
                <img className="greenChecked" src={checked} alt="potwierdzenie-platnosci" />
                <h1 className="afterPaymentH1">
                    Dziękujemy za dokonanie zakupu
                </h1>
                <h2 className="afterPaymentH2">
                    Twoje zamówienie zostało przyjęte do realizacji. W razie jakichkolwiek pytań, zachęcamy do kontaktu.
                </h2>

                <div className="afterPaymentContact">
                    <div className="afterPaymentBlock">
                        <h3 className="afterPaymentContactName">
                            Ania
                        </h3>
                        <a className="afterPaymentContactBtn hoverBtn" href="tel:+48509617919">
                            509 617 919
                        </a>
                    </div>

                    <div className="afterPaymentBlock">
                        <h3 className="afterPaymentContactName">
                            Adres email
                        </h3>
                        <a className="afterPaymentContactBtn hoverBtn" href="mailto:info@hotic-polska.pl">
                            info@hotic-polska.pl
                        </a>
                    </div>

                    <div className="afterPaymentBlock">
                        <h3 className="afterPaymentContactName">
                            Krzysiek
                        </h3>
                        <a className="afterPaymentContactBtn hoverBtn" href="tel:+48691087755">
                            691 087 755
                        </a>
                    </div>
                </div>

                <div className="afterPaymentContact afterPaymentContactCenter">
                </div>
            </main>
        </div>
        <Footer />
    </>
}

export default AfterPayment;
