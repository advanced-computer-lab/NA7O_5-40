import { useState } from 'react';
import { Form, Input, Button, Alert, Avatar } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { UserOutlined } from '@ant-design/icons';

import Axios from 'axios';
import '../components.css'

const Login = () => {
    const [failed, setFailed] = useState(false)
    const [redirect, setRedirect] = useState(false);

    const navigate = useNavigate();

    const onFinish = ({ username, password }) => {
        Axios.post('http://localhost:8000/login', {
            username,
            password
        }).then((response) => {
            //  history.replace('/employee/home')
            navigate('/flights')
        }).catch((e) => {
            console.log(e)
            setFailed(true)
        })
    };


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // if(redirect) {
    //     return <Redirect to='/somewhere' />;
    // } 

    return (
        <div className='login-background' >
            <div className="login" >
                <div className='avatar-login'>
                    <Avatar size={120} style={{ backgroundColor: 'black' }} icon={<UserOutlined />} />
                </div>
                <Form
                    className="login-form"
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="on"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                                type: 'string',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 11,
                            span: 4,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 10,
                            span: 16,
                        }}
                    >
                        <Link to="/forgotpassword">Forgot Password ?</Link>

                    </Form.Item>

                    {
                        failed
                            ?
                            <Alert
                                message="Error"
                                description="Wrong email or password!"
                                type="error"
                                showIcon
                            />
                            :
                            null
                    }
                </Form>
            </div>
        </div>
    );
};

export default Login