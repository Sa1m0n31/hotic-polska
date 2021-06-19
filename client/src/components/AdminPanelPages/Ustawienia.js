import React, {useRef, useState} from 'react'
import userOrange from "../../static/img/admin_orange.svg";
import logo from "../../static/img/logo.png";
import axios from "axios";
import gsap from "gsap/all";
import Toast from "../Toast";

const Ustawienia = ({username}) => {
    let [oldPassword, setOldPassword] = useState("");
    let [newPassword1, setNewPassword1] = useState("");
    let [newPassword2, setNewPassword2] = useState("");

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [repeatPassword, setRepeatPassword] = useState("");

    let [error, setError] = useState("");
    let [green, setGreen] = useState(false);

    let toastWrapper = useRef(null);

    const toastCallback = () => {
        gsap.fromTo(toastWrapper.current, { x: "-50%", y: 100, opacity: 0 }, { x: "-50%", y: 0, opacity: 1, duration: .5 });
        setTimeout(() => {
            gsap.to(toastWrapper.current, { opacity: 0, duration: .5 });
        }, 2000);
        setTimeout(() => {
            setGreen(false);
        }, 2500);
    }

    const dodajAdministratora = async () => {
        /* Dodanie nowego administratora */
        if(password !== repeatPassword) {
            await setError("Podane hasła nie są identyczne");
            await toastCallback();
            return 0;
        }
        if(password.length < 6) {
            await setError("Hasło musi mieć długość co najmniej 6 znaków");
            await toastCallback();
            return 0;
        }
        if(email.length < 3) {
            await setError("Login musi mieć co najmniej 3 znaki długości");
            await toastCallback();
            return 0;
        }

            axios.post("https://hotic-polska.pl/add-admin", {
                username: email,
                password: password
            })
                .then(async ( res) => {
                    if(res.data.added) {
                        await setGreen(true);
                        await setError("Konto administratora zostało dodane");
                        await toastCallback();
                    }
                    else {
                        await setError("Nie udało się założyć nowego konta");
                        await toastCallback();
                    }
                });
    }

    const zmienHaslo = async () => {
        /* Sprawdzamy czy dwa nowe hasła są poprawne i identyczne */
        if(newPassword1.length < 6) {
            await setError("Hasło musi mieć co najmniej 6 znaków długości");
            await toastCallback();
            return 0;
        }
        if(newPassword1 !== newPassword2) {
            await setError("Podane hasła nie są identyczne");
            await toastCallback();
            return 0;
        }

        /* Sprawdzamy czy stare hasło sie zgadza */
        axios.post("https://hotic-polska.pl/admin/auth", {
            username,
            password: oldPassword
        })
            .then(async res => {
                if(res.data.loggedIn) {
                    /* Zmieniamy hasło */
                    axios.post("https://hotic-polska.pl/admin/change-password", {
                        username,
                        password: newPassword1
                    })
                        .then(async res => {
                            if(res.data.success) {
                                await setGreen(true);
                                await setError("Hasło zostało zmienione");
                                await toastCallback();
                            }
                            else {
                                await setError("Nie udało się zmienić hasła. Spróbuj ponownie.");
                                await toastCallback();
                            }
                        });
                }
                else {
                    await setError("Nieprawidłowe hasło");
                    await toastCallback();
                }
            })
    }

    const openMobileMenu = () => {
        if(typeof document !== 'undefined') {
            document.querySelector(".adminMenu").style.transform = "scaleX(1)";
        }
    }

    return <>
        <header className="adminLoginHeader adminLoginHeaderHigher">
            <div className="adminLoginHeaderTop">
                <button className="hamburgerBtn hamburgerAdmin" onClick={() => openMobileMenu()}>
                    <span className="hamburgerLine"></span>
                    <span className="hamburgerLine"></span>
                    <span className="hamburgerLine"></span>
                </button>
                <h2 className="adminLoginHeaderTitle">
                    Ustawienia
                </h2>

                <h3 className="adminLoginZalogowanyJako">
                    <img className="adminLoginZalogowanyJakoImg" src={userOrange} alt="admin" />
                    {window.innerWidth >= 900 ? "Zalogowany jako " : "" } <b> {username}</b>
                </h3>
            </div>
            <div className="adminLoginHeaderBottom">
                <div>
                    <button className="adminProduktBtn" onClick={() => zmienHaslo()}>
                        Zmień hasło
                    </button>
                    <button className="adminProduktBtn extraMarginLeftX" onClick={() => dodajAdministratora()}>
                        Dodaj administratora
                    </button>
                </div>


                <img className="logoTop" src={logo} alt="hotic-polska" />

            </div>
        </header>
        <main className="adminPanelMain adminPanelMainMoreTop">
            <div className="edycjaSection">
                <h2 className="edycjaSectionTitle">
                    Zmień hasło
                </h2>
                <input className="edycjaNazwaProduktu edycjaHaslo" type="password" placeholder="Stare hasło" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                <input className="edycjaNazwaProduktu edycjaHaslo" type="password" placeholder="Nowe hasło" value={newPassword1} onChange={(e) => setNewPassword1(e.target.value)} />
                <input className="edycjaNazwaProduktu edycjaHaslo" type="password" placeholder="Powtórz nowe hasło" value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)} />
            </div>

            <div className="edycjaSection">
                <h2 className="edycjaSectionTitle">
                    Dodaj nowego administratora
                </h2>
                <input className="edycjaNazwaProduktu edycjaHaslo" type="text" placeholder="Login"
                       value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="edycjaNazwaProduktu edycjaHaslo" type="password" placeholder="Hasło"
                       value={password} onChange={(e) => setPassword(e.target.value)} />
                <input className="edycjaNazwaProduktu edycjaHaslo" type="password" placeholder="Powtórz hasło"
                       value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
            </div>
        </main>
        <div className="toastWrapper" ref={toastWrapper}>
            <Toast error={error} green={green} />
        </div>
    </>
}

export default Ustawienia;
