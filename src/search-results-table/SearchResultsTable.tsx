import {Button, Card, Drawer, Grid, Group, ScrollArea, Text, Timeline} from "@mantine/core";
import React, {useState} from "react";
import {useDisclosure} from "@mantine/hooks";

interface SearchResultTableProps {
    searchResults: any [];
    rowButton?: React.ReactNode;
    rowContent: (result:any) => React.ReactNode;
    withDrawer:boolean;
    height:string
}
function removeUnderscoresAndCapitalize(inputString: string): string {
    // Split the input string by underscores and capitalize each word
    const words: string[] = inputString.split('_').map((word: string) => {
        // Capitalize the first letter and make the rest lowercase
        return word;
    });

    const res = words.join(" ");
    return res.charAt(0).toUpperCase() + res.slice(1)
}
const SearchResultsTable:React.FC<SearchResultTableProps> = ({height, searchResults, rowButton, rowContent, withDrawer}) => {
    const [drawerChildren, setDrawerChildren] = useState(<div></div>);
    const [opened, { open, close }] = useDisclosure(false);

    const getKeyTitle = (key: string) => {
        const keys = ['rld', 'rdd', 'ald', 'add'];
        if(!keys.includes(key)){
            return removeUnderscoresAndCapitalize(key);
        }

        const title = key === 'rld' || key ==='ald' ? "Load Date" : "Delivery Date";
        return title;
    }
    const statusCollections:Record<string, string[]> = {
        notApproved: ['date_received', 'date_approved'],
        notLoaded: ['date_received', 'date_approved', 'rld', 'rdd'],
        loadedNotDelivered: ['date_received', 'date_approved', 'ald', 'rdd'],
        loadedAndDelivered: ['date_received', 'date_approved', 'ald', 'add']
    }

    const conditions:Record<string, (row: any) => boolean> = {
        notApproved: (row:any) => row.date_approved === null,
        notLoaded: (row:any) => row.ald === null,
        loadedNotDelivered: (row:any) => row.rdd === null,
        loadedAndDelivered: () => true, // Default condition
    };

    const getStatusCollection = (row:any) => {
        const statusKey = Object.keys(conditions).find((key:string) => conditions[key](row)) || "";
        return statusCollections[statusKey] || statusCollections['loadedAndDelivered'];
    };

    const handleBtnClick = (row:any) => {
        const statusCollection = getStatusCollection(row);
        const timelineData = ['date_received', 'date_approved', 'ald', 'add'];

        let active = -1;
        Object.keys(row).forEach((key) => timelineData.includes(key) && row[key] !== null ? active++ : null)

        const bullets = Object.entries(row)
            .map(([key, value], i, entries) => (
                statusCollection.includes(key) ? (
                    <Timeline.Item key={i} title={getKeyTitle(key)} className={'bullet'} lineVariant={['ald','rld'].includes(key) ? "dashed" : undefined}>
                        <Text c="dimmed" size="sm">
                            {key === 'rld' || key === 'rdd' ? "Estimated " + (value as string) : (value as string)}
                        </Text>
                        {value !== null ? <Text size="xs" mt={4}>12 minutes ago</Text> : null}
                    </Timeline.Item>
                ) : null
            ))
            .filter((bullet) => bullet !== null);

        const allDetails = Object.entries(row)
            .map(([key, value]:[string, any], i) => (
                <React.Fragment key={i}>
                    <Group justify="space-between" mt="md" mb="0">
                        <Text size="sm" c="lightgray">{removeUnderscoresAndCapitalize(key)}</Text>
                    </Group>
                    <Group justify="space-between" mt="xs" mb="xs">
                        <Text size="sm" c="dimmed" style={{display: 'block', marginTop:'0'}}>{value}</Text>
                    </Group>
                </React.Fragment>
                )
            );

        setDrawerChildren(
            <div style={{marginLeft:'2em'}}>
                <h4>Request #: {row["id_num"]}</h4>
                <Timeline color="rgba(242, 207, 10, 1)" active={active}>
                    {bullets}
                </Timeline>
                <div>
                    {allDetails}
                </div>
            </div>
        );
        open();
    }
    return (
        <React.Fragment>
            {withDrawer &&
                <Drawer
                    position="right"
                    opened={opened}
                    onClose={close}
                    title="TMR Details"
                    children={drawerChildren}
                    style={{backgroundColor: 'black !important', color: 'lightGray'}}
                    scrollAreaComponent={ScrollArea.Autosize}
                />
            }
            <ScrollArea h={height}>
                {
                    searchResults.map((result:any, i:number) => {
                        return (
                            <Card key={i} shadow="sm" padding="lg" radius="xs" withBorder style={{backgroundColor: 'black', borderRight: 'black', borderLeft: 'black', paddingLeft: '0', marginRight: '2em'}}>
                                <Grid gutter="xl" justify="center" align="center">
                                    <Grid.Col span={6}>
                                        {rowContent(result)}
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        {
                                            withDrawer ?
                                                (
                                                    <Button
                                                        className='grow-on-hover'
                                                        variant="light" color="lightgray"
                                                        fullWidth mt="md" radius="md"
                                                        onClick={() => handleBtnClick(result)}
                                                        style={{backgroundColor: 'rgba(255, 208, 18, 0.6)', maxWidth: '20%', marginLeft:'auto', marginRight: '1em'}}
                                                    >
                                                        View TMR
                                                    </Button>
                                                ) : rowButton
                                        }
                                    </Grid.Col>
                                </Grid>
                            </Card>
                        )
                    })

                }
            </ScrollArea>
        </React.Fragment>


    )
}

export default SearchResultsTable;