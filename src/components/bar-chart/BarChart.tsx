import './bar-chart.scss'
import React, {Fragment, useState,} from "react";

import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import {Bar} from 'react-chartjs-2';


interface BarChartProps {
    consumption: any[];
}


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const BarChart: React.FC<BarChartProps> = ({ consumption }) => {
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
                text: 'Monthly Consumption',
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

    let monthsMap: { [month: string]: number } = {
        'January': 1,
        'February': 2,
        'March': 3,
        'April': 4,
        'May': 5,
        'June': 6,
        'July': 7,
        'August': 8,
        'September': 9,
        'October': 10,
        'November': 11,
        'December': 12,
    };

    let months: string[] = ['January', 'February','March','April','May','June','July','August','September','October','November','December'];


    const getClassMonthlyData = (supplyClass: string) => {
         return consumption
            .filter(obj => obj.year === 2023 && obj.class === supplyClass)
            .sort((a, b) => a.month - b.month) // Sort by month
            .map(obj => obj.monthly_consumption);
    };

    const supplyClasses = ['I', 'III'];

    let colors = [
        ['rgba(255, 234, 0, 0.4)', 'rgba(255, 234, 0, 1)'],
        ['rgba(134, 209, 152, 0.4)', 'rgba(134, 209, 152, 1)'],
    ];

    const datasets = supplyClasses.map((supplyClass, i) => {
        let [colorMidOpaque, colorOpaque] = colors[i];
        return {
            id: i,
            label: supplyClass,
            data: getClassMonthlyData(supplyClass),
            backgroundColor: colorMidOpaque,
            borderWidth: 2,
            borderRadius: 5,
            borderSkipped: false,
            borderColor: colorOpaque
        }

    })

    const data = {
        labels: months,
        datasets: datasets
    };

    return (
        <Fragment>
            <Bar options={options} data={data} />
        </Fragment>
    );
};
