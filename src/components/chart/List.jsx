import React from "react";
import Page from "../page/Page.jsx";
import { NavBar, Card, Icon } from "antd-mobile";
import "./Style.less";
import settings from "./Settings";

const groups = settings.chartgroups;
class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Page>
                <NavBar mode="dark">公司报表</NavBar>
                {groups.map((group) =>
                    <div className="group-container" key={group.key}>
                        <div className="group-title">{group.title}</div>
                        <div className="group-list">
                            {group.charts.map((chart) =>
                                <ChartCard key={chart.key} chart={chart} onClickCard={() =>
                                    window.location.href = `/#/info/${group.key}/${chart.key}`} />
                            )}
                        </div>
                    </div>
                )}
            </Page>
        );
    }
}

const ChartCard = (props) => {
    const chart = props.chart;
    return (
        <Card className="chart-card" onClick={(e) => props.onClickCard(e)}>
            <div className="card-title">{chart.title}</div>
            <div style={{ margin: "10px 0px", height: "calc(100% - 40px)" }}>
                <img style={{ width: "100%", height: "100%" }} src={require(`${chart.url}`)} />
            </div>
        </Card>
    );
}


export default List;


