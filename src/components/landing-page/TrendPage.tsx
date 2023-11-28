import React, {useEffect, useState} from 'react';
import {Container, Flex, Grid, SimpleGrid} from "@mantine/core";
import './TrendPage.scss'
import {NavbarSimple} from "../navbar-simple/NavbarSimple";
import {TableSort} from '../table/TableSort'
import {StatsCards} from "../stats-card/StatsCards";
import {LineChart} from "../line-chart/LineChart";
import fetchTrends from "../../services/api/trends";
import {StatsLoader} from "../stats-card/StatsLoader";
import {BarChart} from "../bar-chart/BarChart";

interface HelloWorldProps {
    name: string;
}

export const TrendPage: React.FC<HelloWorldProps> = ({ name }) => {
    const [trendData, setTrendData] = useState<any>(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchTrends('1');
                setTrendData(data);
            } catch (error) {
                console.error('Error fetching trends:', error);
            } finally {
                setLoading(false);
                console.log(trendData);
            }
        };

        fetchData();
    }, []);


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
                                 <TableSort tmr={false}/>
                             </div>
                         </SimpleGrid>
                     </div>
                 </Flex>


             </Container>
        </div>
    );
};
