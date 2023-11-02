import React, {useEffect, useState} from 'react';
import {
    Badge,
    Button,
    Card,
    Container,
    Flex,
    Grid, Group,
    Select,
    Text,
    TextInput,
} from "@mantine/core";
import {NavbarSimple} from "../navbar-simple/NavbarSimple";
import {RingCard} from "../stats-ring-card/RingCard";
import {ProgressCard} from "../progress-card/ProgressCard";
import {useNavigate} from "react-router-dom";


interface SupplySearchPageProps {
    props: any;
}

const SupplySearchPage: React.FC<SupplySearchPageProps> = ({ props }) => {
    const navigate = useNavigate();
    const [query, setQuery] = useState<string>('')
    const [searchResults, setSearchResults] = useState<any>([]);

    async function onClickSearch() {

    }

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
                        <div className={"left"}>
                            <h1>Facility Information and Inventory</h1>
                            <p>Movement Control Batallion Logistics - Facility lookup and inventory search page. </p>
                        </div>

                        <Grid gutter="xl" justify="center" align="center">
                            <Grid.Col span={12}>
                                <div className={"left"}>
                                    <h2 className={"right-header"}>Supply Search</h2>

                                    <TextInput
                                        className={"select-menu"}
                                        onChange={() => null}
                                        label="Search supplies"
                                        description="Facilities with supply in stock will be displayed"
                                        placeholder="e.g Gas"
                                        bg="black"
                                        style={{display:'inline-block', backgroundColor: 'black !important', marginRight: '2em' }}
                                    />
                                    <div style={{display:'inline-block', marginRight:'2em', marginTop:'1.5em'}}>
                                        <Button
                                            className='grow-on-hover'
                                            variant="light" color="lightgray"
                                            fullWidth mt="md" radius="md"
                                            onClick={onClickSearch}
                                            style={{backgroundColor: 'rgba(255, 208, 18, 0.6)',  marginRight: '2em !important'}}
                                        >
                                            Search supplies
                                        </Button>
                                    </div>
                                </div>
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <div className="left">
                                    <h5>Query results for {query}: {searchResults.length} found</h5>
                                    {
                                        searchResults.map((result:any, i:number) => {
                                            return (
                                                <Card key={i} shadow="sm" padding="lg" radius="xs" withBorder style={{backgroundColor: 'black', borderRight: 'black', borderLeft: 'black', paddingLeft: '0', marginRight: '2em'}}>
                                                    <Grid gutter="xl" justify="center" align="center">
                                                        <Grid.Col span={6}>
                                                            <Group justify="space-between" mt="md" mb="xs">
                                                                <Text fw={500} c={"lightgray"}>Facility: {result.facility}</Text>
                                                            </Group>
                                                            <Text size="sm" c="dimmed">Quantity: {result.quantity}</Text>
                                                            <Text size="sm" c="dimmed">Consumption Factor: {result.cf}</Text>
                                                            <Text size="sm" c="dimmed">Stockage Objective: {result.so}</Text>
                                                        </Grid.Col>
                                                        <Grid.Col span={6}>
                                                            <Button
                                                                className='grow-on-hover'
                                                                variant="light" color="lightgray"
                                                                fullWidth mt="md" radius="md"
                                                                onClick={onClickSearch}
                                                                style={{backgroundColor: 'rgba(255, 208, 18, 0.6)', maxWidth: '30%', marginLeft:'auto', marginRight: '1em'}}
                                                            >
                                                                Request Supplies
                                                            </Button>
                                                        </Grid.Col>
                                                    </Grid>
                                                </Card>
                                            )
                                        })

                                    }
                                </div>
                            </Grid.Col>
                        </Grid>
                    </div>
                </Flex>
            </Container>
        </div>
    );
};
export default SupplySearchPage;