import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import {createBrowserHistory} from 'history';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Navigation from "./components/navigation/top-navigation.component";
import ProtectedRoute from "./components/route/protected-route.component";
import AdminProtectedRoute from "./components/route/admin-protected-route.component"
import Login from "./components/login.component";
import Welcome from "./components/dashboard.component";
import UserAdd from "./components/user-add.component";
import SprintAdd from "./components/sprint-add.component";

export const history = createBrowserHistory();

function App() {
    return (
        <Router history={history}>
            <Route path="/" component={Navigation}/>
            <Switch>
                <ProtectedRoute path="/" exact component={Welcome}/>
                <ProtectedRoute path="/sprint/add" exact component={SprintAdd} />
                <AdminProtectedRoute path="/user/add" component={UserAdd}/>
                <Route path="/login" component={Login}/>
            </Switch>
        </Router>
    );
}

export default App;
