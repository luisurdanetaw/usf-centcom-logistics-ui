import React, {useEffect, useState} from 'react';
import {
    Badge,
    Button,
    Card,
    ColorSwatch,
    Container,
    Flex,
    Grid, Group,
    Image,
    Select,
    SimpleGrid, Text,
    TextInput,
    Title
} from "@mantine/core";
import './inventory-page.scss'
import {NavbarSimple} from "../navbar-simple/NavbarSimple";
import {ProgressCard} from "../progress-card/ProgressCard";
import {RingCard} from "../stats-ring-card/RingCard";
import {StatsSegmented} from "../stats-segmeneted/StatsSegmented";
import {useNavigate} from "react-router-dom";
import {searchFacilityByName} from "../../services/api/facility";

interface HelloWorldProps {
    name: string;
}

const InventoryPage: React.FC<HelloWorldProps> = ({ name }) => {
    const navigate = useNavigate();
    const [facilityData, setFacilityData] = useState<any | null>(null);
    const [inventoryData, setInventoryData] = useState<any>({gas:{quantity:0,so:0,cf:0}});
    const [selectedSupplyData, setSelectedSupplyData] = useState<any>({quantity:0,so:0,cf:0});
    const [selectedSupply, setSelectedSupply] = useState<string>("");
    const [options, setOptions] = useState<string[]>(["Test"])

    const [facilityName, setFacilityName] = useState('Fort Moore');

    async function onClickSearch() {
        const facility = await searchFacilityByName(facilityName);
        console.log(facility)
        setFacilityData(facility);
    }
    useEffect(() => {
        if (facilityData) {
            const inventory = facilityData['inventory'];
            console.log(inventory);
            setInventoryData(inventory);

            if (inventory) {
                const selectedSupply = Object.keys(inventory).at(0);
                console.log("Selected supply: ", selectedSupply);

                if (selectedSupply) {
                    setSelectedSupply(selectedSupply);
                    const selectedSupplyData = inventory[selectedSupply];
                    console.log("Selected supply data: ", selectedSupplyData);
                    setSelectedSupplyData(selectedSupplyData);
                }
            }
        }
    }, [facilityData]);

    useEffect(() => {
        const supplyOptions = Object.keys(inventoryData);
        console.log("variable options", supplyOptions);
        setOptions(supplyOptions);
        console.log("options after update: ", options);
    }, [inventoryData]);


    useEffect(() => {
        onClickSearch()
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

                    <div className={"home"}>
                        <div className={"left"}>
                            <h1>123rd Test Movement Control Batallion</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum auctor ante, eu tincidunt tortor pulvinar ut. Integer eget dapibus justo.  </p>
                        </div>

                        <Grid gutter="xl" justify="center" align="center">
                            <Grid.Col span={6}>
                                <div className={"left"}>
                                    <h2 className={"right-header"}>Facility</h2>

                                    <Card shadow="sm" padding="lg" radius="xs" withBorder style={{backgroundColor: 'black', borderRight: 'black', borderLeft: 'black', paddingLeft: '0', marginRight: '2em'}}>

                                        <Group justify="space-between" mt="md" mb="xs">
                                            <Text fw={500}>{facilityData?.['name']}</Text>
                                            <Badge color="red" variant="light">
                                                Critical
                                            </Badge>
                                        </Group>

                                        <Text size="sm" c="dimmed">
                                            Location: {facilityData?.['location']}
                                        </Text>
                                        <Text size="sm" c="dimmed">
                                            CO: {facilityData?.['co']}
                                        </Text>
                                        <Text size="sm" c="dimmed">
                                            Phone: {facilityData?.['phone']}
                                        </Text>
                                        <Text size="sm" c="dimmed">
                                            Email: {facilityData?.['email']}
                                        </Text>

                                        <Button
                                            className='grow-on-hover'
                                            variant="light" color="lightgray"
                                            fullWidth mt="md" radius="md"
                                            onClick={()=>{navigate('/mcb/trends')}}
                                            style={{backgroundColor: 'rgba(255, 208, 18, 0.6)'}}
                                        >
                                            View facility trends
                                        </Button>
                                    </Card>
                                    <h3>View different facility</h3>
                                    <TextInput
                                        className={"select-menu"}
                                        onChange={(event) => setFacilityName(event.currentTarget.value)}
                                        label="Search facilities"
                                        description="Input description"
                                        placeholder="e.g Fort Moore"
                                        bg="black"
                                        style={{ backgroundColor: 'black !important', marginRight: '2em' }}

                                    />
                                    <div style={{marginRight:'2em', marginTop:'1.5em'}}>
                                        <Button
                                            className='grow-on-hover'
                                            variant="light" color="lightgray"
                                            fullWidth mt="md" radius="md"
                                            onClick={onClickSearch}
                                            style={{backgroundColor: 'rgba(255, 208, 18, 0.6)',  marginRight: '2em !important'}}
                                        >
                                            Search facility
                                        </Button>
                                    </div>


                                </div>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <div className={"right"}>
                                    <h2 className={"right-header"}>Inventory</h2>
                                    <hr/>
                                    <Select
                                        className={"select-menu"}
                                        label="Search supplies"
                                        data={options}
                                        placeholder="e.g M249 SAW"
                                        searchable
                                        onChange={(selected) => {
                                            setSelectedSupply(selected ?? "");
                                            setSelectedSupplyData(selected ? inventoryData[selected] : {});
                                        }}
                                        bg="rgba(0,0,0,0)"
                                        styles={{ dropdown: { maxHeight: 200, overflowY: 'auto', backgroundColor: 'black' } }}
                                    />
                                    <RingCard
                                        title={selectedSupply}
                                        supplyClass={selectedSupplyData.class}
                                        cf={selectedSupplyData.cf}
                                        so={selectedSupplyData.so}
                                    />
                                    <ProgressCard
                                        title={"Inventory Level / Stockage Objective"}
                                        currentValue={selectedSupplyData.quantity}
                                        total={selectedSupplyData.so}
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
export default InventoryPage;