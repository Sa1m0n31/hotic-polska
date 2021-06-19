import React, {useEffect, useRef} from 'react';
import { withRouter } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './static/style/style.css';
import './static/style/mobile.css';

import FrontPage from "./components/pages/FrontPage";
import AdminPage from "./components/pages/AdminPage";
import KupTerazPage from "./components/pages/KupTerazPage";
import DostawaStep1 from "./components/pages/DostawaStep1";
import DostawaStep2 from "./components/pages/DostawaStep2";
import DostawaStep3 from "./components/pages/DostawaStep3";
import ZalogujZarejestrujPage from "./components/pages/ZalogujZarejestrujPage";
import ProfilePage from "./components/pages/ProfilePage";
import Zarejestrowano from "./components/Zarejestrowano";
import AfterPayment from "./components/pages/AfterPayment";
import PolitykaPrywatnosci from "./components/pages/PolitykaPrywatnosci";
import Regulamin from "./components/pages/Regulamin";
import ZwrotyIReklamacje from "./components/pages/ZwrotyIReklamacje";
import OpcjeWysylki from "./components/pages/OpcjeWysylki";

import { AnimatePresence, motion } from "framer-motion";
import ONasPage from "./components/pages/ONas";
import Page404 from "./components/pages/404";
import {Helmet} from "react-helmet";

import favicon from '../src/static/img/logo.png'
import up from '../src/static/img/up.svg'

function App() {
  let moveUpBtn = useRef(null);

  useEffect(() => {
      if(typeof window !== 'undefined') {
          window.addEventListener("scroll", () => {
             if(window.pageYOffset > 200) {
                 moveUpBtn.current.style.opacity = "1";
             }
             else {
                 moveUpBtn.current.style.opacity = "0";
             }
          });
      }
  }, []);

  const moveUp = () => {
      if(typeof document !== 'undefined') {
          window.scrollTo({
              top: 0,
              behavior: "smooth"
          });
      }
  }

  return (<>
          <Helmet>
              <title>Hotic Polska</title>
              <meta name="description" content="Sklep internetowy z pistoletem masującym Hotic Polska" />
              <link rel="icon" type="image/png" href={favicon} />
          </Helmet>
      <AnimatePresence>
      <motion.div
          key={1}
          initial={{opacity: 0, x: -window.innerWidth}}
          animate={{opacity: 1, x: 0, duration: 5}}
          transition={{type: 'tween'}}
          exit={{y: 1000}} >
          <button className="moveUpBtn" onClick={() => { moveUp() }} ref={moveUpBtn}>
              <img className="moveUpBtnImg" src={up} alt="do-gory" />
          </button>
      <Router>
          <Switch>
              <Route exact path="/" component={withRouter(FrontPage)} />
              <Route path="/kup-teraz" component={withRouter(KupTerazPage)} />
              <Route path="/admin">
                  <AdminPage />
              </Route>
          <Route path="/zaloguj-zarejestruj">
              <ZalogujZarejestrujPage />
          </Route>
          <Route path="/o-nas">
              <ONasPage />
          </Route>
          <Route path="/dostawa-step-1">
                <DostawaStep1 />
          </Route>
          <Route path="/dostawa-step-2">
              <DostawaStep2 />
          </Route>
          <Route path="/dostawa-step-3">
              <DostawaStep3 />
          </Route>
          <Route path="/profile">
              <ProfilePage />
          </Route>
          <Route path="/zarejestrowano">
              <Zarejestrowano />
          </Route>
          <Route path="/oplacono">
              <AfterPayment />
          </Route>
          <Route path="/polityka-prywatnosci">
              <PolitykaPrywatnosci />
          </Route>
          <Route path="/regulamin">
              <Regulamin />
          </Route>
          <Route path="/zwroty-i-reklamacje">
              <ZwrotyIReklamacje />
          </Route>
          <Route path="/opcje-wysylki">
              <OpcjeWysylki />
          </Route>
          <Route path="*">
              <Page404 />
          </Route>
          </Switch>
          </Router>
      </motion.div>
      </AnimatePresence>
      </>
  );
}

export default App;
