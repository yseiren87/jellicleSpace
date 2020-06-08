import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, combineReducers} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import * as reducers from "./reducers";
import * as pages from "./pages";


const store = createStore(
    combineReducers({
        system: reducers.systemReducer,
        login: reducers.loginReducer,
        join: reducers.joinReducer,
        main: reducers.mainReducer,
        profile: reducers.profileReducer,
        password: reducers.passwordReducer,
        application: reducers.applicationReducer,
        applicationDetail: reducers.applicationDetailReducer
    }),
    composeWithDevTools(
        applyMiddleware(ReduxThunk)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path={"/"} component={pages.MainPage}/>
                <Route exact path={"/login/"} component={pages.LoginPage}/>
                <Route exact path={"/join/"} component={pages.JoinPage}/>
                <Route exact path={"/user/profile/"} component={pages.ProfilePage}/>
                <Route exact path={"/user/password/"} component={pages.PasswordPage}/>
                <Route exact path={"/application/"} component={pages.ApplicationPage}/>
                <Route path={"/application/:appId/"} component={pages.ApplicationDetailPage}/>
                <Route path={"*"}>
                    <Redirect to={"/"}/>
                </Route>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("root")
);