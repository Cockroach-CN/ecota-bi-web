import React from "react";
import ReactDom from "react-dom";
// import Router from "./commons/Router.jsx";
import List from "./components/chart/List.jsx";
import Info from "./components/chart/Info.jsx";
import "./App.less";
import 'antd-mobile/dist/antd-mobile.css';
import "bootstrap/dist/css/bootstrap.min.css";
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            page: "list",
            infoOpt: {
                groupKey: null,
                chartKey: null,
            }
        }
    }

    render() {
        const { page, infoOpt } = this.state;
        const { groupKey, chartKey } = infoOpt;
        if (this.state.page === "info") {
            return <Info groupKey={groupKey} chartKey={chartKey}
                backListPage={() => this.backListPage()} />
        } else {
            return <List toInfoPage={(groupKey, chartKey) => this.toInfoPage(groupKey, chartKey)} />
        }
    }

    toInfoPage(groupKey, chartKey) {
        this.setState({ page: "info", infoOpt: { groupKey, chartKey } })
    }

    backListPage() {
        this.setState({ page: "list" });
    }
}

ReactDom.render(<App />, document.getElementById("react-app-root"));