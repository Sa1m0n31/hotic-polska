import React, {useState, useEffect, useRef, useContext} from 'react'
import Modal from 'react-modal';

import PageHeader from "../PageHeader";
import Footer from "../Footer";

import location from '../../static/img/location.svg'
import GeolocationWidget from "../GeolocationWidget";
import x from '../../static/img/x.png'
import arrowRight from '../../static/img/caret_right.svg'
import skorka1 from '../../static/img/skorka-1.jpg'
import skorka2 from '../../static/img/skorka-2.jpg'
import gsap from "gsap/all";
import Toast from "../Toast";
import KoszykContext from "../../helpers/KoszykContext";
import KoszykBottom from "../KoszykBottom";

import Loader from "react-loader-spinner";

import wrocDoSklepuUtil from "../../helpers/wrocDoSklepuUtil";
import showKoszykUtil from "../../helpers/showKoszyk";
import axios from "axios";

Modal.setAppElement("#root");

const DostawaStep2 = () => {
   const cenyDostawy = [0, 15.93, 19.50, 18.31, 21.39, 15.35, 9.99];

   useEffect(() => {
       /* Jesli nie ma produktow w koszyku - wroc */
       if((localStorage.getItem('ilosc') < 1)||(isNaN(localStorage.getItem('ilosc')))) {
           window.location.href = "/kup-teraz";
       }

       sessionStorage.setItem('dostawa', 'paczkomaty (przedplata)');
        if(typeof document !== 'undefined') {
            document.addEventListener('storage', () => {
                closePaczkomaty();
            });
        }

        if(!localStorage.getItem('skorka')) {
            localStorage.setItem('skorka', 1);
        }

       /* Ustaw poczatkowy koszt wysylki na 0 - paczkomaty przedplata */
       localStorage.setItem('cena-wysylki', 0);

       /* Get product data */
       axios.get("https://hotic-polska.pl/product-data")
           .then((res) => {
               if(res.data.productData) {
                   setCena(res.data.productData[0].cena)
                   setNazwa(res.data.productData[0].nazwa);
                   setLoaded(true);
               }
           });
    }, []);

    let formContainer = useRef(null);
    let toastWrapper = useRef(null);

    let [cena, setCena] = useState(500);
    let [nazwa, setNazwa] = useState("Massage Gun");
    let [loaded, setLoaded] = useState(false);

    let [modalOpen, setModalOpen] = useState(false);
    let [dostawa1, setDostawa1] = useState(true);
    let [dostawa2, setDostawa2] = useState(false);
    let [dostawa3, setDostawa3] = useState(false);
    let [dostawa4, setDostawa4] = useState(false);
    let [dostawa5, setDostawa5] = useState(false);
    let [dostawa6, setDostawa6] = useState(false);
    let [dostawa7, setDostawa7] = useState(false);
    let [error, setError] = useState("");

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
        /* Po kliknieciu "Dodaj do koszyka" */
        if(add) {
            setIlosc(ilosc+1);
            if(localStorage.getItem('ilosc')) {
                await localStorage.setItem('ilosc', (parseInt(localStorage.getItem('ilosc'))+1).toString());
            }
            else {
                await localStorage.setItem('ilosc', 1);
            }
        }

       showKoszykUtil()
    }

    const wrocDoSklepu = () => {
        wrocDoSklepuUtil();
    }

    const changeDostawa = (n) => {
        if(n === 1) {
            sessionStorage.setItem('dostawa', 'paczkomaty (przedplata)');
            localStorage.setItem('cena-wysylki', cenyDostawy[0]);
            setDostawa1(true);
            setDostawa2(false);
            setDostawa3(false);
            setDostawa4(false);
            setDostawa5(false);
            setDostawa6(false);
            setDostawa7(false);
        }
        else if(n === 2) {
            sessionStorage.setItem('dostawa', 'kurier dpd (przedplata)');
            localStorage.setItem('cena-wysylki', cenyDostawy[1]);
            setDostawa1(false);
            setDostawa2(true);
            setDostawa3(false);
            setDostawa4(false);
            setDostawa5(false);
            setDostawa6(false);
            setDostawa7(false);
        }
        else if(n === 3) {
            sessionStorage.setItem('dostawa', 'kurier dpd (pobranie)');
            localStorage.setItem('cena-wysylki', cenyDostawy[2]);
            setDostawa1(false);
            setDostawa2(false);
            setDostawa3(true);
            setDostawa4(false);
            setDostawa5(false);
            setDostawa6(false);
            setDostawa7(false);
        }
        else if(n === 4) {
            sessionStorage.setItem('dostawa', 'kurier dhl (przedplata)');
            localStorage.setItem('cena-wysylki', cenyDostawy[3]);
            setDostawa1(false);
            setDostawa2(false);
            setDostawa3(false);
            setDostawa4(true);
            setDostawa5(false);
            setDostawa6(false);
            setDostawa7(false);
        }
        else if(n === 5) {
            sessionStorage.setItem('dostawa', 'kurier dhl (pobranie)');
            localStorage.setItem('cena-wysylki', cenyDostawy[4]);
            setDostawa1(false);
            setDostawa2(false);
            setDostawa3(false);
            setDostawa4(false);
            setDostawa5(true);
            setDostawa6(false);
            setDostawa7(false);
        }
        else if(n === 6) {
            sessionStorage.setItem('dostawa', 'paczkomaty (pobranie)');
            localStorage.setItem('cena-wysylki', cenyDostawy[5]);
            setDostawa1(false);
            setDostawa2(false);
            setDostawa3(false);
            setDostawa4(false);
            setDostawa5(false);
            setDostawa6(true);
            setDostawa7(false);
        }
        else {
            sessionStorage.setItem('dostawa', 'kurier inpost (przedpłata)');
            localStorage.setItem('cena-wysylki', cenyDostawy[6]);
            setDostawa1(false);
            setDostawa2(false);
            setDostawa3(false);
            setDostawa4(false);
            setDostawa5(false);
            setDostawa6(false);
            setDostawa7(true);
        }
    }

    const przejdzDalej = (e) => {
        e.preventDefault();
        if((sessionStorage.getItem('dostawa') === 'paczkomaty (przedplata)')||(sessionStorage.getItem('dostawa') === 'paczkomaty (pobranie)')) {
            if(!sessionStorage.getItem('paczkomat-miasto')) {
                /* Shake animation */
                setError("Wybierz paczkomat");
                gsap.fromTo(toastWrapper.current, { x: "-50%", y: 100, opacity: 0 }, { x: "-50%", y: 0, opacity: 1, duration: .5 });
                gsap.fromTo(formContainer.current, { x: -5 }, { duration: .05, x: 0, repeat: 8, yoyo: true });
                setTimeout(() => {
                    gsap.to(toastWrapper.current, { opacity: 0, duration: .5 });
                }, 2000);
            }
            else {
                window.location = "/dostawa-step-3";
            }
        }
        else {
            window.location = "/dostawa-step-3";
        }
    }

    const showPaczkomaty = () => {
        setModalOpen(true);
        let paczkomatInner = document.querySelector(".geolocationModalInner");
        gsap.to(paczkomatInner, { scale: 1, duration: .5 });
        //document.querySelector("#easypack-search").setAttribute('autocomplete', 'off');
    }

    const closePaczkomaty = () => {
        let paczkomatInner = document.querySelector(".geolocationModalInner");
        gsap.to(paczkomatInner, { x: 3000, duration: .5 })
            .then(() => {
                setModalOpen(false);
                gsap.set(paczkomatInner, { x: 0, scale: 0 });
            });
    }

    return <>
    <div className="dostawaStep1Container">
        <div className={modalOpen ? "geolocationModal modalOpen" : "geolocationModal"}>
            <div className="geolocationModalInner">
                <button className="modalClose" onClick={() => closePaczkomaty()}>
                    <img src={x} alt="exit" />
                </button>
                <h3 className="wybierzPaczkomatModalHeader">
                    Wybierz swój paczkomat
                </h3>
                <GeolocationWidget />
            </div>
        </div>

        <PageHeader ilosc={ilosc} showKoszyk={showKoszyk} />
        <main className="dostawaStep2Inner">
            <div className="dostawaSposobDostawy" ref={formContainer}>
                <h2 className="dostawaSposobDostawyHeader">
                    Wybierz sposób dostawy
                </h2>
                <div className="sposobyDostawy">
                    <div className="sposobyDostawyItem" id={dostawa1 ? "dostawaCurrent" : ""}>
                        <label>
                            <button className={dostawa1 ? "sposobyDostawyCheck dostawaFilled" : "sposobyDostawyCheck"}
                                onClick={() => {changeDostawa(1)}}
                            ></button>
                            <h3 className="sposobyDostawyName">
                                Paczkomaty InPost <span className="smaller">(przedpłata)</span>
                            </h3>
                        </label>
                        <button className="wybierzPaczkomatBtn hoverBtn" onClick={() => {if(dostawa1) showPaczkomaty();       /* Remove autocomplete */
                            document.querySelector("#easypack-search").setAttribute('autocomplete', 'off');}}>
                            <img className="locationImg" src={location} alt="wybierz-paczkomat" />
                            Wybierz paczkomat
                        </button>

                        {sessionStorage.getItem('paczkomat-miasto') && dostawa1 ?
                        <div className="wybranyPaczkomat">
                            <h4 className="wybranyPaczkomatHeader">
                                Wybrany paczkomat:
                            </h4>
                            <h5>
                                {sessionStorage.getItem('paczkomat-adres')}
                            </h5>
                            <h5>
                                {sessionStorage.getItem('paczkomat-kod')} {sessionStorage.getItem('paczkomat-miasto')}
                            </h5>
                        </div> : ""}

                        <h3 className="dostawaCena">
                            0 zł
                        </h3>
                    </div>

                    <div className="sposobyDostawyItem" id={dostawa6 ? "dostawaCurrent" : ""}>
                        <label>
                            <button className={dostawa6 ? "sposobyDostawyCheck dostawaFilled" : "sposobyDostawyCheck"}
                                    onClick={() => {changeDostawa(6)}}
                            ></button>
                            <h3 className="sposobyDostawyName">
                                Paczkomaty InPost <span className="smaller">(pobranie)</span>
                            </h3>
                        </label>
                        <button className="wybierzPaczkomatBtn hoverBtn" onClick={() => {if(dostawa6) showPaczkomaty();       /* Remove autocomplete */
                        }}>
                            <img className="locationImg" src={location} alt="wybierz-paczkomat" />
                            Wybierz paczkomat
                        </button>

                        {sessionStorage.getItem('paczkomat-miasto') && dostawa6 ?
                            <div className="wybranyPaczkomat">
                                <h4 className="wybranyPaczkomatHeader">
                                    Wybrany paczkomat:
                                </h4>
                                <h5>
                                    {sessionStorage.getItem('paczkomat-adres')}
                                </h5>
                                <h5>
                                    {sessionStorage.getItem('paczkomat-kod')} {sessionStorage.getItem('paczkomat-miasto')}
                                </h5>
                            </div> : ""}

                        <h3 className="dostawaCena">
                            15,35 zł
                        </h3>
                    </div>

                    <div className="sposobyDostawyItem" id={dostawa2 ? "dostawaCurrent" : ""}>
                        <label>
                            <button className={dostawa2 ? "sposobyDostawyCheck dostawaFilled" : "sposobyDostawyCheck"}
                                    onClick={() => { changeDostawa(2) }}
                            ></button>
                            <h3 className="sposobyDostawyName">
                                Kurier DPD <span className="smaller">(przedpłata)</span>
                            </h3>
                        </label>
                        <h3 className="dostawaCena">
                            15,93 zł
                        </h3>
                    </div>

                    <div className="sposobyDostawyItem" id={dostawa3 ? "dostawaCurrent" : ""}>
                        <label>
                            <button className={dostawa3 ? "sposobyDostawyCheck dostawaFilled" : "sposobyDostawyCheck"}
                                    onClick={() => { changeDostawa(3) }}
                            ></button>
                            <h3 className="sposobyDostawyName">
                                Kurier DPD <span className="smaller">(za pobraniem)</span>
                            </h3>
                        </label>
                        <h3 className="dostawaCena">
                            19,50 zł
                        </h3>
                    </div>

                    <div className="sposobyDostawyItem" id={dostawa4 ? "dostawaCurrent" : ""}>
                        <label>
                            <button className={dostawa4 ? "sposobyDostawyCheck dostawaFilled" : "sposobyDostawyCheck"}
                                    onClick={() => { changeDostawa(4) }}
                            ></button>
                            <h3 className="sposobyDostawyName">
                                Kurier DHL <span className="smaller">(przedpłata)</span>
                            </h3>
                        </label>
                        <h3 className="dostawaCena">
                            18,31 zł
                        </h3>
                    </div>

                    <div className="sposobyDostawyItem" id={dostawa5 ? "dostawaCurrent" : ""}>
                        <label>
                            <button className={dostawa5 ? "sposobyDostawyCheck dostawaFilled" : "sposobyDostawyCheck"}
                                    onClick={() => { changeDostawa(5) }}
                            ></button>
                            <h3 className="sposobyDostawyName">
                                Kurier DHL <span className="smaller">(za pobraniem)</span>
                            </h3>
                        </label>
                        <h3 className="dostawaCena">
                            21,39 zł
                        </h3>
                    </div>

                    <div className="sposobyDostawyItem" id={dostawa7 ? "dostawaCurrent" : ""}>
                        <label>
                            <button className={dostawa7 ? "sposobyDostawyCheck dostawaFilled" : "sposobyDostawyCheck"}
                                    onClick={() => { changeDostawa(7) }}
                            ></button>
                            <h3 className="sposobyDostawyName">
                                Kurier InPost <span className="smaller">(przedpłata)</span>
                            </h3>
                        </label>
                        <h3 className="dostawaCena">
                            9,99 zł
                        </h3>
                    </div>
                </div>
            </div>

            <div className="dostawaKoszyk">
                {loaded ? <>
                    <h2 className="dostawaSposobDostawyHeader">
                        Twój koszyk
                    </h2>

                    <div className="dostawaKoszykInner">
                        <div className="dostawaKoszykInnerFirstRow">
                            <img className="dostawaKoszykInnerImg" src={localStorage.getItem('skorka') === '1' ? skorka1 : skorka2} alt="pistolet" />
                            <div className="dostawaKoszykInnerFirstRowInfo">
                                <h3>{nazwa}</h3>
                                <div className="dostawaKoszykInnerFirstRowInfoThin">
                                    <h4>Skórka: {localStorage.getItem('skorka')}</h4>
                                    <h4>Ilość: {localStorage.getItem('ilosc')}</h4>
                                </div>
                                <h5>{cena} PLN</h5>
                            </div>
                        </div>
                        <div className="dostawaKoszykInnerSecondRow">
                            <div className="dostawaKoszykSuma">
                                <h4 className="thin">Suma:</h4>
                                <h5>{parseInt(localStorage.getItem('ilosc')) * cena} PLN</h5>
                            </div>
                            <div className="dostawaKoszykKosztWysylki">
                                <h4 className="thin">Koszt wysyłki:</h4>
                                <h4>{localStorage.getItem('cena-wysylki') ? localStorage.getItem('cena-wysylki') : "0"} PLN</h4>
                            </div>
                        </div>
                        <div className="dostawaKoszykInnerSecondRow dostawaKoszykInnerThirdRow">
                            <div className="dostawaKoszykSuma">
                                <h4 className="thin">Do zapłaty:</h4>
                                <h5>{localStorage.getItem('cena-wysylki') ? parseInt(localStorage.getItem('ilosc')) * cena + parseFloat(localStorage.getItem('cena-wysylki')) : parseInt(localStorage.getItem('ilosc')) * cena} PLN</h5>
                            </div>
                        </div>
                    </div>
                </> : <div className="loaderKoszyk"><Loader type="grid" color="#f1602A" /></div> }
            </div>

            <button className="dostawaStep2PrzejdzDalejBtn hoverBtn" onClick={e => przejdzDalej(e)}>
                    Przejdź dalej
                    <img src={arrowRight} alt="dalej" />
            </button>
        </main>
    </div>
        <div className="toastWrapper" ref={toastWrapper}>
            <Toast error={error} />
        </div>
        <KoszykBottom ilosc={ilosc} skorka={skorka} cena={cena}
                      wroc={wrocDoSklepu} increment={incrementIlosc} decrement={decrementIlosc}
                      setIloscFromChild={setIloscFromChild} changeSkorka={changeSkorka}
                      nextStep="/dostawa-step-1" disabled={true}
        />

        <Footer />
</>
}

export default DostawaStep2;
