import React, {useContext, useState} from 'react'
import PageHeader from "../PageHeader";
import Footer from "../Footer";
import KoszykContext from "../../helpers/KoszykContext";
import showKoszykUtil from "../../helpers/showKoszyk";
import wrocDoSklepuUtil from "../../helpers/wrocDoSklepuUtil";
import KoszykBottom from "../KoszykBottom";

const Regulamin = () => {
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
            <main className="politykaPrywatnosciMain regulamin">
                <h1 className="politykaPrywatnosciHeader">
                    Regulamin
                </h1>
               <p>
                   Niniejszy Regulamin, jest Regulaminem o którym mowa w art. 8 Ustawy z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną (Dz. U. z 2002 r. Nr 144, poz. 1204 ze zm.), a także reguluje warunki zawierania Umów sprzedaży w Serwisie, zgodnie z treścią innych ustaw, odpowiednio regulujących ten obowiązek.
                <br/><br/>
                   Serwis prowadzony jest przez:
                <br/>
                   HOTIC-POLSKA SP. z o.o.<br/>
                   adres: Kulaszne 56, 38-542 Rzepedź,<br/>
                   NIP: 6871973039<br/>
                   KRS: 0000879762<br/>
                   </p>
                <p>
                   Wyłączne prawo do prowadzenia Serwisu ma wskazany powyżej podmiot, który jest Właścicielem, Sprzedawcą oraz Administratorem Serwisu. W przypadku jakichkolwiek pytań prosimy o kontaktowanie się na poniższe dane teleadresowe: tel.: +48 691087755, e-mail: info@hotic-polska.pl.
                </p>
                <p>
                   Serwis działa w oparciu o obowiązujące przepisy prawa oraz z poszanowaniem dobrych obyczajów w obrocie gospodarczym, w szczególności mając na względzie standardy e-commerce w przedmiocie jakości towarów oraz obsługi przeprowadzanych transakcji.
                </p>
                <p>
                    <b>Definicje:</b><br/>
                   Regulamin – niniejszy Regulamin wraz z załącznikami, informujący o obowiązkach oraz uprawnieniach Stron Umowy,
                    <br/>
                   Strona – stroną Umowy jest Klient lub Sprzedawca – w przypadku pojęcia Strony – rozumie się Klienta oraz Sprzedawcę łącznie,
                    <br/>
                   Umowa zawarta na odległość – umowę zawartą z Klientem w ramach zorganizowanego systemu zawierania umów na odległość, bez jednoczesnej fizycznej obecności Stron, z wyłącznym wykorzystaniem jednego lub większej liczby środków porozumiewania się na odległość do chwili zawarcia umowy włącznie,
                    <br/>
                   Serwis – sklep internetowy dostępny pod adresem: https://www.gtelman.com/
                    <br/>
                   Sprzedawca – sklep internetowy dostępny pod adresem: https://www.gtelman.com/
                    <br/>
                   Klient– osoba fizyczna, osoba prawna oraz jednostka organizacyjna nie posiadająca osobowości prawnej, której ustawa przyznaje zdolność prawną, nabywająca produkty lub usługi za pośrednictwem Serwisu,
                    <br/>
                   Konsument – osoba fizyczna nabywająca produkty lub usługi za pośrednictwem Serwisu w celu niezwiązanym bezpośrednio z jej działalnością gospodarczą lub zawodową,
                    <br/>
                   Użytkownik – każdy podmiot korzystający z Serwisu, Konto – indywidualny panel administracyjny Użytkownika dostępny po dokonaniu rejestracji i zalogowaniu w Serwisie, oznaczony loginem i hasłem, służący zawieraniu umów,
                    <br/>
                   Rejestracja – proces polegający na utworzeniu przez Użytkownika Konta w Serwisie,
                    <br/>
                   Forma płatności – forma zapłaty za zamówiony produkt lub usługę, wybrana przez Klienta podczas składanego zamówienia oferowana przez Serwis lub w wyniku indywidualnych ustaleń prowadzonych z Serwisem w innej formie niż prezentowane na stronie internetowej formy płatności, Załączniki – informacja o prawie odstąpienia od umowy oraz wzór formularza odstąpienia od umowy,
                    <br/>
                   Adres do doręczeń – adres lub adresy wskazane przez Sprzedawcę jako adresy do składania określonych oświadczeń, będące adresami do korespondencji;
                    <br/>
                   Formularz Zamówienia – znajdujący się w Serwisie system techniczny umożliwiający złożenie zamówienia przez Klienta poprzez dostępne pola formularza.
                    <br/>

                    <h2>&sect; 1 Postanowienia Ogólne</h2>

                    <p>
                   Przedmiotem działalności Serwisu jest sprzedaż produktów W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie znajdą właściwe przepisy prawa obowiązujące na terytorium Rzeczypospolitej Polskiej, a w szczególności ustawy z dnia 23 kwietnia 1964 r. – Kodeks Cywilny (Dz. U. nr 16, poz. 93 ze zm.), ustawy z dnia 30 maja 2014 r. o prawach konsumenta ( Dz. U. 2014 poz. 827) oraz ustawy z dnia 29 sierpnia 1997 r. o ochronie danych osobowych (tekst jedn.: Dz. U. z 2002 r. nr 101, poz. 926 ze zm.). Treści znajdujące się w Serwisie, opisujące produkty, nie stanowią oferty handlowej w rozumieniu przepisów Kodeksu cywilnego. Cennik znajdujący się na stronie głównej Serwisu nie stanowi oferty handlowej w rozumienia przepisów Kodeksu cywilnego.
</p>

                   <h2>&sect; 2 Procedura składania zamówień i moment zawarcia umowy</h2>

                    <p>
                   Klient może składać zamówienia w Serwisie 24 godziny na dobę 7 dni w tygodniu poprzez stronę internetową https://www.gtelman.com/ Serwis prowadzi sprzedaż na terytorium Rzeczpospolitej Polskiej jak i poza granicami kraju. Informacje o produktach i usługach prezentowane na stronach internetowych Serwisu stanowią informację handlową w rozumieniu przepisów Kodeksu cywilnego. Złożenie zamówienia stanowi ofertę w rozumieniu kodeksu cywilnego, złożoną Sprzedawcy przez Klienta. W celu złożenia zamówienia Klient powinien skorzystać ze e-sklepu dostępnego pod adresem https://www.gtelman.com/ Po złożeniu prawidłowego zamówienia, zamówienie uważa się za złożone. Zamówienia złożone w w/w sposób są potwierdzane mailowo. Za chwilę zawarcia umowy uznaje się więc wysłanie do Klienta informacji zwrotnej z potwierdzeniem przyjęcia zamówienia. Dniem wykonania Umowy zawartej za pośrednictwem Serwisu jest dzień wysłania do Klienta za pośrednictwem Poczty Polskiej lub Kuriera zamówionych produktów.
</p>
                   <h2>&sect; 3 Płatności</h2>
                    <p>
                   Wszystkie ceny prezentowane w Serwisie są cenami brutto, wyrażonymi w złotych polskich, zawierającymi podatek od towarów i usług (VAT), określony odrębnymi przepisami.
</p>
                    <p>
                   Serwis przewiduje następujące rodzaje płatności:
<br/><br/>
                   a) Płatność on-line poprzez serwis Dotpay<br/>
                   b) Przelew bankowy<br/><br/>
                   Klient dokonuje zamówienia według cen obowiązujących w chwili złożenia zamówienia. Serwis zastrzega sobie prawo do zmiany cen. Postanowienie to nie dotyczy zamówień już realizowanych.
