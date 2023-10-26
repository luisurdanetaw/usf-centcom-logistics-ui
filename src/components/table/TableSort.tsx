import { useState } from 'react';
import {
    Table,
    ScrollArea,
    UnstyledButton,
    Group,
    Text,
    Center,
    TextInput,
    rem,
    keys, ActionIcon, Drawer, Timeline,
} from '@mantine/core';
import {IconSelector, IconChevronDown, IconChevronUp, IconSearch, IconAdjustments, IconEye} from '@tabler/icons-react';
import './table-sort.scss';
import {useDisclosure} from "@mantine/hooks";

interface TableSortProperties{
    tmr: boolean;
}
interface RowData {
    name: string;
    email: string;
    company: string;
    received: string,
    approved: string,
    loaded: string,
    shipped: string,
    fulfilled: string

}

interface ThProps {
    children: React.ReactNode;
    reversed: boolean;
    sorted: boolean;
    onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    return (
        <Table.Th className={'th'}>
            <UnstyledButton onClick={onSort} className={'control'}>
                <Group justify="space-between">
                    <Text fw={500} fz="sm">
                        {children}
                    </Text>
                    <Center className={'icon'}>
                        <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </Center>
                </Group>
            </UnstyledButton>
        </Table.Th>
    );
}

function filterData(data: RowData[], search: string) {
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
        keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
    );
}

function sortData(
    data: RowData[],
    payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
    const { sortBy } = payload;

    if (!sortBy) {
        return filterData(data, payload.search);
    }

    return filterData(
        [...data].sort((a, b) => {
            if (payload.reversed) {
                return b[sortBy].localeCompare(a[sortBy]);
            }

            return a[sortBy].localeCompare(b[sortBy]);
        }),
        payload.search
    );
}

const data = [
    {
        name: 'Athena Weissnat',
        company: 'Little - Rippin',
        email: 'Elouise.Prohaska@yahoo.com',
        received: '10/10/2023',
        approved: '10/10/2023',
        loaded: '10/12/2023',
        shipped: '',
        fulfilled: ''
    },
    {
        name: 'Deangelo Runolfsson',
        company: 'Greenfelder - Krajcik',
        email: 'Kadin_Trantow87@yahoo.com',
        received: '10/10/2023',
        approved: '10/10/2023',
        loaded: '10/12/2023',
        shipped: '',
        fulfilled: ''
    },
    {
        name: 'Danny Carter',
        company: 'Kohler and Sons',
        email: 'Marina3@hotmail.com',
        received: '10/10/2023',
        approved: '10/10/2023',
        loaded: '10/12/2023',
        shipped: '',
        fulfilled: ''
    },
    {
        name: 'Trace Tremblay PhD',
        company: 'Crona, Aufderhar and Senger',
        email: 'Antonina.Pouros@yahoo.com',
        received: '10/10/2023',
        approved: '10/10/2023',
        loaded: '10/12/2023',
        shipped: '',
        fulfilled: ''
    },
    {
        name: 'Derek Dibbert',
        company: 'Gottlieb LLC',
        email: 'Abagail29@hotmail.com',
        received: '10/10/2023',
        approved: '10/10/2023',
        loaded: '10/12/2023',
        shipped: '',
        fulfilled: ''
    },
    {
        name: 'Viola Bernhard',
        company: 'Funk, Rohan and Kreiger',
        email: 'Jamie23@hotmail.com',
        received: '10/10/2023',
        approved: '10/10/2023',
        loaded: '10/12/2023',
        shipped: '',
        fulfilled: ''
    },
    {
        name: 'Austin Jacobi',
        company: 'Botsford - Corwin',
        email: 'Genesis42@yahoo.com',
        received: '10/10/2023',
        approved: '10/10/2023',
        loaded: '10/12/2023',
        shipped: '',
        fulfilled: ''
    },
    {
        name: 'Hershel Mosciski',
        company: 'Okuneva, Farrell and Kilback',
        email: 'Idella.Stehr28@yahoo.com',
        received: '10/10/2023',
        approved: '10/10/2023',
        loaded: '10/12/2023',
        shipped: '',
        fulfilled: ''
    },
    {
        name: 'Mylene Ebert',
        company: 'Kirlin and Sons',
        email: 'Hildegard17@hotmail.com',
        received: '10/10/2023',
        approved: '10/10/2023',
        loaded: '10/12/2023',
        shipped: '',
        fulfilled: ''
    },
    {
        name: 'Lou Trantow',
        company: 'Parisian - Lemke',
        email: 'Hillard.Barrows1@hotmail.com',
        received: '10/10/2023',
        approved: '10/10/2023',
        loaded: '10/12/2023',
        shipped: '',
        fulfilled: ''
    },
    {
        name: 'Dariana Weimann',
        company: 'Schowalter - Donnelly',
        email: 'Colleen80@gmail.com',
        received: '10/10/2023',
        approved: '10/10/2023',
        loaded: '10/12/2023',
        shipped: '',
        fulfilled: ''
    },
    {
        name: 'Dr. Christy Herman',
        company: 'VonRueden - Labadie',
        email: 'Lilyan98@gmail.com',
        received: '10/10/2023',
        approved: '10/10/2023',
        loaded: '10/12/2023',
        shipped: '',
        fulfilled: ''
    },
    {
        name: 'Katelin Schuster',
        company: 'Jacobson - Smitham',
        email: 'Erich_Brekke76@gmail.com',
        received: '10/10/2023',
        approved: '10/10/2023',
        loaded: '10/12/2023',
        shipped: '',
        fulfilled: ''
    },
    {
        name: 'Melyna Macejkovic',
        company: 'Schuster LLC',
        email: 'Kylee4@yahoo.com',
        received: '10/10/2023',
        approved: '10/10/2023',
        loaded: '10/12/2023',
        shipped: '',
        fulfilled: ''
    },
    {
        name: 'Pinkie Rice',
        company: 'Wolf, Trantow and Zulauf',
        email: 'Fiona.Kutch@hotmail.com',
        received: '10/10/2023',
        approved: '10/10/2023',
        loaded: '10/12/2023',
        shipped: '',
        fulfilled: ''
    },
    {
        name: 'Brain Kreiger',
        company: 'Lueilwitz Group',
        email: 'Rico98@hotmail.com',
        received: '10/10/2023',
        approved: '10/10/2023',
        loaded: '10/12/2023',
        shipped: '',
        fulfilled: ''
    },
];
function capitalizeFirstLetter(inputString:string) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

