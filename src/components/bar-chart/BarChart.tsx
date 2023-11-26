import './bar-chart.scss'
import React, {Fragment, useState,} from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {faker} from "@faker-js/faker";


interface BarChartProps {
    props: any;
}


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const BarChart: React.FC<BarChartProps> = ({ props }) => {
    const [delayed, setDelayed] = useState<boolean>(false);

    const options = {
        type: 'bar',
        responsive: true,
        animation: {
            onComplete: () => {
                setDelayed(true);
            },
            delay: (context: any) => {
                let delay = 0;
                if (context.type === 'data' && context.mode === 'default' && !delayed) {
                    delay = context.dataIndex * 500 + context.datasetIndex * 100;
                }
                return delay;
            },
        },
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: 'whitesmoke'
                }
            },
            title: {
                display: true,
                text: 'Consumption (SAMPLE)',
                color: 'whitesmoke'
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'whitesmoke', // Change X-axis label color
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'whitesmoke', // Change Y-axis label color
                },
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Class I',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                backgroundColor: 'rgba(255, 234, 0, 0.4)',
                borderWidth: 2,
                borderRadius: 5,
                borderSkipped: false,
                borderColor: 'rgba(255, 234, 0, 1)'
            },
            {
                label: 'Class III',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                backgroundColor: 'rgba(134, 209, 152, 0.4)',
                borderWidth: 2,
                borderRadius: 5,
                borderSkipped: false,
                borderColor: 'rgba(134, 209, 152, 1)'
            },
        ],
    };

    return (
        <Fragment>
            <Bar options={options} data={data} />
        </Fragment>
    );
};
