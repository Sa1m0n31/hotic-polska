import React from 'react'

let koszyk, ilosc = 0, skorka = 1;
if(localStorage.getItem("ilosc")) {
    ilosc = parseInt(localStorage.getItem('ilosc'));
}
if(localStorage.getItem('skorka')) {
    skorka = parseInt(localStorage.getItem('skorka'));
}

koszyk = {
    ilosc,
    skorka
};

const KoszykContext = React.createContext(koszyk);
export default KoszykContext;
