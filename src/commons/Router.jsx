import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import List from "../components/chart/List.jsx"
import Info from "../components/chart/Info.jsx"

export default (
    <BrowserRouter basename="/#">
        <Switch>
            <Route path="/list" component={List}></Route>
            <Route path="/info/:groupKey/:chartKey" component={Info}> </Route>
        </Switch>
    </BrowserRouter>
);

