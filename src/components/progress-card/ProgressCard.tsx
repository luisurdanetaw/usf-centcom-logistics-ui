import { Text, Progress, Card } from '@mantine/core';
interface ProgressCardProps {
    title: string;
    currentValue: number;
    total: number;
}
export const ProgressCard: React.FC<ProgressCardProps> = ({ title, currentValue, total }) => {


    return (
        <Card withBorder radius="xs" padding="xl" bg="rgba(0,0,0,0)" style={{borderTop: "hidden", borderRight:"hidden", borderLeft: "hidden", paddingLeft: 0}}>
            <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                {title}
            </Text>
            <Text fz="lg" fw={500}>
                {currentValue} / {total}
            </Text>
            <Progress value={(currentValue/total)*100} mt="md" size="lg" radius="xl" color="rgba(255, 208, 18, 1)" />
        </Card>
    );
}