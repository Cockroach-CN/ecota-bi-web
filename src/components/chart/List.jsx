import React from "react";
import Page from "../page/Page.jsx";
import { Toast, NavBar, Card, Icon } from "antd-mobile";
import "./Style.less";
import { } from "../../services/chartApi.js"

const settings = window.settings;
const groups = settings.chartgroups;
class List extends React.Component {

    componentDidMount() {
        const doms = document.getElementsByClassName("chart-card");
        Object.keys(doms).map(key => {
            doms[key].style.height = doms[key].clientWidth - 20 + "px";
        });
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
                                    this.props.toInfoPage(group.key, chart.key)} />
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
        <div className="chart-card" onClick={(e) => props.onClickCard(e)}>
            <div style={{ marginBottom: "5px", height: "calc(100% - 20px)" }}>
                <img style={{ width: "100%", height: "100%" }} src={require(`${chart.imageUrl}`)} />
            </div>
            <div className="card-title">{chart.title}</div>
        </div>
    );
}

export default List;


