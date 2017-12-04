import React from "react";
import Page from "../page/Page.jsx";
import { Flex, Button } from "antd-mobile";
import "./Style.less";

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
                <div className="chart-card-container">
                    <div className="chart-card"></div>
                    <div className="chart-card"></div>
                    <div className="chart-card"></div>
                    <div className="chart-card"></div>
                </div>
            </Page>
        );
    }
}

const ChartCard = (props) => <div className="chart-card"></div>

export default List;


