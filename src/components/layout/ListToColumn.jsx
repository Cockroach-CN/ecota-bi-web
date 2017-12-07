import React from "react";
import { Flex } from "antd-mobile";

const Index = (props) => {

    const column = Number(props.column || 3);
    const trList = [];
    const domList = props.children || [];
    for (let i = 0; i < Math.ceil(domList.length / column); i++) {
        const trDom = [];
        for (let j = 0; j < column; j++) {
            trDom[j] = domList[i * column + j];
        }
        trList[i] = trDom;
    }

    return <section>
        {(trList || []).map((subList, i) =>
            <Flex key={i}>
                {(subList || []).map((dom, j) =>
                    <Flex.Item key={j}>{dom}</Flex.Item>
                )}
            </Flex>
        )}
    </section>
}

export default Index;