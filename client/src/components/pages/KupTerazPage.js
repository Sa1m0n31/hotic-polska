import React, { useRef, useState, useEffect, useContext } from 'react';

import PageHeader from "../PageHeader";

import wozek from '../../static/img/wozek.svg'
import pistolet from '../../static/img/pistolet_kosz.png'
import longArrow from '../../static/img/long_right.svg'
import arrow from '../../static/img/up.svg'
import showKoszykUtil from "../../helpers/showKoszyk";

import Gallery from "../Gallery";

import skorka1 from '../../static/img/skorka-1.jpg'
import skorka2 from '../../static/img/skorka-2.jpg'
import boczne1 from '../../static/img/boczne1.jpg'
import boczne2 from '../../static/img/boczne2.jpg'
import boczne3 from '../../static/img/boczne3.jpg'
import dolne1 from '../../static/img/dolne1.jpg'
import dolne2 from '../../static/img/dolne2.jpg'
import dolne3 from '../../static/img/dolne3.jpg'

import btm1 from '../../static/img/btm1.png';
import btm2 from '../../static/img/btm2.png';
import btm3 from '../../static/img/btm3.png';
import btm4 from '../../static/img/galeria1.jpg';
import btm5 from '../../static/img/galeria2.jpg';
import btm6 from '../../static/img/galeria3.jpg';
import btm7 from '../../static/img/galeria4.jpg';
import btm8 from '../../static/img/galeria5.jpg';
import btm9 from '../../static/img/galeria6.jpg';

import wrocDoSklepuUtil from "../../helpers/wrocDoSklepuUtil";
import Loader from "react-loader-spinner";

import Footer from "../Footer";
import KoszykBottom from "../KoszykBottom";

import KoszykContext from "../../helpers/KoszykContext";
import axios from "axios";

