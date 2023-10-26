import React from 'react';
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
    SimpleGrid,
    TextInput,
    Text,
    Title
} from "@mantine/core";
import './home-page.scss'
import {NavbarSimple} from "../navbar-simple/NavbarSimple";
import {ProgressCard} from "../progress-card/ProgressCard";
import {RingCard} from "../stats-ring-card/RingCard";
import {StatsCard} from "../stats-card/StatsCard";

interface HomeProps {
}

const HomePage: React.FC<HomeProps> = ({}) => {

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
                                <h2 className={"right-header"}>Facilities</h2>
                                <TextInput
                                    className={"select-menu"}
                                    label="Search facilities"
                                    description="Input description"
                                    placeholder="e.g Fort Moore"
                                    bg="rgba(0,0,0,0)"
                                    style={{ backgroundColor: 'black' }}

                                />
                                <Card shadow="sm" padding="lg" radius="md" withBorder>
                                    <Card.Section>
                                        <Image
                                            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                                            height={160}
                                            alt="Norway"
                                        />
                                    </Card.Section>

                                    <Group justify="space-between" mt="md" mb="xs">
                                        <Text fw={500}>Norway Fjord Adventures</Text>
                                        <Badge color="pink" variant="light">
                                            On Sale
                                        </Badge>
                                    </Group>

                                    <Text size="sm" c="dimmed">
                                        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
                                        activities on and around the fjords of Norway
                                    </Text>

                                    <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                                        Book classic tour now
                                    </Button>
                                </Card>
                            </div>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <div className={"right"}>

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