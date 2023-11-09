import React, {useEffect, useState} from 'react';
import {Button, Card, ColorSwatch, Container, Flex, Grid, Group, Select, Text} from "@mantine/core";
import './tmr-page.scss'
import {NavbarSimple} from "../navbar-simple/NavbarSimple";
import { useMemo } from 'react';
import DataTable from "../data-table/DataTable";
import {RingCard} from "../stats-ring-card/RingCard";
import {ProgressCard} from "../progress-card/ProgressCard";
import {TableSort} from "../table/TableSort";
import SearchResultsTable from "../../search-results-table/SearchResultsTable";
import {getAllTmrsByFacility} from "../../services/api/tmr";
import {searchFacilityBySupplies} from "../../services/api/facility";


interface TmrPageProps {
    name: string;
}

const TmrPage: React.FC<TmrPageProps> = ({ name }) => {
    const [tmrData, setTmrData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tmrs = await getAllTmrsByFacility('1');
                setTmrData(tmrs);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

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
                            <h1 style={{width: '100vw'}}>TMR Information</h1>
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <SearchResultsTable
                                height="75vh"
                                searchResults={tmrData}
                                rowContent={
                                    (result) => {
                                        return (
                                            <React.Fragment>
                                                <Group justify="space-between" mt="md" mb="xs">
                                                    <Text fw={500} c={"lightgray"}>Requester: {result.requestor}</Text>
                                                </Group>
                                                <Text size="sm" c="dimmed">Status: {result.status}</Text>
                                                <Text size="sm" c="dimmed">Cargo Description: {result.cargo_description}</Text>
                                                <Text size="sm" c="dimmed">Email: {result.email}</Text>
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