import React, { useEffect, useRef } from 'react';

import pistolet from '../static/img/pistolet-regeneracja.jpg';
import tlo from '../static/img/pistolet-tlo.png';
import {gsap, ScrollTrigger} from "gsap/all";

const Regeneracja = () => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        /* Scroll animations */
        gsap.fromTo([img.current, header.current], { y: 200, opacity: 0 }, { y: 0, opacity: 1, duration: .5, scrollTrigger: {
                trigger: ".regeneracja",
                start: "top 70%"
            } });
        gsap.fromTo(txt.current, { y: 200, opacity: 0 }, { y: 0, opacity: 1, duration: .5, scrollTrigger: {
                trigger: ".regeneracja",
                start: "top 45%"
            } });
        gsap.fromTo(btn.current, { y: 200, opacity: 0 }, { y: 0, opacity: 1, duration: .5, scrollTrigger: {
                trigger: ".regeneracja",
                start: "top 40%"
            } });
    }, []);

    let header = useRef(null);
    let img = useRef(null);
    let txt = useRef(null);
    let btn = useRef(null);

    return <section className="regeneracja">
        <div className="regeneracjaLeft" ref={img}>
            <img className="regeneracjaLeftImg" src={pistolet} alt="massage-gun" />
        </div>

        <div className="regeneracjaRight">
            <h2 className="regeneracjaHeader" ref={header}>
                Regeneracja dostępna<br/>dla wszystkich
            </h2>
            <p className="regeneracjaText" ref={txt}>
                <b className="massageGunBold">Massage Gun</b> to zaprojektowane przez ekspertów narzędzie do masażu, które zapewnia rzeczywiste rezultaty, pozwalając Twojemu ciału na relaks, uwolnienie i regenerację szybciej niż kiedykolwiek.
            </p>

            <button className="innowacyjnaPomocBtn regeneracjaBtn hoverBtn" ref={btn}>
                <a href="/kup-teraz/#szczegolowyOpis">
                    Dowiedz się więcej
                </a>
            </button>
        </div>

        <img className="regeneracjaBcg" src={tlo} alt="pistolet-hotic" />
    </section>
}

export default Regeneracja;
