import React, {useEffect, useState} from 'react';
import {
    Autocomplete,
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
import {findAllFacilities, searchFacilityByName} from "../../services/api/facility";
import { useQuery } from 'react-query';

interface HelloWorldProps {
    name: string;
}
/*{
    "id": 2,
    "name": "Fort Bragg",
    "country": "USA",
    "state": "FL",
    "zipcode": "32809",
    "co_name": "Emily Davis",
    "co_email": "emily.davis@example.com",
    "co_number": "444-555-6666",
    "status": "green",
    "inventory": {
        "inventory_id": 4,
        "facility_id": 2,
        "item_name": "gas",
        "stockage_objective": 5000,
        "quantity": 2500,
        "consumption": 50,
        "status": "green"
    }
}*/
function capitalizeFirstLetter(input: string): string {
    return input.charAt(0).toUpperCase() + input.slice(1);
}
const InventoryPage: React.FC<HelloWorldProps> = ({ name }) => {
    const navigate = useNavigate();

    const [facilityStatus, setFacilityStatus] = useState<string>("green");
    const [facilityData, setFacilityData] = useState<any | null>(null);
    const [inventoryData, setInventoryData] = useState<any>({Gas:{quantity:0,so:0,cf:0, class:'III'}});
    const [selectedSupplyData, setSelectedSupplyData] = useState<any>({quantity:0,so:0,cf:0});
    const [selectedSupply, setSelectedSupply] = useState<string>("");
    const [options, setOptions] = useState<string[]>(["Test"])

    const [allFacilities, setAllFacilities] = useState<string[]>(['Fort Moore'])
    const [facilityName, setFacilityName] = useState('Fort Moore');

    function getFacilityStatus(){
        if(facilityData?.['status'] === 'green')
            return 'Healthy';
        else if(facilityData['status'] === 'yellow')
            return 'At Risk'
        else return 'Critical'
    }

    async function onClickDropdownOption() {
        const facility = await searchFacilityByName(facilityName);
        if (!facility || Object.keys(facility).length <= 1){
            alert("Facility not found")
        }
        else{
            console.log("SEARCHING FOR FACILITY:", facility)
            setFacilityData(facility);
        }
    }
    useEffect(() => {
        if (facilityData) {
            const inventoryJson = facilityData['inventory'];
            const inventory = {};

            const colors = new Set<string>();

            for (const obj of inventoryJson) {
                let supply = obj['item_name'];
                supply = capitalizeFirstLetter(supply);
                const quantity = obj['quantity'];
                const so = obj['stockage_objective'];
                const cf = obj['consumption'];
                const supplyClass = obj['class'];

                colors.add(obj['status']);
                // @ts-ignore
                inventory[supply] = {
                    quantity: quantity,
                    so: so,
                    cf: cf,
                    class: supplyClass
                }
            }

            if(colors.has('black')){
                console.log("Facility got black color code")
                setFacilityStatus("black")
            }
            if(colors.has('yellow')){
                console.log("facility got yellow color code")
                setFacilityStatus("yellow")
            }

            console.log(inventory);
            setInventoryData(inventory);

            if (inventory) {
                const selectedSupply = Object.keys(inventoryData).at(0);

                if (selectedSupply) {
                    setSelectedSupply(selectedSupply);
                    const selectedSupplyData = inventoryData[selectedSupply];
                    setSelectedSupplyData(selectedSupplyData);
                }
            }
        }
    }, [facilityData]);

    //T
    useEffect(() => {
        const supplyOptions = Object.keys(inventoryData);
        setOptions(supplyOptions ?? ["Gas"]);
    }, [inventoryData]);


    useEffect(() => {
        onClickDropdownOption()
        findAllFacilities()
            .then(data => setAllFacilities(data))
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
                        <div style={{marginLeft: '1em'}}>
                            <h1>Facility Information and Inventory</h1>
                            <p>M.O.V.E Logistics - Facility lookup and inventory search page. </p>
                        </div>

                        <Grid gutter="xl" justify="center" align="center">
                            <Grid.Col span={6}>
                                <div className={"left"}>
                                    <h2 className={"right-header"}>Facility</h2>

                                    <Card shadow="sm" padding="lg" radius="xs" withBorder style={{backgroundColor: 'black', borderRight: 'black', borderLeft: 'black', paddingLeft: '0', marginRight: '2em'}}>

                                        <Group justify="space-between" mt="md" mb="xs">
                                            <Text fw={500} c={"lightgray"}>{facilityData?.['name']}</Text>
                                            <Badge color={
                                                facilityData ?
                                                    (facilityData['status'] === 'black' ? 'gray' : facilityData['status'])
                                                : "green"
                                            } variant="light"
                                            >
                                                {facilityData ? getFacilityStatus() : "Healthy"}
                                            </Badge>
                                        </Group>

                                        <Text size="sm" c="dimmed">
                                            Location: {facilityData?.['state']}
                                        </Text>
                                        <Text size="sm" c="dimmed">
                                            CO: {facilityData?.['co_name']}
                                        </Text>
                                        <Text size="sm" c="dimmed">
                                            Phone: {facilityData?.['co_number']}
                                        </Text>
                                        <Text size="sm" c="dimmed">
                                            Email: {facilityData?.['co_email']}
                                        </Text>

                                    </Card>
                                    <h3>View different facility</h3>
                                    <Autocomplete
                                        className={"select-menu"}
                                        maxDropdownHeight={100}
                                        label="Search facilities"
                                        placeholder="e.g Fort Moore"
                                        limit={5}
                                        bg="black"
                                        data={allFacilities}
                                        onChange={(selected) => {
                                            setFacilityName(selected ?? "");
                                        }}
                                        style={{ backgroundColor: 'black !important', marginRight: '2em' }}
                                        styles={{dropdown: {backgroundColor: 'black'}}}
                                    />
                                    <div style={{marginRight:'2em', marginTop:'1.5em'}}>
                                        <Button
                                            className='grow-on-hover'
                                            variant="light" color="lightgray"
                                            fullWidth mt="md" radius="md"
                                            onClick={onClickDropdownOption}
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
                                        classNames={{option:'option', options:'options'}}
                                        maxDropdownHeight={100}
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
                                        styles={{ dropdown: { maxHeight: 200, overflowY: 'auto', backgroundColor: 'black', color: 'lightgray'} }}
                                    />
                                    <RingCard
                                        title={selectedSupply}
                                        supplyClass={selectedSupplyData.class}
                                        cf={selectedSupplyData.cf}
                                        so={selectedSupplyData.so}
                                        tmrs={facilityData?.active_tmrs ?? 0}
                                        awaiting_fulfillment={facilityData?.awaiting_fulfillment_tmrs ?? 0}
                                        need_approval={facilityData?.need_approval_tmrs?? 0}

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