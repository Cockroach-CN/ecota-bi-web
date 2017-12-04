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
            i: 1,
            open: true,
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
                                <ChartCard key={chart.key} title={chart.title}
                                    onClickCard={() => window.location.href = "/info"} />
                            )}
                        </div>
                    </div>
                )}
            </Page>
        );
    }
}

const ChartCard = (props) =>
    <Card className="chart-card">
        <div className="card-title">{props.title}</div>
        <div onClick={(e) => this.onClickCard(e)}></div>
    </Card>

export default List;