</p>

                   <h2> &sect; 4 Wymagania Techniczne oraz informacja o plikach cookies</h2>

                    <p>
                        Zalecane wymagania techniczne współpracy z systemem teleinformatycznym to: komputer z dostępem do Internetu, dostęp do poczty elektronicznej, przeglądarka internetowa. Serwis korzysta z technologii plików cookies. Pliki cookies (zwane również tzw. „ciasteczka „) stanowią dane informatyczne, a w szczególności pliki tekstowe, które przechowywane są w urządzeniu końcowym Użytkownika i są przeznaczone do korzystania ze strony internetowej Serwisu. Pliki wskazane w pkt 1 pozwalają rozpoznać urządzenie Użytkownika i odpowiednio wyświetlić stronę internetową dostosowaną do jego indywidualnych preferencji. W ramach Serwisu stosowane są różne rodzaje plików cookies, którymi są: Cookies stałe, to pliki cookies, których okres przechowywania na urządzeniu końcowym trwa przez czas określony w parametrach danego pliku lub do momentu samodzielnego usunięcia plików cookies przez Użytkownika. Cookies tymczasowe, to pliki cookies, które są usuwane w momencie zakończenia tzw. sesji, tj. wylogowania się ze strony www, opuszczenia strony www lub zamknięcia przeglądarki internetowej, która wyświetla stronę www. Cookies własne, to pliki cookies umieszczone na stronie www przez właściciela. Cookies zewnętrzne, to pliki cookies umieszczone na stronie www przez podmioty zewnętrzne, np. do prowadzenia anonimowych statystyk przez Google Analytics. W celu zmiany ustawień Polityki Cookies należy zmienić ustawienia przeglądarki. Szczegółowe informacje na temat zmiany ustawień dotyczących plików Cookies oraz ich samodzielnego usuwania w najpopularniejszych przeglądarkach internetowych, dostępne są w dziale pomocy przeglądarki internetowej.
