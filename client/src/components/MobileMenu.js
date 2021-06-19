import React from 'react';

import userIcon from '../static/img/user_circle.svg';

const MobileMenu = () => {
    return <menu className="mobileMenu">
        <ul className="mainMobileList">
            <li className="menuMobileItem">Massage Gun x8</li>
            <li className="menuMobileItem">Opinie</li>
            <li className="menuMobileItem">O nas</li>
            <li className="menuMobileItem">Kontakt</li>
            <li className="menuMobileItem menuMobileItemBordered">
                <img className="menuUserIcon" src={userIcon} alt="zaloguj-zarejestruj" />
                Zaloguj / Zarejestruj
            </li>
        </ul>
    </menu>
}

export default MobileMenu;
