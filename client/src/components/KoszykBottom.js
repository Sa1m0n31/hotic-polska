import React, {useState, useEffect, useContext} from 'react'
import skorka1 from "../static/img/skorka-1.jpg";
import skorka2 from "../static/img/skorka-2.jpg";
import arrow from "../static/img/up.svg";
import longArrow from "../static/img/long_right.svg";

import KoszykContext from "../helpers/KoszykContext";
import axios from "axios";

const KoszykBottom = ({ilosc, skorka, cena, wroc, increment, decrement, setIloscFromChild, changeSkorka, nextStep, disabled}) => {
    let [cenaState, setCenaState] = useState(cena);
    let [nazwaState, setNazwaState] = useState("Massage Gun");

    useEffect(() => {
        localStorage.setItem('ilosc', ilosc);

        if((ilosc <= 0)||(isNaN(ilosc))) {
            document.querySelectorAll(".koszykEmpty>*").forEach(item => {
                item.style.opacity = "1";
            });
        }

        /* Get product data */
        axios.get("https://hotic-polska.pl/product-data")
            .then((res) => {
                if(res.data.productData) {
                    setCenaState(res.data.productData[0].cena)
                    setNazwaState(res.data.productData[0].nazwa);
                }
            });
    });

    const wrocDoSklepu = () => {
        wroc();
    }

    const handleChange = async (add) => {
        if(add === false) {
            // Wywolanie metody od rodzica zwiekszajacej ilosc w rodzicu
            await increment();
        }
        else if(add === true) {
            // Wywolanie metody od rodzica zmniejszajacej ilosc w rodzicu
            await decrement();
        }
        else {
            if(isNaN(add.target.value)) await setIloscFromChild(1);
            else await setIloscFromChild(parseInt(add.target.value));
        }
    }

    return <>
        {/* Desktop koszyk */}
        {ilosc > 0 ? <div className="bottomKoszyk">
            <span className="bottomKoszykOverlay"></span>
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
                    {disabled ? <div className="pistoletIloscColumn">
                        <h5 className="pistoletIloscHeader">Ilość</h5>
                        <h4 className="pistoletIloscIlosc">{ilosc}</h4>
                    </div> : <><div>
                        <h5 className="pistoletIloscHeader">Ilość</h5>
                        <input className="pistoletIloscInput" type="number" value={ilosc} min={1} onChange={(e) => { handleChange(e) }} />
                    </div>
                        <div className="pistoletArrows">
                            <button onClick={() => { handleChange(false) }}>
                                <img src={arrow} alt="up" />
                            </button>
                            <button onClick={() => { if(ilosc > 1) handleChange(true) }}>
                                <img src={arrow} alt="down" />
                            </button>
                        </div></>}
                </div>
                <div className="pistoletCena">
                    <h4>Cena</h4>
                    <h5>{cenaState} zł</h5>
                </div>
            </div>
            <div className="podsumowanieZakupow">
                <h4>Podsumowanie zakupów</h4>
                <h5>{cenaState * ilosc} zł</h5>
            </div>
            <div className="bottomKoszykButtons" id={disabled ? "flexCenter" : ""}>
                <button className="bottomKoszykBack" onClick={() => wrocDoSklepu()}>
                    Wróć do sklepu
                </button>

                {!disabled ? <button className="innowacyjnaPomocBtn bottomKoszykZamawiam hoverBtn" >
                    <a href={nextStep}>
                        Zamawiam i płacę
                        <img className="longArrow" src={longArrow} alt="strzalka" />
                    </a>
                </button> : ""}
            </div>
        </div> : <div className="bottomKoszyk koszykEmpty">
            <span className="bottomKoszykOverlay"></span>
            <h3 className="koszykEmptyHeader">Twój koszyk jest pusty</h3>
            <button className="innowacyjnaPomocBtn bottomKoszykZamawiam hoverBtn" onClick={() => { wrocDoSklepu() }}>
                    Wróć do sklepu
            </button>
        </div> }

        {/* Mobile koszyk */}
        <div className="bottomKoszykMobileWrapper">
            <div className="bottomKoszykMobile">
                <div className="dostawaKoszyk">
                    <h2 className="dostawaSposobDostawyHeader">
                        Twój koszyk
                    </h2>

                    <div className="dostawaKoszykInner">
                        <div className="dostawaKoszykInnerFirstRow">
                            <img className="dostawaKoszykInnerImg" src={skorka === 1 ? skorka1 : skorka2} alt="pistolet" />
                            <div className="dostawaKoszykInnerFirstRowInfo">
                                <h3 className="margin-10">{nazwaState}</h3>
                                <h5>{cenaState} PLN</h5>
                            </div>
                        </div>
                        <div className="pistoletIlosc pistoletIloscMobile">
                            <div className="extraWidth">
                                <div>
                                    <h5 className="pistoletIloscHeader">Ilość</h5>
                                    {!disabled ? <input className="pistoletIloscInput" type="number" value={ilosc} min={1} onChange={(e) => { setIloscFromChild(parseInt(e.target.value)) }} />
                                     : <h4 className="pistoletIloscIlosc pistoletIloscIloscMobile">{ilosc}</h4> }
                                </div>
                            </div>
                            <div>
                                <h5 className="pistoletIloscHeader">
                                    Skórka
                                </h5>
                                <button className={skorka === 1 ? "skorkaBtn skorkaBtnActive" : "skorkaBtn"} onClick={() => { changeSkorka(1) }}>
                                    1
                                </button>
                                <button className={skorka === 2 ? "skorkaBtn skorkaBtnActive skorkaMargin0" : "skorkaBtn skorkaMargin0"} onClick={() => { changeSkorka(2) }}>
                                    2
                                </button>
                            </div>
                        </div>
                        <div className="dostawaKoszykInnerSecondRow">
                            <div className="dostawaKoszykSuma">
                                <h4 className="thin">Suma:</h4>
                                <h5>{ilosc * cena} PLN</h5>
                            </div>
                            <div className="dostawaKoszykKosztWysylki">
                                <h4 className="thin">Koszt wysyłki:</h4>
                                <h4>0 PLN</h4>
                            </div>
                        </div>
                        <div className="dostawaKoszykInnerSecondRow dostawaKoszykInnerThirdRow">
                            <div className="dostawaKoszykSuma">
                                <h4 className="thin">Do zapłaty:</h4>
                                <h5>{ilosc * cena} PLN</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottomKoszykButtons">
                    <button className="bottomKoszykBack" onClick={() => wrocDoSklepu()}>
                        Wróć do sklepu
                    </button>

                    {!disabled && ilosc > 0 ? <button className="innowacyjnaPomocBtn bottomKoszykZamawiam hoverBtn" >
                        <a href={nextStep}>
                            Zamawiam i płacę
                            <img className="longArrow" src={longArrow} alt="strzalka" />
                        </a>
                    </button> : ""}
                </div>
            </div>
        </div>
    </>
}

export default KoszykBottom;
