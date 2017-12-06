import React from "react";
import "./Style.less";

class Page extends React.Component {

    render() {
        return (
            <div className="ecota-page">
                {this.props.children}
            </div>
        );
    }
}

export default Page;