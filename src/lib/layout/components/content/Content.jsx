import React from 'react'
import { Content, theme } from '../../../generics';

const PageContent = ({ children }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Content
            style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
            }}
        >
            {children}
        </Content>
    )
}

export default PageContent