import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import axios from 'axios';

import PageHeader from "../PageHeader";
import Footer from "../Footer";

import location from '../../static/img/location.svg'
import GeolocationWidget from "../GeolocationWidget";
import x from '../../static/img/x.png'
import arrowRight from '../../static/img/caret_right.svg'
import skorka1 from '../../static/img/skorka-1.jpg'
import skorka2 from '../../static/img/skorka-2.jpg'
import check from '../../static/img/check.svg'
import longArrow from "../../static/img/long_right.svg";
import whiteCheck from '../../static/img/check_white.svg'
import Toast from "../Toast";
import gsap from "gsap/all";
import Loader from "react-loader-spinner";
import KoszykBottom from "../KoszykBottom";

import showKoszykUtil from "../../helpers/showKoszyk";
import wrocDoSklepuUtil from "../../helpers/wrocDoSklepuUtil";

import { loadReCaptcha, ReCaptcha } from 'react-recaptcha-v3';

Modal.setAppElement("#root");

export default class DostawaStep3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            faktura: false,
            newsletter: false,
            regulamin: false,
            imie: '',
            nazwisko: '',
            telefon: '',
            mail: '',
            ulica: '',
            budynek: '',
            mieszkanie: '',
            kod: '',
            miasto: '',
            firma: '',
            nip: '',
            ulicaF: '',
            budynekF: '',
            mieszkanieF: '',
            kodF: '',
            miastoF: '',
            skorka: parseInt(localStorage.getItem('skorka')),
            ilosc: parseInt(localStorage.getItem('ilosc')),
            dostawa: sessionStorage.getItem('dostawa'),
            kwota: 0,
            description: 'Test',
            url: 'https://hotic-polska.pl',
            error: '',
            loaded: false,
            pobranie: false,
            toastWrapper: React.createRef(),
            cena: 500,
            nazwa: "Massage Gun",
            cenaLoaded: false,
            isVerified: false
        }
        this.verifyCallback = this.verifyCallback.bind(this);
        this.goPay = this.goPay.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.defaults.headers.common['X-Frame-Options'] = 'DENY'; // for all requests
        axios.defaults.headers.common['Content-Type'] ='application/x-www-form-urlencoded';

        /* Load ReCaptcha */
        loadReCaptcha('6Ldw3W8aAAAAAH7MeDwcVMB8MJZ1NUy5O81tHp-U', () => {
            // Empty callback
        });

        /* Jesli nie ma produktow w koszyku - wroc */
        if((localStorage.getItem('ilosc') < 1)||(isNaN(localStorage.getItem('ilosc')))) {
            window.location.href = "/kup-teraz";
        }

        /* Get product data */
        axios.get("https://hotic-polska.pl/product-data")
            .then((res) => {
                if(res.data.productData) {
                    this.setState({
                        cena: res.data.productData[0].cena,
                        nazwa: res.data.productData[0].nazwa,
                        cenaLoaded: true
                    });
                }
            });

        /* Sprawdzenie czy przelew czy pobranie */
        if((sessionStorage.getItem('dostawa') === 'kurier dpd (pobranie)')||(sessionStorage.getItem('dostawa') === 'kurier dhl (pobranie)')||(sessionStorage.getItem('paczkomaty (pobranie)'))) {
            this.setState({
                pobranie: true
            });
        }
        /* Sprawdzenie czy uzytkownik zalogowany */
        let token = localStorage.getItem('token');
        if(token) {
            axios.post("https://hotic-polska.pl/user/verify", {
                token
            })
                .then((res) => {
                    if(res.data.loggedIn === 1) {
                        axios.post("https://hotic-polska.pl/get-user", {
                            token: localStorage.getItem('token')
                        })
                            .then(res => {
                                if(res.data.faktura.firma) {
                                        this.setState({
                                            imie: res.data.imie,
                                            nazwisko: res.data.nazwisko,
                                            telefon: res.data.telefon,
                                            email: res.data.email,
                                            ulica: res.data.ulica,
                                            budynek: res.data.budynek,
                                            mieszkanie: res.data.mieszkanie,
                                            kod: res.data.kod,
                                            miasto: res.data.miasto,
                                            firma: res.data.faktura.firma,
                                            nip: res.data.faktura.nip,
                                            ulicaF: res.data.faktura.ulica,
                                            budynekF: res.data.faktura.budynek,
                                            mieszkanieF: res.data.faktura.mieszkanie,
                                            kodF: res.data.faktura.kod,
                                            miastoF: res.data.faktura.miasto,
                                            loaded: true
                                        });
                                }
                                else {
                                    this.setState({
                                        imie: res.data.imie,
                                        nazwisko: res.data.nazwisko,
                                        telefon: res.data.telefon,
                                        email: res.data.email,
                                        ulica: res.data.ulica,
                                        budynek: res.data.budynek,
                                        mieszkanie: res.data.mieszkanie,
                                        kod: res.data.kod,
                                        miasto: res.data.miasto,
                                        loaded: true
                                    });
                                }
                            });
                    }
                    else {
                        this.setState({
                            loaded: true
                        });
                    }
                })
        }
        else {
            this.setState({
                loaded: true
            });
        }
    }

    verifyCallback(token) {
        if(token) {
            this.setState({
                isVerified: true
            });
        }
    }

    async handleSubmit() {
        /* Imie */
        if(this.state.imie === '') {
                this.setState({
                    error: 'Uzupełnij pole imię'
                });
                return 0;
        }
        /* Nazwisko */
        if(this.state.nazwisko === '') {
            this.setState({
                error: 'Uzupełnij pole nazwisko'
            });
            return 0;
        }
        /* Telefon */
        if(this.state.telefon === '') {
            this.setState({
                error: 'Wpisz swój numer telefonu'
            });
            return 0;
        }
        if(!this.checkPhoneNumber(this.state.telefon)) {
            this.setState({
                error: 'Niepoprawny numer telefonu'
            });
            return 0;
        }
        /* Mail */
        if(!this.checkEmail(this.state.email)) {
            this.setState({
                error: 'Niepoprawny adres email'
            });
            return 0;
        }
        /* Ulica */
        if(this.state.ulica === '') {
            this.setState({
                error: 'Niepoprawny adres'
            });
            return 0;
        }
        /* Kod pocztowy */
        if(this.state.kod.length !== 6) {
            this.setState({
                error: 'Niepoprawny kod pocztowy'
            });
            return 0;
        }
        /* Miasto */
        if(this.state.miasto === '') {
            this.setState({
                error: 'Niepoprawny adres'
            });
            return 0;
        }

        /* Faktura VAT */
        if(this.state.faktura) {
            /* Firma */
            if(this.state.firma === '') {
                this.setState({
                    error: "Wpisz nazwę swojej firmy"
                });
                return 0;
            }
            /* NIP */
            if(1) {

            }
        }

        /* Regulamin */
        if(!this.state.regulamin) {
            await this.setState({
                error: 'Wymagana jest akceptacja regulaminu'
            });
            return 0;
        }

        /* Recaptcha */
        if(!this.state.isVerified) return 0;

        /* Jesli wszystko okej */
        await this.setState({
            error: ""
        });

    }

    checkEmail(email) {
        return true;
    }

    checkPhoneNumber(number) {
        return true;
    }

    async goPay(e) {
        e.preventDefault();
        let paymentUri = "https://secure.przelewy24.pl/trnRequest/";

        /* Walidacja formularza */
        await this.handleSubmit();
        if(this.state.error !== '') {
            gsap.fromTo(this.state.toastWrapper.current, { x: "-50%", y: 100, opacity: 0 }, { x: "-50%", y: 0, opacity: 1, duration: .5 });
            setTimeout(() => {
                gsap.to(this.state.toastWrapper.current, { opacity: 0, duration: .5 });
            }, 2000);
            return 0;
        }
        else {
            /* Jeśli pobranie - przekierowujemy do strony potwierdzającej zamówienie */
            if(this.state.pobranie) {
                localStorage.setItem('oplacono', 'T');
                sessionStorage.setItem('pobranieDone', 'T');
                window.location.href = '/oplacono';
            }

            const cena = parseFloat(this.state.ilosc * this.state.cena + parseFloat(localStorage.getItem('cena-wysylki')));

            if(!isNaN(cena)) {
                /* Przygotowanie zadania http pod endpoint /payment */
                await axios.post("https://hotic-polska.pl/payment", {
                    /* Dane osoby */
                    firstname: this.state.imie,
                    lastname: this.state.nazwisko,
                    email: this.state.email,
                    telefon: this.state.telefon,
                    /* Dane zamowienia */
                    amount: cena,
                    skorka: this.state.skorka,
                    description: this.state.description,
                    url: this.state.url,
                    sztuki: this.state.ilosc,
                    /* Adres osoby */
                    ulica: this.state.ulica,
                    budynek: this.state.budynek,
                    mieszkanie: this.state.mieszkanie,
                    kod: this.state.kod,
                    miasto: this.state.miasto,
                    /* Dostawa */
                    dostawa: this.state.dostawa,
                    paczkomatAdres: sessionStorage.getItem('paczkomat-adres'),
                    paczkomatKod: sessionStorage.getItem('paczkomat-kod'),
                    paczkomatMiasto: sessionStorage.getItem('paczkomat-miasto'),
                    /* Dane firmy */
                    firma: this.state.firma,
                    nip: this.state.nip,
                    ulicaF: this.state.ulicaF,
                    budynekF: this.state.budynekF,
                    mieszkanieF: this.state.mieszkanieF,
                    kodF: this.state.kodF,
                    miastoF: this.state.miastoF
                })
                    .then(res => {
                        let token = res.data.responseToClient;
                        localStorage.setItem('oplacono', 'T');
                        window.location.href = `${paymentUri}${token}`;
                    });
            }
        }
    }

    handleChange(e) {
        e.preventDefault();
        if(e.target.name === 'faktura') {
            this.setState((prevState) => (
                {
                    faktura: !prevState.faktura
                }
            ));
        }
        else if(e.target.name === 'newsletter') {
            this.setState((prevState) => (
                {
                    newsletter: !prevState.newsletter
                }
            ));
        }
        else if(e.target.name === 'regulamin') {
            this.setState((prevState) => (
                {
                    regulamin: !prevState.regulamin
                }
            ));
        }
        else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    incrementIlosc = () => {
        this.setState((prevState) => {
            return {
                ilosc: prevState.ilosc+1
            }
        });
    }

    decrementIlosc = () => {
        this.setState((prevState) => {
            return {
                ilosc: prevState.ilosc - 1
            }
        });
    }

    setIloscFromChild = (n) => {
        this.setState({
            ilosc: n
        });
    }

    changeSkorka = (n) => {
        this.setState({
            skorka: n
        })
        localStorage.setItem('skorka', n.toString());
    }

    showKoszyk = async (add = true, skorkaFirst = 1) => {
        showKoszykUtil();
    }

    wrocDoSklepu = () => {
        wrocDoSklepuUtil();
    }

    render() {
        return <>
            <div className="dostawaStep1Container">
                <PageHeader ilosc={this.state.ilosc} showKoszyk={this.showKoszyk} disabled={true} />
                <main className="dostawaStep2Inner">
                    <div className="dostawaSposobDostawy">
                        <h2 className="dostawaSposobDostawyHeader">
                            Dane zamawiającego
                        </h2>

                        {!this.state.loaded ? <div className="loaderWrapper loaderCenter"><Loader type="grid" color="#F1602A" /></div> : <form className="daneDostawyForm" method="POST">
                            <label>
                                Imię
                                <input className="zalogujInput inputImie" type="text" name="imie"
                                       value={this.state.imie}
                                       onChange={e => this.handleChange(e)}
                                />
                            </label>
                            <label>
                                Nazwisko
                                <input className="zalogujInput inputNazwisko" type="text" name="nazwisko"
                                       value={this.state.nazwisko}
                                       onChange={e => this.handleChange(e)}
                                />
                            </label>
                            <label>
                                Numer telefonu
                                <input className="zalogujInput inputTelefon" type="text" name="telefon"
                                       value={this.state.telefon}
                                       onChange={e => this.handleChange(e)}
                                />
                            </label>
                            <label>
                                Adres email
                                <input className="zalogujInput inputEmail" type="email" name="email"
                                       value={this.state.email}
                                       onChange={e => this.handleChange(e)}
                                />
                            </label>
                            <div className="formOneLine">
                                <label className="ulicaLabel">
                                    Ulica
                                    <input className="zalogujInput inputUlica" type="text" name="ulica"
                                           value={this.state.ulica}
                                           onChange={e => this.handleChange(e)}
                                    />
                                </label>
                                <label className="budynekLabel">
                                    Nr budynku
                                    <input className="zalogujInput inputBudynek" type="text" name="budynek"
                                           value={this.state.budynek}
                                           onChange={e => this.handleChange(e)}
                                    />
                                </label>
                                <label className="mieszkanieLabel">
                                    Nr mieszkania
                                    <input className="zalogujInput inputMieszkanie" type="text" name="mieszkanie"
                                           value={this.state.mieszkanie}
                                           onChange={e => this.handleChange(e)}
                                    />
                                </label>
                            </div>
                            <div className="formOneLine">
                                <label>
                                    Kod pocztowy
                                    <input className="zalogujInput inputKodPocztowy" type="text" name="kod"
                                           value={this.state.kod}
                                           onChange={e => this.handleChange(e)}
                                    />
                                </label>
                                <label>
                                    Miasto
                                    <input className="zalogujInput inputMiasto" type="text" name="miasto"
                                           value={this.state.miasto}
                                           onChange={e => this.handleChange(e)}
                                    />
                                </label>
                            </div>
                            <label className="fakturaCheckLabel">
                                <button name="faktura" className={!this.state.faktura ? "fakturaCheck" : "fakturaCheck fakturaChecked"} onClick={(e) => this.handleChange(e)}>
                                    <img className={this.state.faktura ? "fakturaChecked" : "dNone"} src={check} alt="ok" />
                                </button>
                                Chcę otrzymać fakturę VAT
                            </label>

                            {this.state.faktura ? <div className="fakturaVAT">
                                <h3 className="dostawaSposobDostawyHeader">
                                    Dane do faktury
                                </h3>
                                <label>
                                    Nazwa firmy
                                    <input className="zalogujInput inputFirma" type="text" name="firma"
                                           value={this.state.firma}
                                           onChange={e => this.handleChange(e)}
                                    />
                                </label>
                                <label>
                                    NIP
                                    <input className="zalogujInput inputNIP" type="text" name="nip"
                                           value={this.state.nip}
                                           onChange={e => this.handleChange(e)}
                                    />
                                </label>
                                <div className="formOneLine">
                                    <label className="ulicaLabel">
                                        Ulica
                                        <input className="zalogujInput inputUlica" type="text" name="ulicaF"
                                               value={this.state.ulicaF}
                                               onChange={e => this.handleChange(e)}
                                        />
                                    </label>
                                    <label className="budynekLabel">
                                        Nr budynku
                                        <input className="zalogujInput inputBudynek" type="text" name="budynekF"
                                               value={this.state.budynekF}
                                               onChange={e => this.handleChange(e)}
                                        />
                                    </label>
                                    <label className="mieszkanieLabel">
                                        Nr mieszkania
                                        <input className="zalogujInput inputMieszkanie" type="text" name="mieszkanieF"
                                               value={this.state.mieszkanieF}
                                               onChange={e => this.handleChange(e)}
                                        />
                                    </label>
                                </div>
                                <div className="formOneLine">
                                    <label>
                                        Kod pocztowy
                                        <input className="zalogujInput inputKodPocztowy" type="text" name="kodF"
                                               value={this.state.kodF}
                                               onChange={e => this.handleChange(e)}
                                        />
                                    </label>
                                    <label>
                                        Miasto
                                        <input className="zalogujInput inputMiasto" type="text" name="miastoF"
                                               value={this.state.miastoF}
                                               onChange={e => this.handleChange(e)}
                                        />
                                    </label>
                                </div>
                            </div> : ""}
                        </form>}

                        <label className="fakturaCheckLabel">
                            <button name="regulamin" className={!this.state.regulamin ? "fakturaCheck" : "fakturaCheck fakturaChecked"} onClick={(e) => this.handleChange(e)}>
                                <img className={this.state.regulamin ? "fakturaChecked" : "dNone"} src={check} alt="ok" />
                            </button>
                            Akceptuję <a href="/regulamin">Regulamin</a>  oraz<br/> <a href="/polityka-prywatnosci">Politykę prywatności</a>.
                        </label>

                        <div className="recaptcha">
                            <ReCaptcha
                                sitekey="6Ldw3W8aAAAAAH7MeDwcVMB8MJZ1NUy5O81tHp-U"
                                render="implicit"
                                verifyCallback={this.verifyCallback}
                            />
                        </div>
                        <div className="recaptchaInfo">
                            This site is protected by reCAPTCHA and the Google
                            <a href="https://policies.google.com/privacy" rel="preconnect"> Privacy Policy</a> and
                            <a href="https://policies.google.com/terms" ref="preconnect"> Terms of Service</a> apply.
                        </div>
                    </div>
                    <button type="submit" className="innowacyjnaPomocBtn zamawiamIPlaceBtn hoverBtn" onClick={e => this.goPay(e)}>
                        Zamawiam {this.state.pobranie ? "" : 'i płacę'}
                        <img className="longArrow" src={whiteCheck} alt="strzalka" />
                    </button>

                    <div className="dostawaKoszyk">
                        {this.state.cenaLoaded ? <>
                        <h2 className="dostawaSposobDostawyHeader">
                            Twój koszyk
                        </h2>

                        <div className="dostawaKoszykInner">
                            <div className="dostawaKoszykInnerFirstRow">
                                <img className="dostawaKoszykInnerImg" src={skorka1} alt="pistolet" />
                                <div className="dostawaKoszykInnerFirstRowInfo">
                                    <h3>{this.state.nazwa}</h3>
                                    <div className="dostawaKoszykInnerFirstRowInfoThin">
                                        <h4>Skórka: {localStorage.getItem('skorka')}</h4>
                                        <h4>Ilość: {localStorage.getItem('ilosc')}</h4>
                                    </div>
                                    <h5>{this.state.cena} PLN</h5>
                                </div>
                            </div>
                            <div className="dostawaKoszykInnerSecondRow">
                                <div className="dostawaKoszykSuma">
                                    <h4 className="thin">Suma:</h4>
                                    <h5>{parseInt(localStorage.getItem('ilosc')) * this.state.cena} PLN</h5>
                                </div>
                                <div className="dostawaKoszykKosztWysylki">
                                    <h4 className="thin">Koszt wysyłki:</h4>
                                    <h4>{localStorage.getItem('cena-wysylki') ? localStorage.getItem('cena-wysylki') : "0"} PLN</h4>
                                </div>
                            </div>
                            <div className="dostawaKoszykInnerSecondRow dostawaKoszykInnerThirdRow">
                                <div className="dostawaKoszykSuma">
                                    <h4 className="thin">Do zapłaty:</h4>
                                    <h5>{localStorage.getItem('cena-wysylki') ? parseInt(localStorage.getItem('ilosc')) * this.state.cena + parseFloat(localStorage.getItem('cena-wysylki')) : parseInt(localStorage.getItem('ilosc')) * this.state.cena} PLN</h5>
                                </div>
                            </div>
                        </div></> : <div className="loaderKoszyk"><Loader type="grid" color="#f1602A" /></div>}
                    </div>
                </main>


            </div>
            <div className="toastWrapper" ref={this.state.toastWrapper}>
                <Toast error={this.state.error} />
            </div>
            <Footer />
            <KoszykBottom ilosc={this.state.ilosc} skorka={this.state.skorka} cena={500}
                          wroc={this.wrocDoSklepu} increment={this.incrementIlosc} decrement={this.decrementIlosc}
                          setIloscFromChild={this.setIloscFromChild} changeSkorka={this.changeSkorka}
                          nextStep="/dostawa-step-1" disabled={true}
            />
        </>
    }

}
