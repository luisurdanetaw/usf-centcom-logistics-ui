import React, {useEffect, useState} from 'react';
import {
    Badge,
    Button,
    Card,
    Container,
    Flex,
    Grid, Group, Pagination, ScrollArea,
    Select,
    Text,
    TextInput,
} from "@mantine/core";
import {NavbarSimple} from "../navbar-simple/NavbarSimple";
import {RingCard} from "../stats-ring-card/RingCard";
import {ProgressCard} from "../progress-card/ProgressCard";
import {useNavigate} from "react-router-dom";
import {searchFacilityBySupplies} from "../../services/api/facility";
import SearchResultsTable from "../../search-results-table/SearchResultsTable";
import SearchControls from "../search-controls/SearchControls";


interface SupplySearchPageProps {
    props: any;
}

const SupplySearchPage: React.FC<SupplySearchPageProps> = ({ props }) => {

    const [query, setQuery] = useState<string>('')
    const [searchResults, setSearchResults] = useState<any>([]);
    const [activePage, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const userId = localStorage.getItem('userId') || "1";

    async function onClickSearch() {
        if(query === ''){
            alert("Search query cannot have empty value");
        }
        else{
            localStorage.setItem("request-supply-name", query)
            const searchResults = await searchFacilityBySupplies(userId, query, 1);
            setPage(1)
            setSearchResults(searchResults.results);
            setTotalPages(searchResults.total_pages);
            setTotalResults(searchResults.total_results)
        }

    }

    useEffect(() => {
        async function getResultsPage(){
            const searchResults = await searchFacilityBySupplies(userId, query, activePage);
            setSearchResults(searchResults.results);

        }
        getResultsPage();


    }, [activePage, query, activePage])


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
                        <div className={"form"}>
                            <h1>Supply Search</h1>
                        </div>

                        <Grid gutter="xl" justify="center" align="center">
                            <Grid.Col span={12}>
                                <div className={"form"}>
                                    <SearchControls
                                        label={"Search supplies"}
                                        placeholder={"e.g Gas"}
                                        smallerLabel={"Facilities with supply in stock will be displayed\""}
                                        onClickSearch={onClickSearch}
                                        onChange={(e) => setQuery(e.target.value)}
                                        buttonLabel={"Search supplies"}
                                    />
                                </div>
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <div className="form">
                                    <h5 style={{display: totalResults === 0 ? 'none':'block'}}>Query results for {query}: {totalResults} found</h5>
                                    <SearchResultsTable
                                        height="50vh"
                                        searchResults={searchResults}
                                        trendsPage={false}
                                        rowContent={
                                            (result) => {
                                                return (
                                                    <React.Fragment>
                                                        <Group justify="space-between" mt="md" mb="xs">
                                                            <Text fw={500} c={"lightgray"}>Facility: {result.name}</Text>
                                                        </Group>
                                                        <Text size="sm" c="dimmed">Quantity: {result.quantity}</Text>
                                                        <Text size="sm" c="dimmed">Consumption Factor: {result.consumption}</Text>
                                                        <Text size="sm" c="dimmed">Stockage Objective: {result.stockage_objective}</Text>
                                                    </React.Fragment>
                                                    )
                                            }
                                        }
                                        withDrawer={false}
                                    />
                                </div>
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <Pagination
                                    color="rgba(255, 234, 0, 0.7)"
                                    value={activePage}
                                    onChange={setPage}
                                    total={totalPages}
                                    style={{display: totalResults === 0 ? 'none' : 'block', marginLeft: '1em'}}
                                />
                            </Grid.Col>
                        </Grid>
                    </div>
                </Flex>
            </Container>
        </div>
    );
};
export default SupplySearchPage;