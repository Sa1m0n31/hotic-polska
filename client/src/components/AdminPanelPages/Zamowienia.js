import React, { useState, useEffect } from 'react';
import checkImg from "../../static/img/check.svg";
import more from "../../static/img/circle_right.svg";
import axios from "axios";
import Loader from "react-loader-spinner";
import userOrange from "../../static/img/admin_orange.svg";
import logo from "../../static/img/logo.png";
import SingleZamowienie from "./SingleZamowienie";
import trash from '../../static/img/trash.png'
import x from '../../static/img/x.png'

const Zamowienia = ({username, singleUp}) => {
    let [orders, setOrders] = useState([]);
    let [getOrders, setGetOrders] = useState(false);
    let [cena, setCena] = useState(0);
    let [single, setSingle] = useState(false);
    let [oplacone, setOplacone] = useState(false);
    let [tydzien, setTydzien] = useState(false);
    let [miesiac, setMiesiac] = useState(false);
    let [modal, setModal] = useState(false);
    let [trashIndex, setTrashIndex] = useState(null);
    let [reload, setReload] = useState(false);

    /* For single order */
    let [email, setEmail] = useState("");

    useEffect(() => {
        /* Get all orders */
        axios.get("https://hotic-polska.pl/orders")
            .then(async res => {
                setOrders(res.data.orders);
                setGetOrders(true);
            });

        /* Get cena */
        /* Get product data */
        axios.get("https://hotic-polska.pl/product-data")
            .then((res) => {
                if(res.data.productData) {
                    setCena(res.data.productData[0].cena)
                }
            });

    }, [reload]);

    /* Only oplacone filter */
    useEffect(() => {

    }, [oplacone]);

    const goSingle = async (id) => {
        await sessionStorage.setItem('orderId', id);

        window.location.href = "/admin/panel/zamowienie";
    }

    const trashOrder = (n) => {
        /* Open warning modal */
        setTrashIndex(n);
        setModal(true);
    }

    const moveToTrash = () => {
        axios.post("https://hotic-polska.pl/delete-order", {
            id: trashIndex
        })
            .then((res) => {
                setModal(false);
                setGetOrders(false);
                setReload(!reload);
            });

    }

    const openMobileMenu = () => {
        if(typeof document !== 'undefined') {
            document.querySelector(".adminMenu").style.transform = "scaleX(1)";
        }
    }

    return <>
        <div className={modal ? "warningModal warningModalActive" : "warningModal"}>
            <button className="warningModalExit" onClick={() => { setModal(false); }}>
                <img className="warningModalExitImg" src={x} alt="exit" />
            </button>
            <h3 className="warningModalHeader">
                Czy na pewno chcesz usunąć wskazane zamówienie?
            </h3>

            <button className="adminProduktBtn adminProduktBtnNegative" onClick={() => { moveToTrash() }}>
                Usuń
            </button>
        </div>
        <header className="adminLoginHeader">
            <div className="adminLoginHeaderTop">
                <button className="hamburgerBtn hamburgerAdmin" onClick={() => openMobileMenu()}>
                    <span className="hamburgerLine"></span>
                    <span className="hamburgerLine"></span>
                    <span className="hamburgerLine"></span>
                </button>
                <h2 className="adminLoginHeaderTitle">
                    Panel zamówień
                </h2>

                <h3 className="adminLoginZalogowanyJako">
                    <img className="adminLoginZalogowanyJakoImg" src={userOrange} alt="admin" />
                    {window.innerWidth > 600 ? "Zalogowany jako" : ""} <b> {username}</b>
                </h3>
            </div>
            <div className="adminLoginHeaderBottom">
                <div className="filterButtons">
                    <button className={oplacone ? "filterBtn filterBtnActive" : "filterBtn"} onClick={() => { setOplacone(!oplacone) }}>
                        Tylko opłacone
                    </button>
                    <button className={miesiac ? "filterBtn filterBtnActive" : "filterBtn"} onClick={() => { setMiesiac(!miesiac) }}>
                        W tym miesiącu
                    </button>
                </div>

                <img className="logoTop" src={logo} alt="hotic-polska" />

            </div>
        </header>
        <main className="adminPanelMain">
            {single ? <SingleZamowienie username={username} email={email} /> : <>
            {getOrders ?
        <div className="zamowieniaTable">
            <div className="zamowieniaTableHeader">
                <h3 className="zamowieniaTableHeaderH">
                    Usuń
                </h3>
                <h3 className="zamowieniaTableHeaderH zamowieniaTableNumerZamowienia">
                    Nr zamówienia
                </h3>
                <h3 className="zamowieniaTableHeaderH">
                    Wartość
                </h3>
                <h3 className="zamowieniaTableHeaderH zamowieniaTable1500">
                    Adres email
                </h3>
                <h3 className="zamowieniaTableHeaderH zamowieniaTable1500">
                    Data zamówienia
                </h3>
                <h3 className="zamowieniaTableHeaderH">
                    Zamówienie<br/>opłacone
                </h3>
                <h3 className="zamowieniaTableHeaderH">

                </h3>
            </div>

            {orders.map((item, i) => {
                console.log(item.wartosc);
                let dataZamowienia = item.data_zlozenia_zamowienia;
                let dateAndHour = dataZamowienia.split(" ");
                let yearMonthDay = dateAndHour[0].split(".");
                let hourMinuteSecond = dateAndHour[1].split(":");

                if(hourMinuteSecond[0].length === 1) {
                    hourMinuteSecond[0] = "0" + hourMinuteSecond[0];
                }
                if(hourMinuteSecond[1].length === 1) {
                    hourMinuteSecond[1] = "0" + hourMinuteSecond[1];
                }
                if(hourMinuteSecond[2].length === 1) {
                    hourMinuteSecond[2] = "0" + hourMinuteSecond[2];
                }

                if(yearMonthDay[1].length === 1) {
                    yearMonthDay[1] = "0" + yearMonthDay[1];
                }
                if(yearMonthDay[2].length === 1) {
                    yearMonthDay[2] = "0" + yearMonthDay[2];
                }

                /* Fitler: oplacone and ostatni miesiac */
                if((oplacone)&&(miesiac)) {
                    if((item.oplacone)&&((yearMonthDay[0] == new Date().getFullYear())&&(parseInt(yearMonthDay[1])-1 == parseInt(new Date().getMonth().toString())))) {
                        return (
                            <div className="zamowieniaTableRow" key={i}>
                                <h3 className="zamowieniaTableHeaderH">
                                    <button className="trashOrderBtn" onClick={() => { trashOrder(item._id) }}>
                                        <img className="trashImg" src={trash} alt="ok" />
                                    </button>
                                </h3>
                                <h3 className="zamowieniaTableHeaderH zamowieniaTableNumerZamowienia">
                                    {i+1}
                                </h3>
                                <h3 className="zamowieniaTableHeaderH">
                                    {item.wartosc} zł
                                </h3>
                                <h3 className="zamowieniaTableHeaderH zamowieniaTable1500">
                                    {item.email}
                                </h3>
                                <h3 className="zamowieniaTableHeaderH zamowieniaTable1500">
                                    {yearMonthDay[2] + "." + yearMonthDay[1] + "." + yearMonthDay[0]}<br/>{hourMinuteSecond[0] + ":" + hourMinuteSecond[1] + ":" + hourMinuteSecond[2]}
                                </h3>
                                <h3 className="zamowieniaTableHeaderH">
                                    {item.oplacone ? <img className="boolImg" src={checkImg} alt="tak" /> : ""}
                                </h3>
                                <button className="zamowieniaTableHeaderH zamowieniaMoreBtn" onClick={() => { goSingle(item._id) }}>
                                    <img className="boolImg" src={more} alt="wiecej" />
                                </button>
                            </div>
                        )
                    }
                }
                /* Filter: oplacone */
                else if(oplacone) {
                    if(item.oplacone) {
                        return (
                            <div className="zamowieniaTableRow" key={i}>
                                <h3 className="zamowieniaTableHeaderH">
                                    <button className="trashOrderBtn" onClick={() => { trashOrder(item._id) }}>
                                        <img className="trashImg" src={trash} alt="ok" />
                                    </button>
                                </h3>
                                <h3 className="zamowieniaTableHeaderH zamowieniaTableNumerZamowienia">
                                    {i+1}
                                </h3>
                                <h3 className="zamowieniaTableHeaderH">
                                    {item.wartosc} zł
                                </h3>
                                <h3 className="zamowieniaTableHeaderH zamowieniaTable1500">
                                    {item.email}
                                </h3>
                                <h3 className="zamowieniaTableHeaderH zamowieniaTable1500">
                                    {yearMonthDay[2] + "." + yearMonthDay[1] + "." + yearMonthDay[0]}<br/>{hourMinuteSecond[0] + ":" + hourMinuteSecond[1] + ":" + hourMinuteSecond[2]}
                                </h3>
                                <h3 className="zamowieniaTableHeaderH">
                                    {item.oplacone ? <img className="boolImg" src={checkImg} alt="tak" /> : ""}
                                </h3>
                                <button className="zamowieniaTableHeaderH zamowieniaMoreBtn" onClick={() => { goSingle(item._id) }}>
                                    <img className="boolImg" src={more} alt="wiecej" />
                                </button>
                            </div>
                        )
                    }
                }
                /* Filter: ostatni miesiac */
                else if(miesiac) {
                    if((yearMonthDay[0] == new Date().getFullYear())&&(parseInt(yearMonthDay[1])-1 == parseInt(new Date().getMonth().toString()))) {
                        return (
                            <div className="zamowieniaTableRow" key={i}>
                                <h3 className="zamowieniaTableHeaderH">
                                    <button className="trashOrderBtn" onClick={() => { trashOrder(item._id) }}>
                                        <img className="trashImg" src={trash} alt="ok" />
                                    </button>
                                </h3>
                                <h3 className="zamowieniaTableHeaderH zamowieniaTableNumerZamowienia">
                                    {i+1}
                                </h3>
                                <h3 className="zamowieniaTableHeaderH">
                                    {item.wartosc} zł
                                </h3>
                                <h3 className="zamowieniaTableHeaderH zamowieniaTable1500">
                                    {item.email}
                                </h3>
                                <h3 className="zamowieniaTableHeaderH zamowieniaTable1500">
                                    {yearMonthDay[2] + "." + yearMonthDay[1] + "." + yearMonthDay[0]}<br/>{hourMinuteSecond[0] + ":" + hourMinuteSecond[1] + ":" + hourMinuteSecond[2]}
                                </h3>
                                <h3 className="zamowieniaTableHeaderH">
                                    {item.oplacone ? <img className="boolImg" src={checkImg} alt="tak" /> : ""}
                                </h3>
                                <button className="zamowieniaTableHeaderH zamowieniaMoreBtn" onClick={() => { goSingle(item._id) }}>
                                    <img className="boolImg" src={more} alt="wiecej" />
                                </button>
                            </div>
                        )
                    }
                }
                /* Brak filtrow */
                else {
                    return (
                        <div className="zamowieniaTableRow" key={i}>
                            <h3 className="zamowieniaTableHeaderH">
                                <button className="trashOrderBtn" onClick={() => { trashOrder(item._id) }}>
                                    <img className="trashImg" src={trash} alt="ok" />
                                </button>
                            </h3>
                            <h3 className="zamowieniaTableHeaderH zamowieniaTableNumerZamowienia">
                                {i+1}
                            </h3>
                            <h3 className="zamowieniaTableHeaderH">
                                {item.wartosc} zł
                            </h3>
                            <h3 className="zamowieniaTableHeaderH zamowieniaTable1500">
                                {item.email}
                            </h3>
                            <h3 className="zamowieniaTableHeaderH zamowieniaTable1500">
                                {yearMonthDay[2] + "." + yearMonthDay[1] + "." + yearMonthDay[0]}<br/>{hourMinuteSecond[0] + ":" + hourMinuteSecond[1] + ":" + hourMinuteSecond[2]}
                            </h3>
                            <h3 className="zamowieniaTableHeaderH">
                                {item.oplacone ? <img className="boolImg" src={checkImg} alt="tak" /> : ""}
                            </h3>
                            <button className="zamowieniaTableHeaderH zamowieniaMoreBtn" onClick={() => { goSingle(item._id) }}>
                                <img className="boolImg" src={more} alt="wiecej" />
                            </button>
                        </div>
                    )
                }
            })}

        </div> : <div className="loaderCenter"><Loader type="grid" color="#F1602A" /></div>}
        </>}
        </main>
    </>
}

export default Zamowienia;
