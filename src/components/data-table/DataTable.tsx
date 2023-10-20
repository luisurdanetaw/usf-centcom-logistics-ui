import React from "react";
import { Table} from "@mantine/core";

interface DataTableProps {
    data:any;

}
const DataTable: React.FC<DataTableProps> = ({data}) => {
    const ths = (
        <Table.Tr>
            <Table.Th>TMR Number</Table.Th>
            <Table.Th>Requester</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Description</Table.Th>
        </Table.Tr>
    );
    const rows = data.map((element:any) => (
        <Table.Tr key={element.id}>
            <Table.Td>{element.number}</Table.Td>
            <Table.Td>{element.requester}</Table.Td>
            <Table.Td>{element.status}</Table.Td>
            <Table.Td>{element.description}</Table.Td>
        </Table.Tr>
    ));
    return (
        <Table verticalSpacing="xl" highlightOnHover highlightOnHoverColor={'rgba(255, 208, 18, 0.5)'}>
            <Table.Thead>{ths}</Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    )
};
export default DataTable;