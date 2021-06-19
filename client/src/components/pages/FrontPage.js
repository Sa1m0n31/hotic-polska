import React from 'react';

import Landing from "../Landing";
import InnowacyjnaPomoc from "../InnowacyjnaPomoc";
import Korzysci from "../Korzysci";
import KorzysciWhite from "../KorzysciWhite";
import Opinie from "../Opinie";
import Regeneracja from "../Regeneracja";
import Footer from "../Footer";
import OverFooter from "../OverFooter";
import {AnimatePresence, motion} from "framer-motion";

const FrontPage = () => {
    return <AnimatePresence>
        <motion.div
            key={1}
            initial={{opacity: 0, x: -window.innerWidth}}
            animate={{opacity: 1, x: 0, duration: 5}}
            transition={{type: 'tween'}}
            exit={{y: 1000}} >
    <div className="container">
        <button className="loginMobileBtn">
            <a href="/zaloguj-zarejestruj">
                {localStorage.getItem('token') ? "Mój profil" : "Zaloguj się"}
            </a>
        </button>
        <Landing />
        <InnowacyjnaPomoc />
        <Korzysci />
        <KorzysciWhite />
        <Opinie />
        <Regeneracja />
        <OverFooter />
        <Footer />
    </div>
        </motion.div>
    </AnimatePresence>
}

export default FrontPage;
