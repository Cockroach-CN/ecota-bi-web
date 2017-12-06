import React from "react";
import "./Style.less";

class List extends React.Component {

    render() {
        return (
            <div className="ecota-page">
                {this.props.children}
            </div>
        );
    }
}

export default List;