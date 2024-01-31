import React from 'react'
import { Anchor, Sider, theme } from '../../../generics';
import { siderItems } from '../../utils/siderItems';


const Sidebar = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Sider
            width={200}
            style={{
                background: colorBgContainer,
            }}
        >
            <Anchor items={siderItems} />

        </Sider>
    )
}

export default Sidebar