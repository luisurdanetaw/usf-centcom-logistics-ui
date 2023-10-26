import { Text, Card, RingProgress, Group, useMantineTheme } from '@mantine/core';
import './ring-card.scss';

const stats = [
    { value: 447, label: 'Awaiting Fulfillment' },
    { value: 76, label: 'Need Approval' },
];
interface RingCardProps {
    title:string;
    supplyClass:string;
    cf:number;
    so:number;
}
export const RingCard:React.FC<RingCardProps> = ({title, supplyClass, so, cf}) => {

    const items = stats.map((stat) => (
        <div key={stat.label}>
            <Text className={'label'}>{stat.value}</Text>
            <Text size="xs" c="dimmed">
                {stat.label}
            </Text>
        </div>
    ));

    return (
        <Card withBorder p="xl" radius="xs" className={'card'}>
            <div className={'inner'}>
                <div>
                    <Text fz="xl" className={'label'}>
                        {title} (class {supplyClass})
                    </Text>
                    <div>
                        <Text className={'lead'} mt={30}>
                            1887
                        </Text>
                        <Text fz="xs" c="dimmed">
                            TMRs Active
                        </Text>
                    </div>
                    <Group mt="lg">{items}</Group>
                </div>

                <div className={'ring'}>
                    <RingProgress
                        roundCaps
                        thickness={6}
                        size={150}
                        rootColor={'rgba(69, 68, 68, 1)'}
                        sections={[{ value: (cf / so) * 100, color: 'rgba(255, 208, 18, 1)' }]}
                        label={
                            <div>
                                <Text ta="center" fz="lg" className={'label'}>
                                    {((cf/ so) * 100).toFixed(0)}%
                                </Text>
                                <Text ta="center" fz="xs" c="dimmed">
                                    Consumption Factor
                                </Text>
                            </div>
                        }
                    />
                </div>
            </div>
        </Card>
    );
}