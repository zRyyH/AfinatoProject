import React, { useContext } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AppContext } from "../../contexts/appContext";
import Logo from '../Logo';
import styles from './index.module.css';
import useRequest from "../../hooks/useRequest";
import { fetchAuth } from '../../api/services/authService';


const LoginComponent = () => {
    const { request } = useRequest(false);
    const { setAuth, setToken } = useContext(AppContext);

    async function login(values) {
        const payload = { email: values.email, password: values.password }
        const { data, success } = await request(fetchAuth, payload);

        if (success) {
            setAuth(true);
            setToken(data.data.token);
        }
    };

    return (
        <div className={styles.master} >
            <div style={{ paddingBottom: '30px' }} >
                <Logo height={'80px'} />
            </div>

            <Form
                name="login-form"
                initialValues={{ remember: true }}
                onFinish={login}
            >
                {/* Campo de Usuário */}
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: "Por favor, insira seu usuário!" }]}
                >
                    <Input
                        prefix={<UserOutlined />}
                        placeholder="Usuário"
                        size="large"
                    />
                </Form.Item>

                {/* Campo de Senha */}
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: "Por favor, insira sua senha!" }]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Senha"
                        size="large"
                    />
                </Form.Item>

                {/* Botão de Login */}
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        size="large"
                    >
                        Entrar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginComponent;