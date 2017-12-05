import React from "react";
import Page from "../page/Page.jsx";
import {
    NavBar, Card, Icon, Tabs, Modal, WingBlank, WhiteSpace, DatePicker, List, Tag,
    Flex, SegmentedControl, Button,
} from "antd-mobile";
import "./Style.less";
import settings from "./Settings";
import moment from "moment"

const TimeType = { year: "年", month: "月", date: "日" };
class Info extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openOptions: false,
            timeType: "date",
            brandIdList: [],
            companyIdList: [],
            time: null,
        }
    }

    render() {
        let tabIndex = 0;
        const params = this.props.match.params;
        const charts = (settings.chartgroups.filter(group => String(group.key) === params.groupKey)[0] || {}).charts || [];
        const tabs = charts.map((chart, i) => {
            if (String(params.chartKey) === String(chart.key)) {
                tabIndex = i;
            }
            return ({ title: chart.title, sub: chart.key });
        });
        const brands = settings.options.brands || [];
        const companys = brands[0].companys;
        const { time, timeType, brandIdList, companyIdList } = this.state
        return (
            <Page>
                <NavBar mode="dark"
                    icon={<Icon type="left" />}
                    rightContent={<Icon key="1" type="ellipsis" onClick={() => this.setState({ openOptions: true })} />}
                    onLeftClick={() => window.location.href = "/#/list"}
                >{charts[tabIndex].title}</NavBar>
                <div style={{ height: "calc(100% - 45px)" }}>
                    <Tabs tabs={tabs}
                        initialPage={tabIndex}
                        tabBarPosition="bottom">
                        {charts.map(chart =>
                            <div key={chart.key}>
                                <img style={{ width: "100%", height: "100%" }} src={require(`${chart.url}`)} />
                            </div>
                        )}
                    </Tabs>
                </div>
                <Modal popup maskClosable
                    animationType="slide-up"
                    visible={this.state.openOptions}
                    onClose={() => this.setState({ openOptions: false })} >
                    <WhiteSpace size="sm" />
                    <div size="sm" className="options-container">
                        <div>
                            品牌
                            <Tag style={style.tag} onChange={() => this.setState({ brandIdList: [] })}>重置</Tag>
                        </div>
                        <div>
                            {brands.map((brand, i) =>
                                <Tag key={brand.id} className="tag-group">{brand.name}</Tag>
                            )}
                        </div>
                    </div>
                    <WhiteSpace size="sm" />
                    <div size="sm" className="options-container">
                        <div>
                            公司
                            <Tag style={style.tag} onChange={() => this.setState({ companyIdList: [] })}>重置</Tag>
                        </div>
                        <div>
                            {companys.map((company, i) =>
                                <Tag key={company.id} className="tag-group">{company.name}</Tag>
                            )}
                        </div>
                    </div>
                    <WhiteSpace size="sm" />
                    <div size="sm" className="options-container">
                        <div>
                            时间
                            <Tag style={style.tag} onChange={() => this.setState({ time: null, timeType: "date" })}>重置</Tag>
                            <span className="segmented-group">
                                <SegmentedControl
                                    selectedIndex={timeType === "year" ? 0 : timeType === "month" ? 1 : 2}
                                    values={['年', '月', '日']}
                                    onChange={e => {
                                        const index = e.nativeEvent.selectedSegmentIndex;
                                        this.setState({ timeType: index === 0 ? "year" : index === 1 ? "month" : "date" })
                                    }} />
                            </span>
                        </div>
                        <div className="options-time" style={{ padding: "0px -15px" }}>
                            <DatePicker
                                mode={timeType}
                                value={time}
                                format={date => moment(date).format(timeType === "year" ? "YYYY" :
                                    timeType === "month" ? "YYYY-MM" : "YYYY-MM-DD")}
                                onChange={date => this.setState({ time: date })}>
                                <List.Item arrow="horizontal">{TimeType[timeType]}</List.Item>
                            </DatePicker>
                        </div>
                    </div>
                    <WingBlank size="sm">
                        <Flex>
                            <Flex.Item>
                                <Button onClick={() => this.setState({ openOptions: false })}>取消</Button>
                            </Flex.Item>
                            <Flex.Item>
                                <Button type="primary" onClick={() => this.setState({ openOptions: false })}> 确定</Button>
                            </Flex.Item>
                        </Flex>
                    </WingBlank>
                    <WhiteSpace size="xl" />
                </Modal>
            </Page >
        );
    }
}

export default Info;


const style = {
    tag: {
        float: "right",
        marginTop: "-5px",
        backgroundColor: "#fff",
        color: "#108ee9",
        border: "1px solid #108ee9",
        borderRadius: "3px"
    }

}