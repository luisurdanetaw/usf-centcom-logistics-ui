import React, {useRef} from 'react';
import {Button, Center, Container, Grid, Image, Title} from '@mantine/core';
import {TextInput} from "@mantine/core";
import "./login-page.scss"
import {login} from "../../services/auth/login";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
const Layout: React.FC = () => {
    const navigate = useNavigate();
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const onClickLogin = async () => {
        const email = emailInputRef.current?.value || "";
        const password = passwordInputRef.current?.value || "";

        try{
            const response:boolean = await login(email, password);
            response ? navigate("/mcb/inventory") : alert("Invalid username and password combination");
        }
        catch (e) {
            alert("Invalid username and password combination");
        }
    }
    const onClickRegister = () => {
        navigate("/register");
    }

    return (
        <Container fluid className={"login-page-container"}>
            <Grid gutter="xl" justify="center" align="center">
                <Grid.Col span={6}>
                    <div className={"left"}>
                        <Image className={"icon"}
                               radius="sm"
                               src="https://logos-world.net/wp-content/uploads/2021/11/US-Army-Logo.png"
                        />
                        <Title order={1} style={{color: 'whitesmoke'}}>M.O.V.E</Title>
                        <small style={{color: 'whitesmoke'}}>"Welcome to the CENTCOM Logistics Dashboard!"</small>
                    </div>
                </Grid.Col>
                <Grid.Col span={6}>
                    <div className={"right"}>
                        <Title className={"welcome-text"}order={1}>Welcome Back</Title>
                        <div className={"login-form-inputs"}>
                            <TextInput
                                label="Email"
                                placeholder="example@army.mil"
                                ref={emailInputRef}
                                classNames={{input:'input', label:'label'}}
                            />
                            <TextInput
                                className={"input"}
                                label="Password"
                                ref={passwordInputRef}
                                type="password"
                                classNames={{input:'input', label:'label'}}
                            />
                        </div>
                        <div className={"login-form-buttons"}>
                            <div>
                                <a className={"forgot-password"} href={"#"}>Forgot your password?</a>
                            </div>
                            <Button variant="filled" className={"login-button grow-on-hover"} onClick={onClickLogin}>Login</Button>
                            <Button variant="outline"  className={"signup-button grow-on-hover"} onClick={onClickRegister}>Sign Up</Button>
                        </div>
                    </div>
                </Grid.Col>
            </Grid>
        </Container>
    );
};

export default Layout;