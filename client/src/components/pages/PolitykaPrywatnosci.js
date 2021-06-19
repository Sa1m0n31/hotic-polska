import React, {useState, useEffect, useContext} from 'react'
import PageHeader from "../PageHeader";
import checked from "../../static/img/checked.svg";
import Footer from "../Footer";
import showKoszykUtil from "../../helpers/showKoszyk";
import KoszykBottom from "../KoszykBottom";
import wrocDoSklepuUtil from "../../helpers/wrocDoSklepuUtil";
import KoszykContext from "../../helpers/KoszykContext";

const PolitykaPrywatnosci = () => {
    /* Domyslnie dane o ilosci i skorce pobierane z kontekstu (0, 1) */
    let myContext = useContext(KoszykContext);
    let [ilosc, setIlosc] = useState(myContext.ilosc);
    let [skorka, setSkorka] = useState(myContext.skorka);

    const showKoszyk = () => {
        showKoszykUtil();
    }

    const wrocDoSklepu = () => {
        wrocDoSklepuUtil();
    }

    return <>
        <div className="dostawaStep1Container">
            <PageHeader ilosc={ilosc} showKoszyk={showKoszyk} />
            <main className="politykaPrywatnosciMain">
               <h1 className="politykaPrywatnosciHeader">
                   Polityka prywatności
               </h1>
                <h2>I Informacje ogólne</h2>
                <p>
                    • Niniejsza Polityka Prywatności określa sposób pozyskiwania, przetwarzania oraz zabezpieczania danych osobowych w rozumieniu ustawy o ochronie danych osobowych z dnia 29 sierpnia 1997 roku (Dz.U. Nr 133, poz. 883 z póź. zm.) oraz ustawą o świadczeniu usług drogą elektroniczną z dnia 18 lipca 2002 r. (Dz.U. Nr 144, poz. 1204 z póź. zm.)
                    Właścicielem strony internetowej https://www.hotic-polska.pl oraz administratorem danych osobowych jest
                    <br/><br/>
                    HOTIC-POLSKA Sp. z o.o.<br/>
                    adres: Kulaszne 56<br/>
                    38-542 Rzepedź, <br/>
                    NIP: 6871973039<br/><br/>
                    wpisany do Centralnej Ewidencji i Informacji o Działalności Gospodarczej Rzeczypospolitej Polskiej.
                    </p>

                <h2>II Dane osobowe</h2>
                <p>
                    • Serwis zbiera informacje podane dobrowolnie przez użytkownika.<br/>
                    • Dane osobowe są pozyskiwane podczas składania zamówienia w sklepie lub wysyłania maila na adres podany na stronie<br/>
                    • Dane osobowe są wykorzystywane wyłącznie w celu realizacji zamówienia<br/>
                    • Zawartość strony internetowej można przeglądać bez podawania jakichkolwiek danych osobowych.<br/>
                    • Każda osoba, która udostępniła swoje dane osobowe ma prawo do dostępu do ich treści oraz możliwość ich poprawiania, uaktualniania, uzupełniania, jak i również żądania zaprzestania przetwarzania danych osobowych oraz wniesienia sprzeciwu wobec przetwarzania danych osobowych. Wymienione czynności można dokonać poprzez wysłanie stosownego oświadczenia na adres email: info@hotic-polska.pl
                    <br/>• Pozyskane przez administratora dane osobowe są przechowywane, przetwarzane i chronione zgodnie z obowiązującymi przepisami prawa. Zbiór danych osobowych został zgłoszony do Urzędu Ochrony Danych Osobowych (uodo.gov.pl)
                </p>
                <p>
                    Administrator chroni zgromadzone dane osobowe korzystając z następujących środków:<br/>
                    – zabezpieczenie zbioru danych przed nieuprawnionym dostępem
                </p>
                <h2>III Informacja o plikach cookies</h2>
                <p>
                    • Serwis korzysta z plików cookies.
                    <br/>• Pliki cookies (tzw. „ciasteczka”) stanowią dane informatyczne, w szczególności pliki tekstowe, które przechowywane są w urządzeniu końcowym Użytkownika Serwisu i przeznaczone są do korzystania ze stron internetowych Serwisu. Cookies zazwyczaj zawierają nazwę strony internetowej, z której pochodzą, czas przechowywania ich na urządzeniu końcowym oraz unikalny numer.
                    <br/>• Podmiotem zamieszczającym na urządzeniu końcowym Użytkownika Serwisu pliki cookies oraz uzyskującym do nich dostęp jest operator Serwisu.
                    <br/>• Pliki cookies wykorzystywane są w następujących celach:
                    <br/>• tworzenia statystyk, które pomagają zrozumieć, w jaki sposób Użytkownicy Serwisu korzystają ze stron internetowych, co umożliwia ulepszanie ich struktury i zawartości;
                    <br/>• utrzymania sesji Użytkownika Serwisu (po zalogowaniu), dzięki której Użytkownik nie musi na każdej podstronie Serwisu ponownie wpisywać loginu i hasła;
                    <br/>• określania profilu użytkownika w celu wyświetlania mu dopasowanych materiałów w sieciach reklamowych, w szczególności sieci Google.
                    <br/>• W ramach Serwisu stosowane są dwa zasadnicze rodzaje plików cookies: „sesyjne” (session cookies) oraz „stałe” (persistent cookies). Cookies „sesyjne” są plikami tymczasowymi, które przechowywane są w urządzeniu końcowym Użytkownika do czasu wylogowania, opuszczenia strony internetowej lub wyłączenia oprogramowania (przeglądarki internetowej). „Stałe” pliki cookies przechowywane są w urządzeniu końcowym Użytkownika przez czas określony w parametrach plików cookies lub do czasu ich usunięcia przez Użytkownika.
                    <br/>• Oprogramowanie do przeglądania stron internetowych (przeglądarka internetowa) zazwyczaj domyślnie dopuszcza przechowywanie plików cookies w urządzeniu końcowym Użytkownika. Użytkownicy Serwisu mogą dokonać zmiany ustawień w tym zakresie. Przeglądarka internetowa umożliwia usunięcie plików cookies. Możliwe jest także automatyczne blokowanie plików cookies. Szczegółowe informacje na ten temat zawiera pomoc lub dokumentacja przeglądarki internetowej.
                    <br/>• Ograniczenia stosowania plików cookies mogą wpłynąć na niektóre funkcjonalności dostępne na stronach internetowych Serwisu.
                    <br/>• Pliki cookies zamieszczane w urządzeniu końcowym Użytkownika Serwisu i wykorzystywane mogą być również przez współpracujących z operatorem Serwisu reklamodawców oraz partnerów.
                    <br/>• Zalecamy przeczytanie polityki ochrony prywatności tych firm, aby poznać zasady korzystania z plików cookies wykorzystywane w statystykach: Polityka ochrony prywatności Google Analytics.
                    <br/>• Pliki cookies mogą być wykorzystane przez sieci reklamowe, w szczególności sieć Google, do wyświetlenia reklam dopasowanych do sposobu, w jaki użytkownik korzysta z Serwisu. W tym celu mogą zachować informację o ścieżce nawigacji użytkownika lub czasie pozostawania na danej stronie.
                    <br/>• W zakresie informacji o preferencjach użytkownika gromadzonych przez sieć reklamową Google użytkownik może przeglądać i edytować informacje wynikające z plików cookies przy pomocy narzędzia: https://www.google.com/ads/preferences/
                </p>

                <h2>IV Zarządzanie plikami cookies – jak w praktyce wyrażać i cofać zgodę?</h2>
                <p>
                    • Jeśli użytkownik nie chce otrzymywać plików cookies, może zmienić ustawienia przeglądarki. Zastrzegamy, że wyłączenie obsługi plików cookies niezbędnych dla procesów uwierzytelniania, bezpieczeństwa, utrzymania preferencji użytkownika może utrudnić, a w skrajnych przypadkach może uniemożliwić korzystanie ze stron www.
                    <br/>• W celu zarządzania ustawieniami cookies wybierz z listy poniżej przeglądarkę internetową/ system i postępuj zgodnie z instrukcjami
                    <br/>• – Internet Explorer
                    <br/>• – Chrome
                    <br/>• – Safari
                    <br/>• – Firefox
                    <br/>• – Opera
                    <br/>• – Android
                    <br/>• – Safari (iOS)
                    <br/>• – Windows Phone
                    <br/>• – Blackberry
                </p>

                <h2>V Udostępnienie danych</h2>
                <p>
                    • Dane podlegają udostępnieniu podmiotom zewnętrznym wyłącznie w granicach prawnie dozwolonych.
                    <br/>• Operator może mieć obowiązek udzielania informacji zebranych przez Serwis upoważnionym organom na podstawie zgodnych z prawem żądań w zakresie wynikającym z żądania.
                </p>


                <h2>VI Postanowienia końcowe</h2>
                <p>
                    • Administrator ma prawo do zmian w niniejszej Polityce Prywatności. Osoby udostępniające swoje dane osobowe obowiązuje aktualnie obowiązująca wersja Polityki Prywatności, dostępna na stronie info@hotic-polska.pl
                    <br/>• W sprawach nieuregulowanych niniejszą Polityką Prywatności stosuje się obowiązujące przepisy prawa polskiego.
                </p>
            </main>
        </div>
        <KoszykBottom ilosc={ilosc} skorka={skorka} cena={500}
                      wroc={wrocDoSklepu}
                        disabled={true}
        />
        <Footer />
    </>
}

export default PolitykaPrywatnosci;
