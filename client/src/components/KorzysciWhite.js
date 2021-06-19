import React, { useEffect, useRef } from 'react';

import wysylka from '../static/img/darmowa-wysylka.svg';
import gwarancja from '../static/img/rok-gwarancji.svg';
import certyfikat from '../static/img/certyfikat.svg';

import { gsap, ScrollTrigger } from 'gsap/all'

const KorzysciWhite = () => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        /* Scroll animations */
        gsap.fromTo([k1.current, k2.current, k3.current], { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: .5, scrollTrigger: {
                trigger: ".korzysciWhite",
                start: "top 70%"
            } });
    }, []);

    let k1 = useRef(null);
    let k2 = useRef(null);
    let k3 = useRef(null);

    return <section className="korzysciWhite">
        <div className="korzysciWhiteItem" ref={k1}>
            <img className="korzysciWhiteImg" src={wysylka} alt="darmowa-wysylka" />
            <h2 className="korzysciWhiteTitle">
                Darmowa wysyłka
            </h2>
        </div>

        <div className="korzysciWhiteItem" ref={k2}>
            <img className="korzysciWhiteImg" src={gwarancja} alt="gwarancja" />
            <h2 className="korzysciWhiteTitle">
                Rok gwarancji
            </h2>
        </div>

        <div className="korzysciWhiteItem" ref={k3}>
            <img className="korzysciWhiteImg" src={certyfikat} alt="certyfikat" />
            <h2 className="korzysciWhiteTitle">
                Certyfikowany w Polsce
            </h2>
        </div>
    </section>
}

export default KorzysciWhite;
