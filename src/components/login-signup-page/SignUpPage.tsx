import React, {useRef} from 'react';
import {Button, Center, Container, Grid, Image, Title} from '@mantine/core';
import {TextInput} from "@mantine/core";
import "./login-page.scss"
import {useNavigate} from "react-router-dom";
import {register} from "../../services/auth/register";
const SignUpPage: React.FC = () => {
    const navigate = useNavigate();
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const onClickRegister = async () => {
        const email = emailInputRef.current?.value || "";
        const password = passwordInputRef.current?.value || "";

        try{
            const response:any = await register(email, password);
            if(response !== null){
                alert("Registration successful. Please login");
                navigate("/")
            }  else alert("invalid credentials");
        }
        catch (e) {
            alert("Invalid username and password combination");
        }
    }

    const onClickLogin = () => {
        navigate("/");
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
                        <Title order={1} style={{color: 'whitesmoke'}}>CENTCOM</Title>
                        <small style={{color: 'whitesmoke'}}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum felis a eros vehicula, eu fringilla dui volutpat."</small>
                    </div>
                </Grid.Col>
                <Grid.Col span={6}>
                    <div className={"right"}>
                        <Title className={"welcome-text"}order={1}>Create Account</Title>
                        <div className={"login-form-inputs"}>
                            <TextInput
                                label="Email"
                                placeholder="example@army.mil"
                                ref={emailInputRef}
                                classNames={{input:'input', label:'label'}}
                            />
                            <TextInput
                                label="Password"
                                ref={passwordInputRef}
                                type="password"
                                classNames={{input:'input', label:'label'}}
                            />
                        </div>
                        <div className={"login-form-buttons"}>
                            <Button variant="outline" style={{marginRight:'10px'}}className={"signup-button grow-on-hover"} onClick={onClickLogin}>Login</Button>
                            <Button variant="filled" className={"login-button grow-on-hover"} onClick={onClickRegister}>Sign Up</Button>
                        </div>
                    </div>
                </Grid.Col>
            </Grid>
        </Container>
    );
};

export default SignUpPage;