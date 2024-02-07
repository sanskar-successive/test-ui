import React from 'react'
import { Button, Header, Title, theme, LogoutOutlined } from '../../../generics';
import { useNavigate } from 'react-router-dom'

const LayoutHeader = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem("AUTH-TOKEN");
        navigate('/login', {replace:true})
    };

    return (

        <Header
            style={{
                display: 'flex',
                alignItems: 'center',
                background: colorBgContainer,
            }}
        >
            <Title level={2}>Book App</Title>
            <Button onClick={handleLogout}><LogoutOutlined /></Button>

        </Header>

    )
}

export default LayoutHeader;