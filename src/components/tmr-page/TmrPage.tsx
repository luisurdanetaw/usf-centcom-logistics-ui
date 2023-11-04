import React, {useState} from 'react';
import {Button, Card, ColorSwatch, Container, Flex, Grid, Group, Select, Text} from "@mantine/core";
import './tmr-page.scss'
import {NavbarSimple} from "../navbar-simple/NavbarSimple";
import { useMemo } from 'react';
import DataTable from "../data-table/DataTable";
import {RingCard} from "../stats-ring-card/RingCard";
import {ProgressCard} from "../progress-card/ProgressCard";
import {TableSort} from "../table/TableSort";
import SearchResultsTable from "../../search-results-table/SearchResultsTable";


interface TmrPageProps {
    name: string;
}

const data = [
    {
        name: 'Athena Weissnat',
        company: 'Little - Rippin',
        email: 'Elouise.Prohaska@yahoo.com',
        received: '10/10/2023',
        approved: '10/10/2023',
        loaded: '10/12/2023',
        shipped: '',
        fulfilled: ''
    },
    {
        name: 'Deangelo Runolfsson',
        company: 'Greenfelder - Krajcik',
        email: 'Kadin_Trantow87@yahoo.com',
        received: '10/10/2023',
        approved: '10/10/2023',
        loaded: '10/12/2023',
        shipped: '',
        fulfilled: ''
    },
    {
        name: 'Danny Carter',
        company: 'Kohler and Sons',
        email: 'Marina3@hotmail.com',
        received: '10/10/2023',
        approved: '10/10/2023',
        loaded: '10/12/2023',
        shipped: '',
        fulfilled: ''
    },
    {
        name: 'Trace Tremblay PhD',
        company: 'Crona, Aufderhar and Senger',
        email: 'Antonina.Pouros@yahoo.com',
        received: '10/10/2023',
        approved: '10/10/2023',
        loaded: '10/12/2023',
        shipped: '',
        fulfilled: ''
    },
    {
        name: 'Derek Dibbert',
        company: 'Gottlieb LLC',
        email: 'Abagail29@hotmail.com',
        received: '10/10/2023',
        approved: '10/10/2023',
        loaded: '10/12/2023',
        shipped: '',
        fulfilled: ''
    }];
const TmrPage: React.FC<TmrPageProps> = ({ name }) => {
    const [tmrData, setTmrData] = useState<any>([])

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
                    <Grid style={{marginLeft: '2em'}} gutter="xl" justify="center" align="center">
                        <Grid.Col span={12}>
                            <h1 >123rd Movement Control Batallion</h1>
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <h2>TMR Information </h2>
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <SearchResultsTable
                                searchResults={data}
                                rowContent={
                                    (result) => {
                                        return (
                                            <React.Fragment>
                                                <Group justify="space-between" mt="md" mb="xs">
                                                    <Text fw={500} c={"lightgray"}>Requester: {result.name}</Text>
                                                </Group>
                                                <Text size="sm" c="dimmed">Quantity: {result.email}</Text>
                                            </React.Fragment>
                                        )
                                    }

                                }
                                withDrawer={true}
                            />
                        </Grid.Col>

                    </Grid>
                    <div>

                    </div>



                 </Flex>
            </Container>
        </div>
    );
};
export default TmrPage;