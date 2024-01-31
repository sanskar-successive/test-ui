import React, { useState } from 'react';
import { Button, Form, Input, LockOutlined, Title, UserOutlined, Spin, Result, message } from '../../../../lib/generics';
import { useNavigate } from 'react-router-dom'
import { UserService } from '../../Service';


const AuthPage = () => {

    const [toggleAuthForm, setToggleAuthForm] = useState("login");
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleLogin = async (values) => {
        setLoading(true);
        try {
            const { data } = await UserService.userLogin(values);

            if (data.authorised === true) {
                localStorage.setItem("AUTH-TOKEN", data.token);
                message.success("Login success")
                navigate('/', { replace: true })
            }
            else {
                message.error("Invalid email or password")
            }
            setLoading(false)
        } catch (error) {

            console.log("some error in login", error);
            message.error(error.response.data.message);
            setLoading(false)

        }
    }


    const handleRegister = async (value) => {
        setLoading(true);
        try {
            const { data } = await UserService.userRegister(value);
            setLoading(false)
            message.success("Registered successfully, Login now")
            setToggleAuthForm("login");
        } catch (error) {
            console.log("Some error occurred in register", error);
            message.error(error.response.data.message);
            setLoading(false)
        }
    };


    if (loading) {
        return <Spin />
    }

    if (toggleAuthForm === "login") {


        return (
            <>
                <Title level={4}>User Login</Title>
                <Form
                    style={{
                        maxWidth: 400,
                    }}
                    onFinish={handleLogin}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}

                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password" />



                    </Form.Item>
                    <Form.Item>

                        <a>Forgot password</a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Sign In
                        </Button>

                    </Form.Item>

                </Form>
                <Button onClick={() => setToggleAuthForm("register")} >Create an Account!</Button>
            </>
        );
    }

    return (
        <>
            <Title level={4}>User Register</Title>
            <Form
                onFinish={handleRegister}
                layout="horizontal"
                style={{
                    maxWidth: 400,
                }}
                scrollToFirstError
            >



                <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your FirstName!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="lastName"
                    label="Last Name"
                >
                    <Input />
                </Form.Item>



                <Form.Item
                    name={["contact", "email"]}
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>



                <Form.Item
                    name={["contact", "phone"]}
                    label="Phone Number"
                >
                    <Input
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>



                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>




                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>

            </Form>
            <Button onClick={() => setToggleAuthForm("login")} >Login</Button>
        </>
    );

}

export default AuthPage