export const TableSort: React.FC<TableSortProperties> =({tmr}) => {
    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState(data);
    const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const [drawerChildren, setDrawerChildren] = useState(<div></div>);

    const [opened, { open, close }] = useDisclosure(false);

    const handleRowClick = (row:any) => {

        const bullets = Object.entries(row)
            .map(([key, value], i, entries) => (
                ['received', 'approved', 'loaded', 'shipped', 'fulfilled'].includes(key) ? (
                    <Timeline.Item key={i} title={capitalizeFirstLetter(key)} className={'bullet'} lineVariant={['shipped', 'fulfilled'].includes(key) ? "dashed" : undefined}>
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

    const setSorting = (field: keyof RowData) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(data, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
    };

    const rows = sortedData.map((row) => (
        <Table.Tr onClick={tmr ? () => handleRowClick(row) : () => {}} key={row.name} className={'row'}>
            <Table.Td>{row.name}</Table.Td>
            <Table.Td>{row.email}
            </Table.Td>
        </Table.Tr>
    ));


    return (
        <>
            <Drawer
                position="right"
                opened={opened}
                onClose={close}
                title="TMR Details"
                children={drawerChildren}
                style={{backgroundColor: 'black !important', color: 'lightGray'}}/>

            <ScrollArea h={300}>
                <TextInput
                    placeholder="Search by any field"
                    mb="md"
                    leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                    value={search}
                    onChange={handleSearchChange}
                    style={{maxWidth:'75%'}}
                    classNames={{input:'input', label:'label'}}
                />
                <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
                    <Table.Tbody>
                        <Table.Tr>
                            <Th
                                sorted={sortBy === 'name'}
                                reversed={reverseSortDirection}
                                onSort={() => setSorting('name')}
                            >
                                Name
                            </Th>
                            <Th
                                sorted={sortBy === 'email'}
                                reversed={reverseSortDirection}
                                onSort={() => setSorting('email')}
                            >
                                Email
                            </Th>

                        </Table.Tr>
                    </Table.Tbody>
                    <Table.Tbody>
                        {rows.length > 0 ? (
                            rows
                        ) : (
                            <Table.Tr>
                                <Table.Td colSpan={Object.keys(data[0]).length}>
                                    <Text fw={500} ta="center">
                                        Nothing found
                                    </Text>
                                </Table.Td>
                            </Table.Tr>
                        )}
                    </Table.Tbody>
                </Table>
            </ScrollArea>
        </>

    );
}
