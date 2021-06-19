import React from 'react';

import facebook from '../static/img/facebook.svg'
import instagram from '../static/img/instagram.svg'
import youtube from '../static/img/youtube.svg'

const Footer = () => {
    return <footer className="footer">
        <div className="footerBottom">
            <menu className="footerBottomMenu">
                <div className="footerBottomMenuItem">
                    <a href="/polityka-prywatnosci">Polityka prywatności</a>
                </div>
                <div className="footerBottomMenuItem">
                    <a href="/regulamin">Regulamin</a>
                </div>
                <div className="footerBottomMenuItem">
                    <a href="/zwroty-i-reklamacje">Zwroty i reklamacje</a>
                </div>
                <div className="footerBottomMenuItem">
                    <a href="/opcje-wysylki">Opcje wysyłki</a>
                </div>
            </menu>
        </div>

        <div className="socialMedia">
            <a target="_blank" href="https://www.facebook.com/Hotic-Polska-102868358532352" rel="noreferrer" className="socialMediaIconA">
                <img className="socialMediaIcon" src={facebook} alt="facebook" />
            </a>
            <a target="_blank" href="https://www.instagram.com/hotic_polska/" rel="noreferrer" className="socialMediaIconA">
                <img className="socialMediaIcon" src={instagram} alt="instagram" />
            </a>
            <a target="_blank" href="https://www.youtube.com/channel/UCKuXPvSzfHxBThYvGuoWIZQ?fbclid=IwAR1zPXrsxy8IWM_W8kTZjU8VX2IyFX-mf5EHwZ2SXtczyhW_AYdVNcdOVcw" rel="noreferrer" className="socialMediaIconA">
                <img className="socialMediaIcon" src={youtube} alt="youtube" />
            </a>
        </div>
        <h6 className="footerBottomCaption">
            © {new Date().getFullYear()} HOTIC-POLSKA wszelkie prawa zastrzeżone
        </h6>
        <h6 className="footerBottomCaption footerBottomCaption2">
            Projekt i wykonanie: <a href="https://skylo.pl" rel="noreferrer">skylo.pl</a>
        </h6>
    </footer>
}

export default Footer;
