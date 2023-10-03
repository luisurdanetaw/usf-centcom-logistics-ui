import { Group, Paper, Text, ThemeIcon, SimpleGrid } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';
import './stats-card.scss';

const data = [
    { title: 'TMRs Completed ', value: '209', diff: 34 },
    { title: 'TMRs Received', value: '1230', diff: -13 },
    { title: 'Shipment speed', value: '2.3 days', diff: 18 },
    { title: 'Delayed shipments', value: '21', diff: -12 },
];

export function StatsCard() {
    const stats = data.map((stat) => {
        const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

        return (
            <Paper withBorder p="sm" radius="sm" key={stat.title} className={'no-background'}>
                <Group justify="apart">
                    <div>
                        <Text c="dimmed" tt="uppercase" fw={700} fz="xs" className='label'>
                            {stat.title}
                        </Text>
                        <Text fw={700} fz="lg">
                            {stat.value}
                        </Text>
                    </div>
                    <ThemeIcon
                        color="gray"
                        variant="light"
                        style={{
                            color: stat.diff > 0 ? 'var(--mantine-color-teal-6)' : 'var(--mantine-color-red-6)',
                        }}
                        size={32} // Adjust the size to make it smaller
                        radius="sm" // Adjust the radius to make it smaller
                    >
                        <DiffIcon size="1.4rem" stroke={1.5}/>
                    </ThemeIcon>
                </Group>
                <Text c="dimmed" fz="xs" mt="sm"> {/* Adjust the font size to make it smaller */}
                    <Text component="span" c={stat.diff > 0 ? 'teal' : 'red'} fw={700}>
                        {stat.diff}%
                    </Text>{' '}
                    {stat.diff > 0 ? 'increase' : 'decrease'} compared to last month
                </Text>
            </Paper>
        );
    });

    return (
        <div className='root'>
            <SimpleGrid cols={{ base: 1, sm: 4 }}>{stats}</SimpleGrid>
        </div>
    );
}