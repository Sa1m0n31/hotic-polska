import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { gsap } from 'gsap/all';

import Menu from "./Menu";

import logo from '../static/img/logo.png';
import loudspeaker from '../static/img/loudspeaker.png';
import yt from '../static/img/youtube.svg';
import mobileLanding from '../static/img/mobileLanding.jpg';
import exit from '../static/img/x.png';

import video from '../static/video/video.mp4';
import axios from "axios";
import userIcon from "../static/img/user_circle.svg";
import KontaktModal from "./KontaktModal";

const Landing = () => {
    let landingContent = useRef(null);
    let mobileMenu = useRef(null);
    let mobileMenuChild1 = useRef(null);
    let mobileMenuChild2 = useRef(null);
    let mobileMenuChild3 = useRef(null);
    let modalRef = useRef(null);

    let [loud, setLoud] = useState(false);
    let [user, setUser] = useState("");
    let [modal, setModal] = useState(false);

    useEffect(() => {
        /* Animation */
        gsap.fromTo(landingContent.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
        document.querySelector(".kontaktModal").style.transform = "scaleX(0)";

        /* Check if kontakt */
        if(sessionStorage.getItem('hotic-kontakt') === 'T') {
            setTimeout(() => {
                setModal(true);
            }, 500);
            sessionStorage.removeItem('hotic-kontakt');
        }
        }, []);

    const openMenu = (e) => {
        e.preventDefault();
        gsap.set([mobileMenuChild1.current, mobileMenuChild2.current, mobileMenuChild3.current], { display: "block" });
        gsap.to(mobileMenu.current, { width: "100vw", duration: .4 })
            .then(() => {
               gsap.to([mobileMenuChild1.current, mobileMenuChild2.current, mobileMenuChild3.current], { opacity: 1, duration: .4 });
            });
    }

    const closeMenu = (e) => {
        if(e) {
            e.preventDefault();
        }
        gsap.to([mobileMenuChild1.current, mobileMenuChild2.current, mobileMenuChild3.current], { opacity: 0, duration: .4 })
            .then(() => {
                gsap.to(mobileMenu.current, { width: 0, duration: .4 })
            })
            .then(() => {
                gsap.set([mobileMenuChild1.current, mobileMenuChild2.current, mobileMenuChild3.current], { display: "none" });
            });
    }

    const goTo = (n) => {
        let el;
        switch(n) {
            case 1:
                el = document.querySelector("#massageGun");
                break;
            case 2:
                el = document.querySelector("#opinie");
                break;
            case 3:
                el = document.querySelector("#oNas");
                break;
            default:
                el = -1;
                break;
        }
        closeMenu(0);
        if(el !== -1) {
            el.scrollIntoView({
                top: 0,
                behavior: "smooth"
            });
        }
        else {
            setModal(true);
        }
    }

    useEffect(() => {
        if(modal) {
            gsap.to(document.querySelector(".kontaktModal"), { scaleX: 1, opacity: 1, duration: .4 });
            gsap.to(document.querySelector(".kontaktModalMobile"), { scaleX: 1, opacity: 1, duration: .4 });
            setTimeout(() => {
                gsap.to(document.querySelectorAll(".kontaktModal>*"), { opacity: 1, duration: .5 });
                gsap.to(document.querySelectorAll(".kontaktModalMobile>*"), { opacity: 1, duration: .5 });
            }, 400);
        }
        else {
            setTimeout(() => {
                gsap.to(document.querySelector(".kontaktModal"), { scaleX: 0, duration: .4 });
                gsap.to(document.querySelector(".kontaktModalMobile"), { scaleX: 0, duration: .4 });
            }, 500);
            gsap.to(document.querySelectorAll(".kontaktModal>*"), { opacity: 0, duration: .5 });
            gsap.to(document.querySelectorAll(".kontaktModalMobile>*"), { opacity: 0, duration: .5 });
        }
    }, [modal]);

    return <main className="landing">
        <Menu modal={modal} setModal={setModal} />
        <KontaktModal setModal={setModal} />

        {/*Mobile menu */}
        <button className="hamburgerBtn" onClick={e => openMenu(e)}>
            <span className="hamburgerLine"></span>
            <span className="hamburgerLine"></span>
            <span className="hamburgerLine"></span>
        </button>
        <div className="mobileMenu" ref={mobileMenu}>
            <button className="exitMenu" onClick={(e) => closeMenu(e)} ref={mobileMenuChild1}>
                <img className="exitMenuImg" src={exit} alt="exit" />
            </button>

            <div className="mobileMenuList" ref={mobileMenuChild3}>
                <a href="https://hotic-polska.pl">
                    <img className='landingLogo mobileMenuLogo' src={logo} alt="logo" />
                </a>
                <ul ref={mobileMenuChild2}>
                    <li className="menuItem" onClick={() => goTo(1)}>Massage Gun x8</li>
                    <li className="menuItem" onClick={() => goTo(2)}>Opinie</li>
                    <li className="menuItem"><a href="/o-nas">O nas</a></li>
                    <li className="menuItem" onClick={() => goTo(4)}>Kontakt</li>
                </ul>
            </div>
        </div>

        <video className="landingVideo" autoPlay loop muted={!loud} playsInline={true}>
            <source src={video} type="video/mp4" />
        </video>
        <img className="landingImg" src={mobileLanding} alt="hotic-polska" />

        <div className="landingButtons">
            <a href="https://www.youtube.com/watch?v=VJDhDrGffts" rel="noreferrer" className="youtubeLink" target="_blank">
                <img className="loudspeakerBtnImg" src={yt} alt="youtube-link" />
            </a>
            <button className="loudspeakerBtn" onClick={() => { setLoud(!loud) } }>
                <img className="loudspeakerBtnImg" id={loud ? "opacity-1" : ""} src={loudspeaker} alt="mute" />
            </button>
        </div>

        <div className="landingText" ref={landingContent}>
            <h1 className="landingTextMain">
                Pistolet do masażu<br/>to Twoja <span className="przewagaUnderline">przewaga!</span>
            </h1>
            <button className="landingTextCTABtn">
                            <a href="/kup-teraz">
                                Kup teraz
                            </a>
            </button>
        </div>

        <img className='landingLogo' src={logo} alt="logo" />
    </main>
}

export default Landing;
