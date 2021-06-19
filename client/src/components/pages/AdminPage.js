import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AdminLogin from "../AdminLogin";
import AdminPanel from "../AdminPanel";
import SingleZamowienie from "../AdminPanelPages/SingleZamowienie";

const AdminPage = () => {
    return <Router>
        <Switch>
            <Route exact path="/admin">
                <AdminLogin />
            </Route>
            <Route exact path="/admin/panel">
                <AdminPanel />
            </Route>
            <Route path="/admin/panel/zamowienie">
                <SingleZamowienie />
            </Route>
        </Switch>
    </Router>
}

export default AdminPage;
