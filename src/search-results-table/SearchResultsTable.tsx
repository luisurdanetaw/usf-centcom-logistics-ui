import {Button, Card, Drawer, Grid, Group, ScrollArea, Text, Timeline} from "@mantine/core";
import React, {useState} from "react";
import SupplySearchPage from "../components/supply-search-page/SupplySearchPage";
import {useDisclosure} from "@mantine/hooks";

interface SearchResultTableProps {
    searchResults: any []
    rowButton?: React.ReactNode;
    rowContent: (result:any) => React.ReactNode;
    withDrawer:boolean;

}
const SearchResultsTable:React.FC<SearchResultTableProps> = ({searchResults, rowButton, rowContent, withDrawer}) => {
    const [drawerChildren, setDrawerChildren] = useState(<div></div>);

    const [opened, { open, close }] = useDisclosure(false);

    const handleBtnClick = (row:any) => {

        const bullets = Object.entries(row)
            .map(([key, value], i, entries) => (
                ['received', 'approved', 'loaded', 'shipped', 'fulfilled'].includes(key) ? (
                    <Timeline.Item key={i} title={key} className={'bullet'} lineVariant={['shipped', 'fulfilled'].includes(key) ? "dashed" : undefined}>
                        <Text c="dimmed" size="sm">
                            {value as string}
                        </Text>
                        {value !== null ? <Text size="xs" mt={4}>12 minutes ago</Text> : null}
                    </Timeline.Item>
                ) : null
            ))
            .filter((bullet) => bullet !== null);

        setDrawerChildren(
            <div className={"drawer"}>
                <h4>Request #: {row["name"]}</h4>
                <Timeline color="rgba(242, 207, 10, 1)" active={1}>
                    {bullets}
                </Timeline>

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
                />
            }
            <ScrollArea h={'50vh'}>
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