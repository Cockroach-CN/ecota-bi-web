import React from "react";
import "./Style.less";

class List extends React.Component {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default List;