const KupTerazPage = () => {
    let [cena, setCena] = useState(500);
    let [nazwa, setNazwa] = useState("Massage Gun");
    let [open, setOpen] = useState(false);
    let [gallery, setGallery] = useState(false);
    let [start, setStart] = useState(0);
    let [loaded, setLoaded] = useState(false);

    /* Domyslnie dane o ilosci i skorce pobierane z kontekstu (0, 1) */
    let myContext = useContext(KoszykContext);
    let [ilosc, setIlosc] = useState(myContext.ilosc);
    let [skorka, setSkorka] = useState(myContext.skorka);

    useEffect(() => {
        if(sessionStorage.getItem('showKoszyk') === 'T') {
            showKoszyk(false);
            sessionStorage.removeItem('showKoszyk');
        }

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

    useEffect(() => {
        if(open) {
            showKoszyk(false);
        }
    }, [open]);

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
            if(!isNaN(localStorage.getItem('ilosc'))) {
                await localStorage.setItem('ilosc', (parseInt(localStorage.getItem('ilosc'))+1).toString());
                setIlosc(ilosc+1);
            }
            else {
                await localStorage.setItem('ilosc', 1);
                setIlosc(1);
            }
        }

        showKoszykUtil();
    }

    const wrocDoSklepu = () => {
        setOpen(false);
        wrocDoSklepuUtil();
    }

    return <KoszykContext.Provider value={myContext}>
        <div className="kupTeraz">
        <PageHeader ilosc={ilosc} showKoszyk={showKoszyk} />
        <Gallery openProp={gallery} toggle={setGallery} start={start} />
            {loaded ? <main className="kupTerazMain">
                <div className="kupTerazLeft">
                    <div className="kupTerazLeftTop">
                        <div className="imgWrapper">
                            <img className="kupTerazImgMain" src={skorka === 1 ? skorka1 : skorka2} alt="pistolet" onClick={() => { setGallery(true); setStart(0); } } />
                        </div>
                        <div className="kupTerazThreeLeft" >
                            <div className="imgWrapper">
                                <img className="kupTerazThreeLeftImg" src={boczne3} alt="pistolet" onClick={() => { setGallery(true); setStart(2); }} />
                            </div>
                            <div className="imgWrapper">
                                <img className="kupTerazThreeLeftImg" src={boczne1} alt="pistolet" onClick={() => { setGallery(true); setStart(3); }} />
                            </div>
                            <div className="imgWrapper">
                                <img className="kupTerazThreeLeftImg" src={boczne2} alt="pistolet" onClick={() => { setGallery(true); setStart(4); }} />
                            </div>
                        </div>
                    </div>
                    <div className="kupTerazLeftSecondRow">
                        <div className="imgWrapper" onClick={() => { setGallery(true); setStart(5); }}>
                            <img className="secondRowImg" src={dolne1} alt="pistolet" />
                        </div>
                        <div className="imgWrapper" onClick={() => { setGallery(true); setStart(6); }}>
                            <img className="secondRowImg" src={dolne2} alt="pistolet" />
                        </div>
                        <div className="imgWrapper" onClick={() => { setGallery(true); setStart(7); }}>
                            <img className="secondRowImg" src={dolne3} alt="pistolet" />
                        </div>
                    </div>
                    <div className="kupTerazLeftFilm">
                        <h3 className="kupTerazLeftFilmTitle">
                            Obejrzyj <span className="orange">film</span> i poznaj możliwości
                        </h3>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/7_CpCx6IXg8" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen></iframe>
                        <p className="textAfterYoutube">
                            Jak wiadomo <b>zdrowie jest najważniejsze</b>, a nic tak dobrze nie działa na organizm jak odpowiednie <b>dotlenienie i odżywienie</b>. Dzięki masażerowi przyspieszamy przepływ płynów ogólnoustrojowych w organizmie, doprowadzając do mięśni <b>krew bogatą w tlen i składniki odżywcze</b>, a odprowadzając toksyczne substancje powstałe podczas wysiłku fizycznego czy stresu. Dzięki temu nasz organizm jest <b>silniejszy i odporniejszy na czynniki chorobotwórcze</b>.
                        </p>
                    </div>
                </div>

                <div className="kupTerazRight">
                    <h1 className="kupTerazTitle">
                        {nazwa}
                    </h1>
                    <div className="kupTerazLeft kupTerazLeftMobile">
                        <div className="kupTerazLeftTop">
                            <img className="kupTerazImgMain" src={skorka === 1 ? skorka1 : skorka2} alt="pistolet" />
                            <div className="kupTerazThreeLeft">
                                <img className="kupTerazThreeLeftImg" src={boczne3} alt="pistolet" onClick={() => { setGallery(true); setStart(2); }} />
                                <img className="kupTerazThreeLeftImg" src={boczne1} alt="pistolet" onClick={() => { setGallery(true); setStart(3); }} />
                                <img className="kupTerazThreeLeftImg" src={boczne2} alt="pistolet" onClick={() => { setGallery(true); setStart(4); }} />
                            </div>
                        </div>
                        <div className="kupTerazLeftSecondRow">
                            <img className="secondRowImg" src={dolne1} alt="pistolet" onClick={() => { setGallery(true); setStart(5); }} />
                            <img className="secondRowImg" src={dolne2} alt="pistolet" onClick={() => { setGallery(true); setStart(6); }} />
                            <img className="secondRowImg" src={dolne3} alt="pistolet" onClick={() => { setGallery(true); setStart(7); }} />
                        </div>
                        <div className="kupTerazLeftFilm">
                            <h3 className="kupTerazLeftFilmTitle">
                                Obejrzyj <span className="orange">film</span> i poznaj możliwości
                            </h3>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/Rqsfa5At214" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen></iframe>
                        </div>
                    </div>
                    <h2 className="kupTerazCena">
                        {cena} zł
                    </h2>
                    <div className="kupTerazSkorkaAndCena">
                        <div>
                            <h3 className="kupTerazSkorka">
                                Wybierz skórkę
                            </h3>
                            <button className={skorka === 1 ? "skorkaBtn skorkaBtnActive skorkaBtnWord" : "skorkaBtn skorkaBtnWord"} onClick={() => { setSkorka(1); localStorage.setItem('skorka', '1') }}>
                                { window.innerWidth > 1000 ? "1" : "Czarna" }
                            </button>
                            <button className={skorka === 2 ? "skorkaBtn skorkaBtnActive skorkaBtnWord" : "skorkaBtn skorkaBtnWord"} onClick={() => { setSkorka(2); localStorage.setItem('skorka', '2') }}>
                                { window.innerWidth > 1000 ? "2" : "Srebrna" }
                            </button>
                        </div>
                        <div className="kupTerazCenaMobile">
                            <h2>Cena</h2>
                            <h3>{cena} zł</h3>
                        </div>
                    </div>

                    <div className="dodajDoKoszykaBtnWrapper">
                        <button className="innowacyjnaPomocBtn dodajDoKoszykaBtn hoverBtn" onClick={() => showKoszyk(true, skorka)}>
                            <span>Dodaj do koszyka</span>
                            <img className="wozekImg" src={wozek} alt="wozek" />
                        </button>
                    </div>

                    <div className="opisProduktu">
                        <h4 className="opisProduktuHeader">
                            Opis produktu
                        </h4>
                        <div className="opisProduktuText">
                            Pistolet do masażu nt03 jest wielofunkcyjnym urządzeniem zapewniającym rozluźnienie spiętych mięśni. Działa stymulująco na wszystkie grupy mięśniowe.
                            <ul className="opisProduktuList">
                                <li>
                                    Idealnie się sprawdzi się <b>po treningu</b> rozbijając powstałe <b>zakwasy</b>
                                </li>
                                <li>
                                    Ma działanie rozluźniające dla <b>spiętych mięśni</b> spowodowanych nadmiernym <b>stresem</b>
                                </li>
                                <li>
                                    <b>Przyspiesza krążenie krwi</b> dzięki czemu możliwa jest szybsza regeneracja i dotlenienie mięśni
                                </li>
                                <li>
                                    Niezwykle pomocny w zabiegach fizjoterapeutycznych mających na celu <b>regenerację przeciążonych mięśni</b> spowodowanych <b>ciężką pracą</b>
                                </li>
                                <li>
                                    Ma działanie <b>relaksacyjne</b>
                                </li>
                                <li>
                                    Poprawia <b>kondycję tkanek miękkich</b> ciała
                                </li>
                                <li>
                                    Łagodzi <b>ból mięśni</b>
                                </li>
                                <li>
                                    Wspomaga <b>likwidowanie cellulitu</b>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="opcjeDostawy">
                        <h4 className="opisProduktuHeader">
                            Opcje i czas dostawy
                        </h4>
                        <h5 className="opcjeDostawyItem">
                            <b>Przesyłka kurierska DHL:</b> 1-5 dni roboczych
                        </h5>
                        <h5 className="opcjeDostawyItem">
                            <b>Przesyłka kurierska DPD:</b> 1-5 dni roboczych
                        </h5>
                        <h5 className="opcjeDostawyItem">
                            <b>Paczkomaty InPost:</b> 1-5 dni roboczych
                        </h5>
                    </div>
                </div>
            </main> : <main className="kupTerazLoader"><Loader type="grid" color="#F1602A" /></main> }
        <div className="szczegolowyOpis">
            <span id="szczegolowyOpis"></span>
            <h1 className="szczegolowyOpisBigHeader">
                Szczegółowy opis
            </h1>
            <h2 className="szczegolowyOpisSmallHeader">
                O produkcie:
            </h2>
            <ul className="opisProduktuList listSmallerMargins">
                <li>
                    8 końcówek w zestawie!
                </li>
                <li>
                    30 programów intensywności, które można dopasować indywidualnie do masowanej okolicy
                </li>
                <li>
                    Bezprzewodowy i lekki (1,1kg)
                </li>

                <li>
                    Bateria ładowana zasilaczem dołączonym do zestawu
                </li>

                <li>
                    Wyświetlacz LCD
                </li>

                <li>
                    Dotykowa regulacja mocy umieszczona z tyłu urządzenia
                </li>

                <li>
                    Do 3200 obrotów/min
                </li>

                <li>
                    Napięcie: 24V
                </li>

                <li>
                    Pojemność akumulatora: 2400 mAh
                </li>

                <li>
                    Czas ładowania: 3 godziny
                </li>

                <li>
                    Czas pracy przy pełnej mocy: 2-3,5 godziny
                </li>

                <li>
                    Poziom hałasu: 40 – 50 db
                </li>
                <li>
                    Kolor: czarny
                </li>
                <li>
                    Akumulator litowo- jonowy
                </li>
                <li>
                    Mocny bezszczotkowy silnik o wysokim momencie obrotowym
                </li>
                <li>
                    Zaprojektowany w USA
                </li>
                <li>
                    Wymiary: 18,8 x 6.2 x 24,2 cm
                </li>
                <li>
                    Instrukcja obsługi w języku polskim!
                </li>
            </ul>
            <h3 className="szczegolowyOpisHint">
                Oferowany przez nas pistolet jest jednym z najmocniejszych dostępnych na rynku!
            </h3>
            <h2 className="szczegolowyOpisSmallHeader">
                Zalety pistoletu do masażu:
            </h2>

            <ul className="opisProduktuList listSmallerMargins">
                <li>
                    Lekki i wygodny w użyciu
                </li>
                <li>
                    Łatwy w stosowaniu
                </li>
                <li>
                    Bardzo cichy, nie utrudnia funkcjonowania pozostałym domownikom
                </li>
                <li>
                    8 końcówek do masowania różnych partii ciała
                </li>
                <li>
                    30 programów intensywności umożliwiających dobranie odpowiedniej mocy do różnych rodzajów masażu
                </li>
                <li>
                    Antypoślizgowy uchwyt, który sprawia, że dłoń się nie poci
                </li>
                <li>
                    Cyfrowy wyświetlacz, który umożliwia kontrolę prędkości
                </li>
                <li>
                    Cały zestaw zapakowany w usztywnianą walizkę, umożliwiającą przechowywanie i transport urządzenia
                </li>
            </ul>

            <h2 className="szczegolowyOpisSmallHeader">
                Nasz pistolet do masażu zawiera w zestawie aż 8 GŁOWIC!
            </h2>

            <ul className="listSmallerMargins opisProduktuList">
                <li>
                    Głowica typu piłka duża wykonana z trwałej pianki, nie odkształca się, przeznaczona jest do dużych powierzchni mięśniowych w miejscach łatwo dostępnych np. brzuch, ramiona
                </li>
                <li>
                    Głowica typu piłka mała wykonana z trwałej pianki, nie odkształca się, przeznaczona jest do łatwo dostępnych powierzchni mięśniowych np. klatka piersiowa, pośladki, uda
                </li>
                <li>
                    Głowica typu widełki wykonana z twardego tworzywa. Dzięki zaokrąglonym końcom łatwo przesuwa się wzdłuż masowanego mięśnia. Przeznaczona jest do masowania mięśni wąskich i podłużnych. Dzięki jej kształtowi możliwe jest ominięcie ścięgien, dzięki temu idealnie sprawdza się w masażu mięśni obok ścięgna Achillesa. Wykorzystywana np. przy masażu prostownika grzbietu czy łydki.
                </li>
                <li>
                    Głowica płaska wykonana z twardego tworzywa. Nadaje się do masażu głębiej położonych mięśni. Znakomicie sprawdzi się w masażu mięśni bardzo spiętych. Dzięki swojemu kształtowi wygodnie przesuwa się po ciele ułatwiając wykonywanie masażu nawet na dużych powierzchniach. Wykorzystywana w masażu np. mięśni czworogłowych uda i piersiowego większego
                </li>
                <li>
                    Głowica łopatkowa wykonana z twardego tworzywa. Dzięki swojemu kształtowi dociera do głęboko położonych mięśni, jednak obejmuje mniejsze powierzchnie. Wykorzystywana do masażu np. łopatek czy mięśni przy kręgosłupie
                </li>
                <li>
                    Głowica pocisk wykonana z twardego tworzywa, najmocniejsza i najbardziej precyzyjna. Odpowiada za rozbicie bolących punktów spustowych (zgrubień powstałych w mięśniach).
                </li>
                <li>
                    Głowica korkowa wykonana z twardego tworzywa. Odpowiada za masaż w miejscach trudnodostępnych.
                </li>
                <li>
                    Głowica tłumik wykonana z miękkiego tworzywa, bardzo delikatna. Odpowiada za masaż na dużych powierzchniach w okolicach kości.
                </li>
            </ul>

            <h2 className="szczegolowyOpisSmallHeader">
                Rozpraw się z bólem mięśni na zawsze!<br/>Już dziś możesz wykonywać profesjonalne zabiegi fizjoterapeutyczne w domu w dowolnej chwili!
            </h2>
        </div>
        <div className="kupTerazBottom">
            <div className="imgWrapper" onClick={() => { setGallery(true); setStart(8); }}>
                <img className="kupTerazBottomImg" src={btm1} alt="massage-gun" />
            </div>
            <div className="imgWrapper" onClick={() => { setGallery(true); setStart(9); }}>
                <img className="kupTerazBottomImg" src={btm2} alt="massage-gun" />
            </div>
            <div className="imgWrapper" onClick={() => { setGallery(true); setStart(10); }}>
                <img className="kupTerazBottomImg" src={btm3} alt="massage-gun" />
            </div>
            <div className="imgWrapper" onClick={() => { setGallery(true); setStart(11); }}>
                <img className="kupTerazBottomImg" src={btm4} alt="massage-gun" />
            </div>
            <div className="imgWrapper" onClick={() => { setGallery(true); setStart(12); }}>
                <img className="kupTerazBottomImg" src={btm5} alt="massage-gun" />
            </div>
            <div className="imgWrapper" onClick={() => { setGallery(true); setStart(13); }}>
                <img className="kupTerazBottomImg" src={btm6} alt="massage-gun" />
            </div>
            <div className="imgWrapper" onClick={() => { setGallery(true); setStart(14); }}>
                <img className="kupTerazBottomImg" src={btm7} alt="massage-gun" />
            </div>
            <div className="imgWrapper" onClick={() => { setGallery(true); setStart(15); }}>
                <img className="kupTerazBottomImg" src={btm8} alt="massage-gun" />
            </div>
            <div className="imgWrapper" onClick={() => { setGallery(true); setStart(16); }}>
                <img className="kupTerazBottomImg" src={btm9} alt="massage-gun" />
            </div>
        </div>
    </div>
        <Footer />
        <KoszykBottom ilosc={ilosc} skorka={skorka} cena={cena}
                      wroc={wrocDoSklepu} increment={incrementIlosc} decrement={decrementIlosc}
                      setIloscFromChild={setIloscFromChild} changeSkorka={changeSkorka}
                      nextStep="/dostawa-step-1"
        />
        </KoszykContext.Provider>
}

export default KupTerazPage;
