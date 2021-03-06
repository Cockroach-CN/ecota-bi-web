import React from "react";
import Page from "../page/Page.jsx";
import List2Column from "../layout/ListToColumn.jsx";
import {
    NavBar, Card, Icon, Tabs, Modal, WingBlank, WhiteSpace, DatePicker, List,
    Flex, SegmentedControl, Button,
} from "antd-mobile";
import { classList } from "../../commons/Style.js"
import "./Style.less";
import moment from "moment";

const settings = window.settings;
const TimeType = { year: "年", month: "月", date: "日" };
const defaultOptions = {
    timeType: "date",
    brandIdList: [],
    selectAllBrand: true,
    marketIdList: [],
    selectAllMarket: true,
    time: null,
}
class Info extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chartKey: props.chartKey,
            openOptions: false,
            options: this.convertObj(defaultOptions),
            optionsBak: this.convertObj(defaultOptions),
        }
    }

    render() {
        let tabIndex = 0;
        const { groupKey } = this.props;
        const { openOptions, chartKey, options, optionsBak } = this.state;
        const charts = (settings.chartgroups.filter(group => String(group.key) === String(groupKey))[0] || {}).charts || [];
        const tabs = charts.map((chart, i) => {
            if (String(chartKey) === String(chart.key)) {
                tabIndex = i;
            }
            return ({ title: chart.title, sub: chart.key });
        });
        const brands = settings.options.brands || [];
        const markets = settings.options.markets || [];
        const { time, timeType, brandIdList, marketIdList, selectAllBrand, selectAllMarket } = options;
        return (
            <Page>
                {/* <NavBar mode="dark"
                    icon={<Icon type="left" />}
                    rightContent={<Icon key="1" type="ellipsis" onClick={() => this.setState({ openOptions: true })} />}
                    onLeftClick={() => this.props.backListPage()}
                >{charts[tabIndex].title}</NavBar> */}
                <div style={{ height: "100%", position: "relative" }}>
                    <div className="float-back" onClick={() => this.props.backListPage()}>
                        <i className="glyphicon glyphicon-arrow-left"></i>
                    </div>
                    <Tabs tabs={tabs} swipeable={false} tabBarUnderlineStyle={{ display: "none" }}
                        initialPage={tabIndex}
                        prerenderingSiblingsNumber={100}
                        tabBarPosition="bottom"
                        renderTab={(tab) => <div className={classList("chart-tab-bar", tab.sub === charts[tabIndex].key && "chart-tab-bar-active")}>{tab.title}</div>}
                        onChange={(tab, index) => {
                            this.setState({ chartKey: tab.sub });
                            // todo
                        }}>
                        {charts.map(chart =>
                            <div key={chart.key} className="iframe-container">
                                {chart.key === chartKey ?
                                    <iframe id="_blank" name="_blank" src={chart.htmlUrl} frameBorder="0"
                                        style={{ height: "100%", width: "100%" }}
                                    ></iframe> : null}
                            </div>
                        )}
                    </Tabs>
                </div>
                <Modal popup maskClosable
                    animationType="slide-up"
                    visible={openOptions}
                    onClose={() => this.setState({ openOptions: false },
                        () => this.setState({ options: this.convertObj(optionsBak) }))} >
                    <WhiteSpace size="sm" />
                    <div size="sm" className="options-container">
                        <div>
                            品牌
                            <Tag selected={selectAllBrand} style={style.tag}
                                onClick={() => this.setOptions({ brandIdList: [], selectAllBrand: true })}>全部</Tag>
                        </div>
                        <div>
                            <List2Column>
                                {brands.map((brand, i) =>
                                    <Tag key={brand.id} style={{ width: "100%" }}
                                        className="tag-group"
                                        selected={brandIdList.indexOf(brand.id) > -1}
                                        onClick={(selected) => {
                                            if (selected) {
                                                options.brandIdList.push(brand.id);
                                                options.selectAllBrand = false;
                                            } else {
                                                options.brandIdList = brandIdList.filter(id => id !== brand.id);
                                                if (options.brandIdList.length === 0) {
                                                    options.selectAllBrand = true;
                                                }
                                            }
                                            this.setState(this.state);
                                        }}>{brand.name}</Tag>
                                )}
                            </List2Column>
                        </div>
                    </div>
                    <WhiteSpace size="sm" />
                    <div size="sm" className="options-container">
                        <div>
                            市场
                            <Tag selected={selectAllMarket} style={style.tag}
                                onClick={() => this.setOptions({ marketIdList: [], selectAllMarket: true })}>全部</Tag>
                        </div>
                        <div>
                            <List2Column>
                                {markets.map((market, i) =>
                                    <Tag key={market.id} style={{ width: "100%" }}
                                        className="tag-group"
                                        selected={marketIdList.indexOf(market.id) > -1}
                                        onClick={(selected) => {
                                            if (selected) {
                                                options.marketIdList.push(market.id);
                                                options.selectAllMarket = false;
                                            } else {
                                                options.marketIdList = marketIdList.filter(id => id !== market.id);
                                                if (options.marketIdList.length === 0) {
                                                    options.selectAllMarket = true;
                                                }
                                            }
                                            this.setState(this.state);
                                        }}>{market.name}</Tag>
                                )}
                            </List2Column>
                        </div>
                    </div>
                    <WhiteSpace size="sm" />
                    <div size="sm" className="options-container">
                        <div>
                            时间
                            <Tag selected style={style.tag} onClick={() => this.setOptions({ time: null, timeType: "date" })}>重置</Tag>
                            <span className="segmented-group">
                                <SegmentedControl
                                    selectedIndex={timeType === "year" ? 0 : timeType === "month" ? 1 : 2}
                                    values={['年', '月', '日']}
                                    onChange={e => {
                                        const index = e.nativeEvent.selectedSegmentIndex;
                                        this.setOptions({ timeType: index === 0 ? "year" : index === 1 ? "month" : "date" })
                                    }} />
                            </span>
                        </div>
                        <div className="options-time" style={{ padding: "0px -15px" }}>
                            <DatePicker
                                mode={timeType}
                                value={time}
                                format={date => moment(date).format(timeType === "year" ? "YYYY" :
                                    timeType === "month" ? "YYYY-MM" : "YYYY-MM-DD")}
                                onChange={date => this.setOptions({ time: date })}>
                                <List.Item arrow="horizontal">{TimeType[timeType]}</List.Item>
                            </DatePicker>
                        </div>
                    </div>
                    <WhiteSpace size="sm" />
                    <WingBlank size="sm">
                        <Flex>
                            <Flex.Item>
                                <Button type="ghost"
                                    onClick={() => this.setState({
                                        options: this.convertObj(defaultOptions),
                                        optionsBak: this.convertObj(defaultOptions),
                                    })} >
                                    重置
                                </Button>
                            </Flex.Item>
                            <Flex.Item>
                                <Button type="primary"
                                    onClick={() => this.setState({ openOptions: false },
                                        () => this.setState({ optionsBak: this.convertObj(options) }))} >
                                    确定
                                </Button>
                            </Flex.Item>
                        </Flex>
                    </WingBlank>
                    <WhiteSpace size="sm" />
                </Modal>
            </Page >
        );
    }

    convertObj(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    setOptions(options) {
        this.setState({ options: Object.assign(this.state.options, options) });
    }
}

export default Info;


const style = {
    tag: {
        float: "right",
        marginTop: "-5px",
    }
}


export class Tag extends React.Component {
    render() {
        const { selected, style, className } = this.props;
        return (
            <div style={style} className={classList("am-tag",
                className && className,
                selected ? "am-tag-active" : "am-tag-normal")}
                onClick={() => this.props.onClick ? this.props.onClick(!selected) : null}>
                <div id="am-tag-text" >{this.props.children}</div>
            </div>
        );
    }
}
