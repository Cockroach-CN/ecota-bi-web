import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import List from "../components/chart/List.jsx"
import Info from "../components/chart/Info.jsx"

import A from "../components/A.jsx";
import B from "../components/B.jsx";

export default (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={List}></Route>
            <Route exact path="/list" component={List}></Route>
            <Route exact path="/info" component={Info}></Route>
            <Route exact path="/a" component={A}></Route>
            <Route exact path="/b" component={B}></Route>
        </Switch>
    </BrowserRouter>
);

