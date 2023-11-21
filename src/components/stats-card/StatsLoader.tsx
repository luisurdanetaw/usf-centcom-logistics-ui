import React from "react";
import {IconArrowDownRight, IconArrowUpRight} from "@tabler/icons-react";
import {Group, Loader, Paper, SimpleGrid, Text, ThemeIcon} from "@mantine/core";

export const StatsLoader = () =>  {
    return (
        <div className='root'>
        <SimpleGrid cols={{ base: 1, sm: 4 }}>
            <Paper withBorder p="sm" radius="sm" className={'no-background'}>
                <Group justify="apart">
                    <Loader color='yellow'/>
                </Group>
            </Paper>
            <Paper withBorder p="sm" radius="sm" className={'no-background'}>
                <Group justify="apart">
                    <Loader color='yellow'/>
                </Group>
            </Paper>
            <Paper withBorder p="sm" radius="sm" className={'no-background'}>
                <Group justify="apart">
                    <Loader color='yellow'/>
                </Group>
            </Paper>
            <Paper withBorder p="sm" radius="sm" className={'no-background'}>
                <Group justify="apart">
                    <Loader color='yellow'/>
                </Group>
            </Paper>
        </SimpleGrid>
    </div>
);
}