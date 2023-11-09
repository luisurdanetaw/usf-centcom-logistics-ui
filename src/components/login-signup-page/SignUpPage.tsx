import React, {useRef} from 'react';
import {Button, Center, Container, Grid, Image, Title, Select, NumberInput, Box} from '@mantine/core';
import {TextInput} from "@mantine/core";
import { useForm, isNotEmpty, isEmail, isInRange, hasLength, matches } from '@mantine/form';
import "./signup-page.scss"
import {useNavigate} from "react-router-dom";
import {register} from "../../services/auth/register";
const SignUpPage: React.FC = () => {
    const navigate = useNavigate();
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const firstNameInputRef = useRef<HTMLInputElement>(null);
    const lastNameInputRef = useRef<HTMLInputElement>(null);
    const positionInputRef = useRef<HTMLInputElement>(null);
    const phoneInputRef = useRef<HTMLInputElement>(null);
    
    const form = useForm({
        initialValues: {
        email: emailInputRef.current?.value || "",
        password: passwordInputRef.current?.value || "",
        firstName: firstNameInputRef.current?.value || "",
        lastName: lastNameInputRef.current?.value || "",
        position: positionInputRef.current?.value || "",
        phone: phoneInputRef.current?.value || ""
        },
        validate: {
        email: isEmail(),
        password: (value) => (/^(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(value) ? null : 'Password must be at least 8 characters long and include at least one uppercase letter and one special character'),
        firstName: (value) => (value.length < 2 ? 'First name must have at least 2 letters' : null),
        lastName: (value) => (value.length < 2 ? 'Last name must have at least 2 letters' : null),
        position: isNotEmpty(),
        phone: isNotEmpty(),
        },
    });

    const email = emailInputRef.current?.value || "";
    const password = passwordInputRef.current?.value || "";
    const firstName = firstNameInputRef.current?.value || "";
    const lastName = lastNameInputRef.current?.value || "";
    const position = positionInputRef.current?.value || "";
    const phone = phoneInputRef.current?.value || "";

    const onClickRegister = async () => {
    try{
        if(form.isValid()){
            const response:any = await register(email, password, firstName, lastName, position, phone);
            if(response !== null){
                alert("Registration successful. Please login");
                navigate("/")
            }
        }
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
                        <Title order={1} style={{color: 'whitesmoke'}}>M.O.V.E</Title>
                        <small style={{color: 'whitesmoke'}}>"Welcome to the M.O.V.E Logistics Dashboard!"</small>
                    </div>
                </Grid.Col>
                <Grid.Col span={6}>
                    <div className={"right-page"}>
                        <Title className={"welcome-text"}order={1}>Create Account</Title>
                        <div className={"login-form-inputs"}>
                        <Box maw={340} mx="auto">
                            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                                <TextInput
                                    label="First Name"
                                    ref={firstNameInputRef}
                                    withAsterisk
                                    classNames={{input:'input', label:'label'}}
                                    {...form.getInputProps('firstName')}
                                />
                                <TextInput
                                    label="Last Name"
                                    ref={lastNameInputRef}
                                    withAsterisk
                                    classNames={{input:'input', label:'label'}}
                                    {...form.getInputProps('lastName')}
                                />
                                <TextInput
                                    label="Email"
                                    placeholder="example@army.mil"
                                    ref={emailInputRef}
                                    classNames={{input:'input', label:'label'}}
                                    {...form.getInputProps('email')}
                                    withAsterisk
                                />
                                <Select
                                    label="Position"
                                    placeholder="Choose Position"
                                    ref={positionInputRef}
                                    data={['Logistics Personnel', 'Inventory Manager']}
                                    classNames={{input:'input', label:'label'}}
                                    {...form.getInputProps('position')}
                                />
                                <TextInput
                                    label="Phone"
                                    placeholder="123-456-6890"
                                    ref={phoneInputRef}
                                    classNames={{input:'input', label:'label'}}
                                    {...form.getInputProps('phone')}
                                />
                                <TextInput
                                    label="Password"
                                    ref={passwordInputRef}
                                    type="password"
                                    classNames={{input:'input', label:'label'}}
                                    {...form.getInputProps('password')}
                                />
                            <div className={"login-form-buttons"}>
                            <Button variant="outline" style={{marginRight:'10px'}}className={"signup-button grow-on-hover"} onClick={onClickLogin}>Login</Button>
                            <Button variant="filled" className={"login-button grow-on-hover"} onClick={onClickRegister} type="submit">Sign Up</Button>
                            </div>
                            </form>
                        </Box>
                        </div>
                    </div>
                </Grid.Col>
            </Grid>
        </Container>
    );
};

export default SignUpPage;