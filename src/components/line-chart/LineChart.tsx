
import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export const LineChart = (props: any) => {
    const {
        data,
        colors: {
            backgroundColor = 'black',
            lineColor = 'gold',
            textColor = 'white',
            areaTopColor = '#FFD700',
            areaBottomColor = 'rgba(255, 215, 0, 0.28)',
        } = {},
    } = props;

    const chartContainerRef = useRef();

    useEffect(
        () => {
            const handleResize = () => {
                // @ts-ignore
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            };

            // @ts-ignore
            // @ts-ignore
            // @ts-ignore
            // @ts-ignore
            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: backgroundColor },
                    textColor,
                },
                grid: {
                    horzLines: {
                        visible: false, // Remove horizontal grid lines
                    },
                    vertLines: {
                        visible: false, // Remove vertical grid lines
                    },
                },
                // @ts-ignore
                width: chartContainerRef.current.clientWidth,
                height: 300,
            });
            chart.timeScale().fitContent();

            const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
            newSeries.setData(data);

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
        [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    );


    return (
        <div
            // @ts-ignore
            ref={chartContainerRef}
        />
    );
};