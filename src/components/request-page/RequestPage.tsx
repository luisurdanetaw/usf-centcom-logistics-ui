import React, {useEffect, useState} from 'react';
import {
    Badge,
    Button,
    Card,
    Container,
    Flex,
    Grid, Group, Pagination, ScrollArea,
    Select,
    Text,
    TextInput,
} from "@mantine/core";
import {NavbarSimple} from "../navbar-simple/NavbarSimple";
import {useNavigate} from "react-router-dom";
import FormComponent from "../form-component/FormComponent";


interface RequestPageProps {
    props: any;
}

const RequestPage: React.FC<RequestPageProps> = ({ props }) => {


    return (
        <div>
            <Container className='landing-page-container' fluid>
                <Flex
                    gap="md"
                    justify="flex-start"
                    align="flex-start"
                    direction="row"
                    wrap="nowrap"
                >
                    <NavbarSimple/>

                    <div className={"home"}>
                        <div className={"form"}>
                            <h1>Request Supplies</h1>
                        </div>

                        <Grid gutter="xl" justify="center" align="center">
                            <Grid.Col span={12}>
                                <div className={"form"}>
                                    <FormComponent
                                        fields={["facility_name", "cargo_description", "quantity", "units"]}
                                        url={"http://127.0.0.1:8000/tmr/createTMR"}
                                    />
                                </div>
                            </Grid.Col>
                        </Grid>
                    </div>
                </Flex>
            </Container>
        </div>
    );
};
export default RequestPage;