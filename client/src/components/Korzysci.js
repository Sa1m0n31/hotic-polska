import React, {useEffect, useRef} from 'react';

import k1 from '../static/img/szybka-regeneracja.svg';
import k2 from '../static/img/poprawia-krazenie.svg';
import k3 from '../static/img/rozbija-zakwasy.svg';
import k4 from '../static/img/zwieksza-zakres-ruchu.svg';
import k5 from '../static/img/ujedrnia.svg';
import k6 from '../static/img/dziala-relaksacyjnie.svg';

import { gsap, ScrollTrigger } from "gsap/all";

const Korzysci = () => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        /* Scroll animations */
        gsap.fromTo(header.current, { y: 200, opacity: 0 }, { y: 0, opacity: 1, duration: .5, scrollTrigger: {
                trigger: "#oNas",
                start: "top 70%"
            } });
        gsap.fromTo([i1.current, i2.current, i3.current], { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: .5, scrollTrigger: {
                trigger: "#oNas",
                start: "top 60%"
            } });
        gsap.fromTo([i4.current, i5.current, i6.current], { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: .5, scrollTrigger: {
                trigger: "#oNas",
                start: "top 50%"
            } });

    }, []);

    let header = useRef(null);
    let i1 = useRef(null);
    let i2 = useRef(null);
    let i3 = useRef(null);
    let i4 = useRef(null);
    let i5 = useRef(null);
    let i6 = useRef(null);

    return <section className="korzysci" id="oNas">
        <h2 className="sectionHeader" ref={header}>
            Odkryj korzyści
        </h2>
        <div className="korzysciInner">
            <div className="korzysciItem" ref={i1}>
                <img className="korzysciImg" src={k1} alt="szybka-regeneracja" />
                <h3 className="korzysciTitle">
                    Szybka regeneracja
                </h3>
            </div>
            <div className="korzysciItem" ref={i2}>
                <img className="korzysciImg" src={k2} alt="poprawia-krazenie" />
                <h3 className="korzysciTitle">
                    Poprawia krążenie krwi
                </h3>
            </div>
            <div className="korzysciItem" ref={i3}>
                <img className="korzysciImg" src={k3} alt="rozbija-zakwasy" />
                <h3 className="korzysciTitle">
                    Rozbija zakwasy
                </h3>
            </div>
            <div className="korzysciItem" ref={i4}>
                <img className="korzysciImg" src={k4} alt="zwieksza-zakres-ruchu" />
                <h3 className="korzysciTitle">
                    Zwiększa zakres ruchu
                </h3>
            </div>
            <div className="korzysciItem" ref={i5}>
                <img className="korzysciImg" src={k5} alt="ujedrnia" />
                <h3 className="korzysciTitle">
                    Ujędrnia
                </h3>
            </div>
            <div className="korzysciItem" ref={i6}>
                <img className="korzysciImg" src={k6} alt="dziala-relaksacyjnie" />
                <h3 className="korzysciTitle">
                    Działa relaksacyjnie
                </h3>
            </div>
        </div>
    </section>
}

export default Korzysci;
