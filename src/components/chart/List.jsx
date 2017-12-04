import React from "react";
import { Flex, Button } from "antd-mobile";
import "./Style.less";

class List extends React.Component {

    render() {
        return (
            <div>
                List
                <Button mode="primary">点击</Button>
            </div>
        );
    }
}

export default List;