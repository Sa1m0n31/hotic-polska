import React from 'react'

import exit from '../static/img/x.png'
import phone from '../static/img/phone.svg'
import mail from '../static/img/envelope.png'

const KontaktModal = ({setModal}) => {
    return <>
        <div className="kontaktModal">
            <button className="kontaktModalExit" onClick={() => { setModal(false); }}>
                <img src={exit} alt="exit" />
            </button>
            <div className="kontaktModalTelefony">
                <div className="modalRow">
                    <img className="kontaktModalIcon" src={phone} alt="telefon" />
                    <h2>Ania</h2>
                </div>
                <h3><a href="tel:+48509617919">509 617 919</a></h3>
                <div className="modalRow">
                    <img className="kontaktModalIcon" src={phone} alt="telefon" />
                    <h2>Krzysiek</h2>
                </div>
                <h3><a href="tel:+48691087755">691 087 755</a></h3>
            </div>

            <div className="kontaktModalAdres">
                <h2 className="kontaktModalAdresEmail">
                <span className="block">
                    <img className="kontaktModalEnvelope" src={mail} alt="adres-email" /> Adres email
                </span>
                    <a href="mailto:info@hotic-polska.pl">info@hotic-polska.pl</a>
                </h2>

                <div className="kontaktModalAdresInner">
                    <h2>Kulaszne 56</h2>
                    <h2>38-542 Rzepedź</h2>
                </div>
            </div>
        </div>
        <div className="kontaktModalMobile">
            <button className="kontaktModalExit" onClick={() => { setModal(false); }}>
                <img src={exit} alt="exit" />
            </button>
            <div className="kontaktModalTelefony">
                <div className="modalRow">
                    <img className="kontaktModalIcon" src={phone} alt="telefon" />
                    <h2>Ania</h2>
                </div>
                <h3><a href="tel:+48509617919">509 617 919</a></h3>
                <div className="modalRow">
                    <img className="kontaktModalIcon" src={phone} alt="telefon" />
                    <h2>Krzysiek</h2>
                </div>
                <h3><a href="tel:+48691087755">691 087 755</a></h3>
            </div>

            <div className="kontaktModalAdres">
                <h2 className="kontaktModalAdresEmail">
                <span className="block">
                    <img className="kontaktModalEnvelope" src={mail} alt="adres-email" /> Adres email
                </span>
                    <a href="mailto:info@hotic-polska.pl">info@hotic-polska.pl</a>
                </h2>

                <div className="kontaktModalAdresInner">
                    <h2>Kulaszne 56</h2>
                    <h2>38-542 Rzepedź</h2>
                </div>
            </div>
        </div>
        </>

}

export default KontaktModal;

// EMAIL: info@hotic-polska.pl
