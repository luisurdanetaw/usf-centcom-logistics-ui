import { Progress, Box, Text, Group, Paper, SimpleGrid, rem } from '@mantine/core';
import { IconArrowUpRight, IconDeviceAnalytics } from '@tabler/icons-react';
import './stats-segmented.scss';

const data = [
    { label: 'Mobile', count: '204,001', part: 59, color: 'rgba(255, 234, 0, 0.7)'},
    { label: 'Desktop', count: '121,017', part: 35, color: '#03141a' },
    { label: 'Tablet', count: '31,118', part: 6, color: 'rgba(86, 255, 168, 0.8)' },
];

export function StatsSegmented() {
    const segments = data.map((segment) => (
        <Progress.Section value={segment.part} color={segment.color} key={segment.color}>
            {segment.part > 10 && <Progress.Label>{segment.part}%</Progress.Label>}
        </Progress.Section>
    ));

    const descriptions = data.map((stat) => (
        <Box key={stat.label} style={{ borderBottomColor: stat.color }} className={'stat'}>
            <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
                {stat.label}
            </Text>

            <Group justify="space-between" align="flex-end" gap={0}>
                <Text fw={700}>{stat.count}</Text>
                <Text c={stat.color} fw={700} size="sm" className={'statCount'}>
                    {stat.part}%
                </Text>
            </Group>
        </Box>
    ));

    return (
        <Paper withBorder p="md" radius="xs"
               style={{backgroundColor:'black', marginLeft:'0 !important', marginTop:'1em', borderTop: 'none', borderLeft: 'none', borderRight: 'none', padding: '0 !important', marginRight:'2em'}}>
            <Group justify="space-between">
                <Group align="flex-end" gap="xs">
                    <Text fz="xl" fw={700}>
                        345,765
                    </Text>
                    <Text c="teal" className={'diff'} fz="sm" fw={700}>
                        <span>18%</span>
                        <IconArrowUpRight size="1rem" style={{ marginBottom: rem(4) }} stroke={1.5} />
                    </Text>
                </Group>
                <IconDeviceAnalytics size="1.4rem" className={'icon'} stroke={1.5} />
            </Group>

            <Text c="dimmed" fz="sm">
                Page views compared to previous month
            </Text>

            <Progress.Root size={34} classNames={{ label: 'progressLabel'}} mt={40}>
                {segments}
            </Progress.Root>
            <SimpleGrid cols={{ base: 1, xs: 3 }} mt="xl">
                {descriptions}
            </SimpleGrid>
        </Paper>
    );
}