import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import List from "../components/chart/List.jsx"
import Info from "../components/chart/Info.jsx"

import A from "../components/A.jsx";
import B from "../components/B.jsx";

export default (
    <BrowserRouter basename="/#">
        <Switch>
            <Route path="/list" component={List}></Route>
            <Route path="/info/:groupKey/:chartKey" component={Info}> </Route>
            <Route path="/a" component={A}></Route>
            <Route path="/b" component={B}></Route>
        </Switch>
    </BrowserRouter>
);

