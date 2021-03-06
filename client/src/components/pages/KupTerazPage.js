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
                            Obejrzyj <span className="orange">film</span> i poznaj mo??liwo??ci
                        </h3>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/7_CpCx6IXg8" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen></iframe>
                        <p className="textAfterYoutube">
                            Jak wiadomo <b>zdrowie jest najwa??niejsze</b>, a nic tak dobrze nie dzia??a na organizm jak odpowiednie <b>dotlenienie i od??ywienie</b>. Dzi??ki masa??erowi przyspieszamy przep??yw p??yn??w og??lnoustrojowych w organizmie, doprowadzaj??c do mi????ni <b>krew bogat?? w tlen i sk??adniki od??ywcze</b>, a odprowadzaj??c toksyczne substancje powsta??e podczas wysi??ku fizycznego czy stresu. Dzi??ki temu nasz organizm jest <b>silniejszy i odporniejszy na czynniki chorobotw??rcze</b>.
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
                                Obejrzyj <span className="orange">film</span> i poznaj mo??liwo??ci
                            </h3>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/Rqsfa5At214" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen></iframe>
                        </div>
                    </div>
                    <h2 className="kupTerazCena">
                        {cena} z??
                    </h2>
                    <div className="kupTerazSkorkaAndCena">
                        <div>
                            <h3 className="kupTerazSkorka">
                                Wybierz sk??rk??
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
                            <h3>{cena} z??</h3>
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
                            Pistolet do masa??u nt03 jest wielofunkcyjnym urz??dzeniem zapewniaj??cym rozlu??nienie spi??tych mi????ni. Dzia??a stymuluj??co na wszystkie grupy mi????niowe.
                            <ul className="opisProduktuList">
                                <li>
                                    Idealnie si?? sprawdzi si?? <b>po treningu</b> rozbijaj??c powsta??e <b>zakwasy</b>
                                </li>
                                <li>
                                    Ma dzia??anie rozlu??niaj??ce dla <b>spi??tych mi????ni</b> spowodowanych nadmiernym <b>stresem</b>
                                </li>
                                <li>
                                    <b>Przyspiesza kr????enie krwi</b> dzi??ki czemu mo??liwa jest szybsza regeneracja i dotlenienie mi????ni
                                </li>
                                <li>
                                    Niezwykle pomocny w zabiegach fizjoterapeutycznych maj??cych na celu <b>regeneracj?? przeci????onych mi????ni</b> spowodowanych <b>ci????k?? prac??</b>
                                </li>
                                <li>
                                    Ma dzia??anie <b>relaksacyjne</b>
                                </li>
                                <li>
                                    Poprawia <b>kondycj?? tkanek mi??kkich</b> cia??a
                                </li>
                                <li>
                                    ??agodzi <b>b??l mi????ni</b>
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
                            <b>Przesy??ka kurierska DHL:</b> 1-5 dni roboczych
                        </h5>
                        <h5 className="opcjeDostawyItem">
                            <b>Przesy??ka kurierska DPD:</b> 1-5 dni roboczych
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
                Szczeg????owy opis
            </h1>
            <h2 className="szczegolowyOpisSmallHeader">
                O produkcie:
            </h2>
            <ul className="opisProduktuList listSmallerMargins">
                <li>
                    8 ko??c??wek w zestawie!
                </li>
                <li>
                    30 program??w intensywno??ci, kt??re mo??na dopasowa?? indywidualnie do masowanej okolicy
                </li>
                <li>
                    Bezprzewodowy i lekki (1,1kg)
                </li>

                <li>
                    Bateria ??adowana??zasilaczem??do????czonym do zestawu
                </li>

                <li>
                    Wy??wietlacz??LCD
                </li>

                <li>
                    Dotykowa regulacja mocy??umieszczona z ty??u urz??dzenia
                </li>

                <li>
                    Do??3200 obrot??w/min
                </li>

                <li>
                    Napi??cie:??24V
                </li>

                <li>
                    Pojemno???? akumulatora:??2400 mAh
                </li>

                <li>
                    Czas ??adowania:??3 godziny
                </li>

                <li>
                    Czas pracy przy pe??nej mocy:??2-3,5 godziny
                </li>

                <li>
                    Poziom ha??asu: 40 ??? 50 db
                </li>
                <li>
                    Kolor:??czarny
                </li>
                <li>
                    Akumulator litowo- jonowy
                </li>
                <li>
                    Mocny bezszczotkowy silnik??o wysokim momencie obrotowym
                </li>
                <li>
                    Zaprojektowany w USA
                </li>
                <li>
                    Wymiary:??18,8 x 6.2 x 24,2 cm
                </li>
                <li>
                    Instrukcja obs??ugi w j??zyku polskim!
                </li>
            </ul>
            <h3 className="szczegolowyOpisHint">
                Oferowany przez nas pistolet jest jednym z najmocniejszych dost??pnych na rynku!
            </h3>
            <h2 className="szczegolowyOpisSmallHeader">
                Zalety pistoletu do masa??u:
            </h2>

            <ul className="opisProduktuList listSmallerMargins">
                <li>
                    Lekki i wygodny??w u??yciu
                </li>
                <li>
                    ??atwy??w stosowaniu
                </li>
                <li>
                    Bardzo cichy, nie utrudnia funkcjonowania pozosta??ym domownikom
                </li>
                <li>
                    8 ko??c??wek??do masowania r????nych partii cia??a
                </li>
                <li>
                    30 program??w intensywno??ci??umo??liwiaj??cych dobranie odpowiedniej mocy do r????nych rodzaj??w masa??u
                </li>
                <li>
                    Antypo??lizgowy uchwyt,??kt??ry sprawia, ??e d??o?? si?? nie poci
                </li>
                <li>
                    Cyfrowy wy??wietlacz,??kt??ry umo??liwia kontrol?? pr??dko??ci
                </li>
                <li>
                    Ca??y zestaw zapakowany w??usztywnian?? walizk??, umo??liwiaj??c?? przechowywanie i transport urz??dzenia
                </li>
            </ul>

            <h2 className="szczegolowyOpisSmallHeader">
                Nasz pistolet do masa??u zawiera w zestawie a?? 8 G??OWIC!
            </h2>

            <ul className="listSmallerMargins opisProduktuList">
                <li>
                    G??owica typu pi??ka du??a??wykonana z trwa??ej pianki, nie odkszta??ca si??, przeznaczona jest do du??ych powierzchni mi????niowych w miejscach ??atwo dost??pnych np. brzuch, ramiona
                </li>
                <li>
                    G??owica typu pi??ka ma??a??wykonana z trwa??ej pianki, nie odkszta??ca si??, przeznaczona jest do ??atwo dost??pnych powierzchni mi????niowych np. klatka piersiowa, po??ladki, uda
                </li>
                <li>
                    G??owica typu wide??ki??wykonana z twardego tworzywa. Dzi??ki zaokr??glonym ko??com ??atwo przesuwa si?? wzd??u?? masowanego mi????nia. Przeznaczona jest do masowania mi????ni w??skich i pod??u??nych. Dzi??ki jej kszta??towi mo??liwe jest omini??cie ??ci??gien, dzi??ki temu idealnie sprawdza si?? w masa??u mi????ni obok ??ci??gna Achillesa. Wykorzystywana np. przy masa??u prostownika grzbietu czy ??ydki.
                </li>
                <li>
                    G??owica p??aska??wykonana z twardego tworzywa. Nadaje si?? do masa??u g????biej po??o??onych mi????ni. Znakomicie sprawdzi si?? w masa??u mi????ni bardzo spi??tych. Dzi??ki swojemu kszta??towi wygodnie przesuwa si?? po ciele u??atwiaj??c wykonywanie masa??u nawet na du??ych powierzchniach. Wykorzystywana w masa??u np. mi????ni czworog??owych uda i piersiowego wi??kszego
                </li>
                <li>
                    G??owica ??opatkowa??wykonana z twardego tworzywa. Dzi??ki swojemu kszta??towi dociera do g????boko po??o??onych mi????ni, jednak obejmuje mniejsze powierzchnie. Wykorzystywana do masa??u np. ??opatek czy mi????ni przy kr??gos??upie
                </li>
                <li>
                    G??owica pocisk??wykonana z twardego tworzywa, najmocniejsza i najbardziej precyzyjna. Odpowiada za rozbicie bol??cych punkt??w spustowych (zgrubie?? powsta??ych w mi????niach).
                </li>
                <li>
                    G??owica korkowa??wykonana z twardego tworzywa. Odpowiada za masa?? w miejscach trudnodost??pnych.
                </li>
                <li>
                    G??owica t??umik??wykonana z mi??kkiego tworzywa, bardzo delikatna. Odpowiada za masa?? na du??ych powierzchniach w okolicach ko??ci.
                </li>
            </ul>

            <h2 className="szczegolowyOpisSmallHeader">
                Rozpraw si?? z b??lem mi????ni na zawsze!<br/>Ju?? dzi?? mo??esz wykonywa?? profesjonalne zabiegi fizjoterapeutyczne w domu w dowolnej chwili!
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
