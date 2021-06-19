import React, {useEffect, useRef} from 'react';

import { gsap, ScrollTrigger } from 'gsap/all';

import pistolet from '../static/img/pistolet-kup-teraz.png';

const InnowacyjnaPomoc = () => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(h1.current, { y: 200, opacity: 0 }, { y: 0, opacity: 1, duration: .5, scrollTrigger: {
                trigger: "#massageGun",
                start: "top 70%"
            } });
        gsap.fromTo(h2.current, { y: 200, opacity: 0 }, { y: 0, opacity: 1, duration: .5, scrollTrigger: {
                trigger: "#massageGun",
                start: "top 60%"
            } });
        gsap.fromTo(img.current, { y: 200, opacity: 0 }, { y: 0, opacity: 1, duration: .5, scrollTrigger: {
                trigger: "#massageGun",
                start: "top 30%"
            } });
        gsap.fromTo(txt.current, { y: 200, opacity: 0 }, { y: 0, opacity: 1, duration: .5, scrollTrigger: {
                trigger: "#massageGun",
                start: "top 10%"
            } });
        gsap.fromTo(btn.current, { y: 150, opacity: 0 }, { y: 0, opacity: 1, duration: .5, scrollTrigger: {
                trigger: "#massageGun",
                start: "top 2%"
            } });
    });

    let h1 = useRef(null);
    let h2 = useRef(null);
    let img = useRef(null);
    let txt = useRef(null);
    let btn = useRef(null);

    return <section className="innowacyjnaPomoc" id="massageGun">
        <h1 className="sectionHeader innowacyjnaPomocHeader" ref={h1}>
            Innowacyjna pomoc w regeneracji mięśni
        </h1>
        <h2 className="innowacyjnaPomocSubheader" ref={h2}>
            Wykonany do użytku profesjonalnego i osobistego, pistolet do masażu jest pewną inwestycją w Twoje ciało.
        </h2>

        <div className="innowacyjnaPomocImgWrapper" ref={img}>
            <img className="innowacyjnaPomocImg" src={pistolet} alt="pistolet" />
        </div>

        <p className="innowacyjnaPomocText" ref={txt}>
            Nasza najbardziej zaawansowana technologia zapewnia ciche narzędzie terapeutyczne, <span className="bold">któremu zaufali profesjonalni sportowcy i terapeuci</span>.
        </p>

        <button className="innowacyjnaPomocBtn hoverBtn" ref={btn}>
            <a href="./kup-teraz">
                Kup teraz
            </a>
        </button>

    </section>
}

export default InnowacyjnaPomoc;
