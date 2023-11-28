import React, {useEffect, useState} from 'react';
import {Card, Container, Flex, Grid, Group, Loader, Paper, ScrollArea, SimpleGrid, Text} from "@mantine/core";
import './TrendPage.scss'
import {NavbarSimple} from "../navbar-simple/NavbarSimple";
import {TableSort} from '../table/TableSort'
import {StatsCards} from "../stats-card/StatsCards";
import {LineChart} from "../line-chart/LineChart";
import fetchTrends from "../../services/api/trends";
import {StatsLoader} from "../stats-card/StatsLoader";
import {BarChart} from "../bar-chart/BarChart";
import SearchResultsTable from "../../search-results-table/SearchResultsTable";
import {capitalizeFirstLetter} from "../../services/utilities/strings";

interface HelloWorldProps {
    name: string;
}

export const TrendPage: React.FC<HelloWorldProps> = ({ name }) => {
    const [trendData, setTrendData] = useState<any>(null)
    const [topRequestors, setTopRequestors] = useState<any>([["", 1]])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchTrends('USA');
                const { topRequestors, ...dataWithoutTopRequestors } = data;
                setTrendData(dataWithoutTopRequestors);
                setTopRequestors(topRequestors);
            } catch (error) {
                console.error('Error fetching trends:', error);
            } finally {
                setLoading(false);
                console.log(trendData);
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
                     <div>
                         <h2 style={{marginLeft: '50px', marginTop: '20px'}}>123rd Test Movement Control Battallion</h2>
                         <p style={{marginLeft: '50px'}}> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec efficitur tortor. In quis mi nec nunc viverra ultricies. Vivamus euismod tellus non volutpat aliquet. Curabitur tincidunt vitae odio et eleifend. Integer posuere ipsum in nisl varius, ut lacinia lorem volutpat. Nunc facilisis tristique est, id pharetra justo rhoncus ut.</p>
                         {
                             loading ?  <StatsLoader/> : <StatsCards trends={trendData}/>
                         }
                         <SimpleGrid cols={2}>
                             <div className={'graph-table-height'}>
                                 <h3>Supply Consumption</h3>
                                 <BarChart props={null}/>
                             </div>
                             <div className={'graph-table-height'}>
                                 <h3 style={{color: "lightgray"}}>Top requesters</h3>
                                 {
                                     <ScrollArea h={250}>
                                         {
                                             loading ?
                                                 <Paper p="xl" radius="xl" className={'no-background'}>
                                                     <Group justify="apart" style={{paddingLeft: '10em', paddingTop: '5em'}}>
                                                         <Loader color='yellow' size={100}/>
                                                     </Group>
                                                 </Paper>
                                                 : <SearchResultsTable
                                                     height="100%"
                                                     searchResults={topRequestors}
                                                     rowContent={
                                                         (result) => {
                                                             return (
                                                                 <React.Fragment>
                                                                     <Group justify="space-between" mt="xs" mb="xs">
                                                                         <Text fw={500} c={"lightgray"}>{capitalizeFirstLetter(result[0])}</Text>
                                                                     </Group>
                                                                 </React.Fragment>
                                                             )
                                                         }

                                                     }
                                                     withDrawer={false}
                                                 />
                                         }
                                     </ScrollArea>
                                 }
                             </div>
                         </SimpleGrid>
                     </div>
                 </Flex>


             </Container>
        </div>
    );
};
