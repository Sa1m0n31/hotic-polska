import React from 'react'
import PageHeader from "../PageHeader";
import Footer from "../Footer";
import check from "../../static/img/check.svg";
import axios from "axios";
import Toast from "../Toast";
import gsap from "gsap/all";
import Loader from "react-loader-spinner";
import KoszykContext from "../../helpers/KoszykContext";
import KoszykBottom from "../KoszykBottom";

import showKoszykUtil from "../../helpers/showKoszyk";
import wrocDoSklepuUtil from "../../helpers/wrocDoSklepuUtil";
import { loadReCaptcha, ReCaptcha } from "react-recaptcha-v3";

export default class ZalogujZarejestrujPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /* Logowanie */
            username: "",
            password: "",
            /* Rejestracja */
            imie : "",
            nazwisko: "",
            email: "",
            telefon: "",
            ulica: "",
            budynek: "",
            mieszkanie: "",
            kod: "",
            miasto: "",
            registerPassword: "",
            registerRepeatPassword: "",
            regulamin: false,
            error: "",
            isVerified: false,
            loading: false,
            ilosc: 0,
            toastWrapper: React.createRef()
        }
        this.verifyCallback = this.verifyCallback.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    }

    componentDidMount() {
        /* Load recaptcha */
        loadReCaptcha('6Ldw3W8aAAAAAH7MeDwcVMB8MJZ1NUy5O81tHp-U');

        /* If user logged in - redirect to /profile page */
        let token = localStorage.getItem('token');
        if (token) {
            axios.post("https://hotic-polska.pl/user/verify", {
                token
            })
                .then(res => {
                    if (res.data.loggedIn === 1) {
                        window.location = "/profile";
                    }
                });
        }
        let ilosc = localStorage.getItem('ilosc');
        if(ilosc) {
            this.setState({
                ilosc: parseInt(ilosc)
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

    handleChange(e) {
        e.preventDefault();
        if(e.target.name === 'regulamin') {
            this.setState((prevState) => ({
                    regulamin: !prevState.regulamin
                }
            ));
        }
        else {
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    }

    handleLoginSubmit(e) {
        e.preventDefault();
        this.setState({
            loading: true
        });
        /* Walidacja formularza */
        if((this.state.username === "")||(this.state.password === "")) {
            this.setState({
                error: "Wypełnij pola formularza"
            }, () => {
               this.toastCallback();
                this.setState({
                    loading: false
                });
            });
            return 0;
        }

        /* Wyslanie zadania do API */
        axios.post("https://hotic-polska.pl/login-user", {
            username: this.state.username,
            password: this.state.password
        })
            .then(res => {
                if(res.data.loggedIn === 1) {
                    /* Login successful */
                    localStorage.setItem("token", res.data.token);
                    window.location = "/";
                }
                else {
                    /* Login not successful */
                    this.setState({
                        loading: false,
                        error: "Niepoprawne dane logowania"
                    }, () => {
                        this.toastCallback();
                    });
                }
            })
    }

    toastCallback() {
            gsap.fromTo(this.state.toastWrapper.current, { x: "-50%", y: 100, opacity: 0 }, { x: "-50%", y: 0, opacity: 1, duration: .5 });
            setTimeout(() => {
                gsap.to(this.state.toastWrapper.current, { opacity: 0, duration: .5 });
            }, 2000);
    }

    handleRegisterSubmit(e) {
        e.preventDefault();

        /* Walidacja formularza */
        if(!this.state.regulamin) {
            this.setState({
                error: "Zaakceptuj regulamin i politykę prywatności"
            }, () => {
                this.toastCallback();
            });
            return 0;
        }
        if(this.state.registerPassword !== this.state.registerRepeatPassword) {
            this.setState({
                error: "Podane hasła nie są identyczne"
            }, () => {
                this.toastCallback();
            });
            return 0;
        }
        if(this.state.registerPassword.length < 6) {
            this.setState({
                error: "Hasło powinno mieć co najmniej 6 znaków długości"
            }, () => {
                this.toastCallback();
            });
            return 0;
        }
        if(!this.state.imie.length) {
            this.setState({
                error: "Wpisz swoje imię"
            }, () => {
                this.toastCallback();
            });
            return 0;
        }
        if(!this.state.nazwisko.length) {
            this.setState({
                error: "Wpisz swoje nazwisko"
            }, () => {
                this.toastCallback();
            });
            return 0;
        }
        if((this.state.telefon.length < 9)||(this.state.telefon.length > 15)) {
            this.setState({
                error: "Niepoprawny numer telefonu"
            }, () => {
                this.toastCallback();
            });
            return 0;
        }
        if((!this.state.ulica.length)||(!this.state.budynek.length)||(!this.state.kod.length)||(!this.state.miasto.length)) {
            this.setState({
                error: "Wpisz swój adres zamieszkania"
            }, () => {
                this.toastCallback();
            });
            return 0;
        }
        if(this.state.kod.length !== 6) {
            this.setState({
                error: "Niepoprawny kod pocztowy"
            }, () => {
                this.toastCallback();
            });
            return 0;
        }

        /* ReCaptcha */
        if(!this.state.isVerified) return 0;

        /* Wyslanie zadania do API */
        axios.post("https://hotic-polska.pl/register-user", {
            email: this.state.email,
            password: this.state.registerPassword,
            telefon: this.state.telefon,
            imie: this.state.imie,
            nazwisko: this.state.nazwisko,
            ulica: this.state.ulica,
            budynek: this.state.budynek,
            mieszkanie: this.state.mieszkanie,
            kod: this.state.kod,
            miasto: this.state.miasto
        })
            .then(res => {
                if(res.data.error !== 0) {
                    /* Uzytkownik o podanym adresie email juz istnieje */
                    this.setState({
                        error: "Użytkownik o podanym adresie email już istnieje"
                    })
                }
                else {
                    /* Uzytkownik dodany do bazy */
                    sessionStorage.setItem("hotic-zarejestrowano", "T");
                    window.location.href = "/zarejestrowano"
                }
            })
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
                <PageHeader ilosc={this.state.ilosc} showKoszyk={this.showKoszyk} />
                <main className="dostawaStep1">
                    <div className="dostawaStep1FormContainer">
                        <div className="dostawaStep1Zaloguj">
                            <h2 className="dostawaZalogujHeader">
                                Zaloguj się
                            </h2>
                            <h3 className="dostawaZalogujSubheader">
                                Wpisz dane podane przy rejestracji i przejdź dalej
                            </h3>
                            {this.state.loading ? <div className="loaderWrapper"><Loader type="grid" color="#F1602A" /></div> : <form method="POST" className="zalogujForm" onSubmit={e => this.handleLoginSubmit(e)}>
                                <input className="zalogujInput" type="text" name="username" placeholder="Email"
                                       value={this.state.username}
                                       onChange={e => this.handleChange(e)}
                                />
                                <input className="zalogujInput" type="password" name="password" placeholder="Hasło"
                                       value={this.state.password}
                                       onChange={e => this.handleChange(e)}
                                />
                                <button type="submit" className="zalogujBtn hoverBtn">
                                    Zaloguj się
                                </button>
                            </form>}
                        </div>

                        <div className="dostawaStep1BezRejestracji">
                            <h2 className="dostawaZalogujHeader">
                                Zarejestruj się
                            </h2>
                            <h3 className="dostawaZalogujSubheader">
                                Dołącz do naszej społeczności
                            </h3>

                            <form method="POST" className="zalogujForm zarejestrujForm" onSubmit={e => this.handleRegisterSubmit(e)}>
                                    <label>
                                        <input className="zalogujInput" type="text" name="imie"
                                               value={this.state.imie}
                                               onChange={e => this.handleChange(e)}
                                               placeholder="Imię"
                                        />
                                    </label>
                                    <label>
                                        <input className="zalogujInput" type="text" name="nazwisko"
                                               value={this.state.nazwisko}
                                               onChange={e => this.handleChange(e)}
                                               placeholder="Nazwisko"
                                        />
                                    </label>
                                    <label>
                                        <input className="zalogujInput" type="text" name="telefon"
                                               value={this.state.telefon}
                                               onChange={e => this.handleChange(e)}
                                               placeholder="Nr telefonu"
                                        />
                                    </label>
                                    <label>
                                        <input className="zalogujInput" type="email" name="email"
                                               value={this.state.email}
                                               onChange={e => this.handleChange(e)}
                                               placeholder="Adres email"
                                        />
                                    </label>
                                    <label>
                                 <input className="zalogujInput" type="password" name="registerPassword" placeholder="Hasło"
                                           value={this.state.registerPassword}
                                           onChange={e => this.handleChange(e)}
                                    />
                                    </label>
                                <label>
                                    <input className="zalogujInput" type="password" name="registerRepeatPassword" placeholder="Powtórz hasło"
                                           value={this.state.registerRepeatPassword}
                                           onChange={e => this.handleChange(e)}
                                    />
                                </label>
                                    <div className="formOneLine">
                                        <label className="ulicaLabel">
                                            <input className="zalogujInput inputUlica" type="text" name="ulica"
                                                   value={this.state.ulica}
                                                   onChange={e => this.handleChange(e)}
                                                   placeholder="Ulica"
                                            />
                                        </label>
                                        <label className="budynekLabel">
                                            <input className="zalogujInput inputBudynek" type="text" name="budynek"
                                                   value={this.state.budynek}
                                                   onChange={e => this.handleChange(e)}
                                                   placeholder="Budynek"
                                            />
                                        </label>
                                        <label className="mieszkanieLabel">
                                            <input className="zalogujInput inputMieszkanie" type="text" name="mieszkanie"
                                                   value={this.state.mieszkanie}
                                                   onChange={e => this.handleChange(e)}
                                                   placeholder="Mieszkanie"
                                            />
                                        </label>
                                    </div>
                                    <div className="formOneLine">
                                        <label>
                                            <input className="zalogujInput inputKodPocztowy" type="text" name="kod"
                                                   value={this.state.kod}
                                                   onChange={e => this.handleChange(e)}
                                                   placeholder="Kod pocztowy"
                                            />
                                        </label>
                                        <label>
                                            <input className="zalogujInput inputMiasto" type="text" name="miasto"
                                                   value={this.state.miasto}
                                                   onChange={e => this.handleChange(e)}
                                                   placeholder="Miasto"
                                            />
                                        </label>
                                    </div>

                                        <ReCaptcha
                                            sitekey="6Ldw3W8aAAAAAH7MeDwcVMB8MJZ1NUy5O81tHp-U"
                                            render="implicit"
                                            onLoadCallback={() => { console.log("RECAPTCHA LOADED") }}
                                            verifyCallback={this.verifyCallback}
                                        />
                                <label className="fakturaCheckLabel">
                                    <button name="regulamin" className={!this.state.regulamin ? "fakturaCheck" : "fakturaCheck fakturaChecked"} onClick={(e) => this.handleChange(e)}>
                                        <img className={this.state.regulamin ? "fakturaChecked" : "dNone"} src={check} alt="ok" />
                                    </button>
                                    Akceptuję Regulamin oraz Politykę prywatności.
                                </label>

                                <div className="recaptchaInfo">
                                    This site is protected by reCAPTCHA and the Google
                                    <a href="https://policies.google.com/privacy" rel="preconnect"> Privacy Policy</a> and
                                    <a href="https://policies.google.com/terms" ref="preconnect"> Terms of Service</a> apply.
                                </div>

                                <button type="submit" className="zalogujBtn hoverBtn">
                                    Zarejestruj się
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
            <div className="toastWrapper" ref={this.state.toastWrapper} >
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
