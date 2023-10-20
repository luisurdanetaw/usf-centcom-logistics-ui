import React from 'react';
import {Button, Card, ColorSwatch, Container, Flex, Grid, Select, Text} from "@mantine/core";
import './tmr-page.scss'
import {NavbarSimple} from "../navbar-simple/NavbarSimple";
import { useMemo } from 'react';
import DataTable from "../data-table/DataTable";
import {RingCard} from "../stats-ring-card/RingCard";
import {ProgressCard} from "../progress-card/ProgressCard";


interface TmrPageProps {
    name: string;
}

const elements = [
    { number: 1, requester: 'John', active: true, description: 'Element 1', position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { number: 2, requester: 'Alice', active: false, description: 'Element 2', position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { number: 3, requester: 'Bob', active: true, description: 'Element 3', position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { number: 4, requester: 'Eve', active: true, description: 'Element 4', position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { number: 5, requester: 'Charlie', active: false, description: 'Element 5', position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];
const TmrPage: React.FC<TmrPageProps> = ({ name }) => {



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
                            <h2>TMRs </h2>
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <DataTable data={elements}/>
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