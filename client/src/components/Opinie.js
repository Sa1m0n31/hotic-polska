import React, { useEffect, useState, useRef } from 'react';

import quote from '../static/img/left-quote.png';

import ReactSiema from "react-siema";
import { gsap, ScrollTrigger } from 'gsap/all'

const Opinie = () => {
    let slider;

    let first = true, second = false, third = false;

    let btn1 = useRef(null);
    let btn2 = useRef(null);
    let btn3 = useRef(null);

    let header = useRef(null);
    let op1 = useRef(null);
    let op2 = useRef(null);
    let op3 = useRef(null);
    let controls = useRef(null);

    useEffect(() => {
        /* Scroll animations */
        gsap.fromTo(header.current, { opacity: 0 }, { opacity: 1, duration: .5, scrollTrigger: {
                trigger: "#opinie",
                start: "top 70%"
            } });
        gsap.fromTo([op1.current, op2.current, op3.current, controls.current], {opacity: 0 }, { opacity: 1, duration: .5, scrollTrigger: {
                trigger: ".opinieTrigger",
                start: "top 50%"
            } });
    });

    const goTo = (n) => {
        slider.goTo(n);
        if(n === 0) {
            btn1.current.style.background = "#F1602A";
            btn2.current.style.background = "transparent";
            btn3.current.style.background = "transparent";
        }
        else if(n === 1) {
            btn2.current.style.background = "#F1602A";
            btn1.current.style.background = "transparent";
            btn3.current.style.background = "transparent";
        }
        else {
            btn3.current.style.background = "#F1602A";
            btn1.current.style.background = "transparent";
            btn2.current.style.background = "transparent";
        }
    }

    return <section className="opinie" id="opinie">
        <span className="opinieTrigger"></span>
        <h1 className="sectionHeader" ref={header}>
            Opinie klientów
        </h1>
        <ReactSiema draggable={false} ref={siema => { slider = siema }} perPage={{
            900: 2,
            100: 1
        }} loop={true} duration={500}
        >
                <div className="opinieItem" ref={op2}>
                    <img className="opinieItemImg" src={quote} alt="opinie-klientow" />
                    <p className="opinieItemOpinia">
                        Kupując obawiałam się o jakość, ale masażer okazał się solidny. Pracuje cicho,ale nie brakuje mu mocy. Używam codziennie do masażu bolących spietych mięśni po całym dniu pracy
                    </p>
                    <h2 className="opinieItemAuthor">
                        Ania
                    </h2>
                </div>
                <div className="opinieItem" ref={op3}>
                    <img className="opinieItemImg" src={quote} alt="opinie-klientow" />
                    <p className="opinieItemOpinia">
                        Świetny sprzęt:) To mój drugi pistolet masujący i ten jest naprawdę rewelacyjny. Bardzo przydaje mi się w gabinecie podczas pracy. Serdecznie polecam!
                    </p>
                    <h2 className="opinieItemAuthor">
                        Radek
                    </h2>
                </div>
                <div className="opinieItem">
                    <img className="opinieItemImg" src={quote} alt="opinie-klientow" />
                    <p className="opinieItemOpinia">
                        Sprzęt posiadam od kilku tygodni i zdecydowanie polecam! Jestem do tej pory naprawdę zadowolony z zakupu. Masaże pistoletem po dłuższym wybieganiu dają efekt "świeżości" nóg kolejnego dnia. Za taką cenę efekt? REWELACJA
                    </p>
                    <h2 className="opinieItemAuthor">
                        Mariusz
                    </h2>
                </div>
            <div className="opinieItem opinieItemDesktop" ref={op1}>
                <img className="opinieItemImg" src={quote} alt="opinie-klientow" />
                <p className="opinieItemOpinia">
                    Po blisko 2 miesiącach użytkowania mogę szczerze polecić produkt (używany niemal codziennie). Pistolet mocny, nie zacina się, bateria trzyma wystarczająco długo. Bardzo przydatny dla osób profesjonalnie uprawiających sport. Genialnie rozluźnia spięte mięśnie przed/po treningu. Działa o wiele lepiej niż sam roller. Polecam ten model pistoletu.
                </p>
                <h2 className="opinieItemAuthor">
                    Angelika
                </h2>
            </div>

        </ReactSiema>
        <div className="opinieControls" ref={controls}>
            <button name="opinie1" aria-label="opinie-1" ref={btn1} className={first ? "opinieControl opinieFilled" : "opinieControl"} onClick={() => goTo(0) }></button>
            <button name="opinie2" aria-label="opinie-2" ref={btn2} className={second ? "opinieControl opinieFilled" : "opinieControl"} onClick={() => goTo(1) }></button>
            <button name="opinie3" aria-label="opinie-3" ref={btn3} className={third ? "opinieControl opinieFilled" : "opinieControl"} onClick={() => goTo(2)}></button>
        </div>
    </section>
}

export default Opinie;
