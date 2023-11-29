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
import {BarChart} from "../bar-chart/BarChart";


interface InputPageProps {
    props: any;
}

const InputPage: React.FC<InputPageProps> = ({ props }) => {


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
                            <h1>Inventory Data Form</h1>
                        </div>

                        <Grid gutter="xl" justify="center" align="center">
                            <Grid.Col span={12}>
                                <div className={"form"}>
                                    <FormComponent
                                        fields={["item_name", "quantity"]}
                                        url={"http://127.0.0.1:8000/tmr/update"}
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
export default InputPage;