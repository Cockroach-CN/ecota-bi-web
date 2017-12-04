import React from "react";
import Page from "../page/Page.jsx";
import { NavBar, Card, Icon, Tabs, Modal, DatePicker, List } from "antd-mobile";
import "./Style.less";
import settings from "./Settings";

class Info extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openOptions: false,
        }
    }

    render() {
        const groups = settings.chartgroups;
        const charts = groups[0].charts;
        const tabs = charts.map((chart, i) => ({ title: chart.title, sub: String(i + 1) }));
        console.log(tabs);
        return (
            <Page>
                <NavBar mode="dark"
                    icon={<Icon type="left" />}
                    rightContent={<Icon key="1" type="ellipsis" onClick={() => this.setState({ openOptions: true })} />}
                    onLeftClick={() => window.location.href = "/list"}
                >info</NavBar>
                <div style={{ height: "calc(100% - 45px)" }}>
                    <Tabs tabs={tabs}
                        initialPage={1}
                        tabBarPosition="bottom"
                        renderTab={tab => <span>{tab.title}</span>}>
                        {charts.map(chart => <div key={chart.key}> {chart.title} </div>)}
                    </Tabs>
                </div>
                <Modal popup maskClosable
                    animationType="slide-up"
                    visible={this.state.openOptions}
                    onClose={() => this.setState({ openOptions: false })} >
                    <DatePicker
                        mode="month"
                        format="YYYY-MM"
                        value={new Date()}
                        onChange={date => { }}>
                        <List.Item arrow="horizontal">month</List.Item>
                    </DatePicker>
                </Modal>
            </Page >
        );
    }
}

export default Info;


