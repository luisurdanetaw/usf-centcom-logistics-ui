import React from 'react';
import {Button, ColorSwatch, Container, Flex, Grid, Image, Select, SimpleGrid, TextInput, Title} from "@mantine/core";
import './home-page.scss'
import {NavbarSimple} from "../navbar-simple/NavbarSimple";
import {ProgressCard} from "../progress-card/ProgressCard";
import {RingCard} from "../stats-ring-card/RingCard";

interface HelloWorldProps {
    name: string;
}

const HomePage: React.FC<HelloWorldProps> = ({ name }) => {
    const initialData = [
        { time: '2018-12-22', value: 32.51 },
        { time: '2018-12-23', value: 31.11 },
        { time: '2018-12-24', value: 27.02 },
        { time: '2018-12-25', value: 27.32 },
        { time: '2018-12-26', value: 25.17 },
        { time: '2018-12-27', value: 28.89 },
        { time: '2018-12-28', value: 25.46 },
        { time: '2018-12-29', value: 23.92 },
        { time: '2018-12-30', value: 22.68 },
        { time: '2018-12-31', value: 22.67 },
    ];

    const onClickRequestSupplies = () => {

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
                            <h1>123rd Test Movement Control Batallion</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum auctor ante, eu tincidunt tortor pulvinar ut. Integer eget dapibus justo.  </p>
                        </div>

                        <Grid gutter="xl" justify="center" align="center">
                            <Grid.Col span={6}>
                                <div className={"left"}>
                                    <span>Status: </span>
                                    <ColorSwatch color={"green"} component="span" className={"color-code"}/>
                                    <p>Location: Tampa, FL</p>

                                    <Button variant="filled" className={"request-button grow-on-hover"} onClick={onClickRequestSupplies}>Request Supplies</Button>

                                </div>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <div className={"right"}>
                                    <h2 className={"right-header"}>Inventory</h2>
                                    <Select
                                        className={"select-menu"}
                                        label="Search supplies"
                                        placeholder="e.g M249 SAW"
                                        data={['Gas', 'Ammo', 'Water', 'MREs']}
                                        searchable
                                        bg="rgba(0,0,0,0)"
                                        styles={{ dropdown: { maxHeight: 200, overflowY: 'auto', backgroundColor: 'black' } }}
                                    />
                                    <RingCard/>
                                    <ProgressCard
                                        title={"Inventory Level / Stockage Objective"}
                                        currentValue={6253}
                                        total={10000}
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
export default HomePage;