</p>
                    <h2> &sect; 5 Postanowienia Końcowe</h2>

                    <p>
                   Usługodawca zastrzega sobie prawo do wprowadzania zmian w treściach znajdujących się w Serwisie oraz do ewentualnych zmian w cenniku produktów oferowanych za pośrednictwem Serwisu, w zależności od zmieniających się uśrednionych stawek rynkowych.
</p>
                    <p>
                   Usługodawca nie ponosi odpowiedzialności za:
<br/>
                   a) jakiekolwiek szkody spowodowane naruszeniem przez Użytkowników – w związku z korzystaniem z Serwisu – praw osób trzecich;
<br/>
                   b) szkody powstałe w następstwie zakłóceń w działaniu Serwisu lub jego niedostępności, spowodowanych przyczynami niezależnymi od Usługodawcy lub które nastąpiły wskutek zdarzeń, którym Usługodawca nie był w stanie zapobiec;
                        <br/>
                   c) jakiekolwiek inne szkody spowodowane nieprzestrzeganiem przez Użytkownika postanowień niniejszego Regulaminu. Zmiana treści niniejszego Regulaminu może nastąpić po uprzednim poinformowaniu Użytkowników o zakresie przewidywanych zmian nie później niż w terminie 14 dni przed dniem ich wejścia w życie. Zamówienia złożone w trakcie obowiązywania poprzedniej wersji Regulaminu będą realizowane zgodnie z jego postanowieniami. Ewentualne spory powstałe pomiędzy Sprzedawcą a Klientem, który jest Konsumentem, rozstrzygane będą przez sąd powszechny właściwy zgodnie z przepisami Kodeksu postępowania cywilnego. Ewentualne spory powstałe pomiędzy Sprzedawcą a Klientem, który nie jest konsumentem, rozstrzygane będą przez sąd powszechny właściwy ze względu na siedzibę Serwisu.
                        <br/><br/>
                   Użytkownicy mogą kontaktować się ze Sprzedawcą w następujący sposób:
                        <br/>
                   a) telefon: +48 691087755
                        <br/>
                   b) email: info@hotic-polska.pl
                        <br/>
                   c) pisemnie na adres:<br/>
                   HOTIC-POLSKA Sp. z o.o.<br/>
                   Kulaszne 56<br/>
                   38-542 Rzepedź<br/>
                        <br/>
                        <p>
                   Klienci mogą uzyskać dostęp do niniejszego Regulaminu w każdym czasie za pośrednictwem linku zamieszczonego na stronie głównej Serwisu.
</p>
                        <p>
                   Wszelkie materiały znajdujące się w Serwisie stanowią przedmiot prawa autorskiego i podlegają ochronie prawnej. Wykorzystywanie i rozpowszechnianie ich bez zgody właściciela Serwisu jest zabronione. Niniejszy Regulamin obowiązuje od dnia 22.01.2020 r.
</p>
                        <p>
                   Konsument w sytuacji sporu ze Sprzedawcą ma możliwość polubownego załatwienia sprawy poprzez:
</p>
                        <p>
                   a) zwrócenie się do stałego polubownego sądu konsumenckiego
                            <br/>
                   b) mediację<br/>

                   c) zwrócenie się do wojewódzkiego inspektora Inspekcji Handlowej
                            <br/>
                   d) uzyskać bezpłatną pomoc w sprawie rozstrzygnięcia sporu od Federacji Konsumentów korzystając z bezpłatnej infolinii konsumenckiej 800 007 7075

                        </p></p></p>

            </main>
        </div>
        <KoszykBottom ilosc={ilosc} skorka={skorka} cena={500}
                      wroc={wrocDoSklepu}
                      disabled={true}
        />
        <Footer />
    </>
}

export default Regulamin;
