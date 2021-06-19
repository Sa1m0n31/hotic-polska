import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import skorka1 from "../static/img/skorka-1.jpg";
import skorka2 from "../static/img/skorka-2.jpg";
import arrow from "../static/img/up.svg";
import longArrow from "../static/img/long_right.svg";

const Koszyk = React.forwardRef(({skorka, ilosc, cena, koszykOpen, wrocDoSklepu}, ref) => {
    let [iloscState, setIloscState] = useState(ilosc);

    return (<div className={koszykOpen ? "bottomKoszyk" : "dNone"} ref={ref}>
        <h2 className="bottomKoszykHeader">
            Twój koszyk
        </h2>
        <div className="bottomKoszykMain">
            <img className="pistoletKosz" src={skorka === 1 ? skorka1 : skorka2} alt="pistolet" />
            <div className="bottomKoszykMainOpis">
                <h3>MASSAGE GUN - PISTOLET MASUJĄCY</h3>
                <h4>Skórka: {skorka}</h4>
            </div>
            <div className="pistoletIlosc">
                <div>
                    <h5 className="pistoletIloscHeader">Ilość</h5>
                    <input className="pistoletIloscInput" type="number" value={iloscState} min={1} onChange={(e) => { setIloscState(parseInt(e.target.value)) }} />
                </div>
                <div className="pistoletArrows">
                    <button onClick={() => { setIloscState(ilosc+1) }}>
                        <img src={arrow} alt="up" />
                    </button>
                    <button onClick={() => { if(ilosc > 1) setIloscState(ilosc-1) }}>
                        <img src={arrow} alt="down" />
                    </button>
                </div>
            </div>
            <div className="pistoletCena">
                <h4>Cena</h4>
                <h5>500 zł</h5>
            </div>
        </div>
        <div className="podsumowanieZakupow">
            <h4>Podsumowanie zakupów</h4>
            <h5>{cena * ilosc} zł</h5>
        </div>
        <div className="bottomKoszykButtons">
            <button className="bottomKoszykBack" onClick={() => wrocDoSklepu()}>
                Wróć do sklepu
            </button>

            <button className="innowacyjnaPomocBtn bottomKoszykZamawiam">
                <a href="/dostawa-step-1">
                    Zamawiam i płacę
                    <img className="longArrow" src={longArrow} alt="strzalka" />
                </a>
            </button>
        </div>

    </div>)
});

export default Koszyk;
