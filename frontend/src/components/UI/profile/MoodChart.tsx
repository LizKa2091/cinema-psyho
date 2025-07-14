import React, { FC, useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { get30Days } from '../../../utils/get30Days';
import { clearSearchHistory, initSearchHistory } from '../../../features/searchHistory';
import { IHistoryElement, IChartData, IDateTimestamp } from '../../../types/history.types';
import styles from './MoodChart.module.scss';

const MoodChart: FC = () => {
   const [chartData, setChartData] = useState<IChartData[]>([]);

   useEffect(() => {
      clearSearchHistory();
      const days: IDateTimestamp[] = get30Days();
      const history: IHistoryElement[] = initSearchHistory();
      const labelsCountByDate: Record<string, number> = {};

      history.forEach((item: IHistoryElement) => {
         const date: Date = new Date(item.timestamp);
         const day: string = String(date.getDate()).padStart(2, '0');
         const month: string = String(date.getMonth() + 1).padStart(2, '0');
         const year: number = date.getFullYear();
         const formattedDate = `${day}.${month}.${year}`;

         if (labelsCountByDate[formattedDate]) {
            labelsCountByDate[formattedDate]++;
         } 
         else {
            labelsCountByDate[formattedDate] = 1;
         }
      });

      const chartData = days.map(day => {
         const count = labelsCountByDate[day.date] || 0;
         return { name: day.date, uv: count };
      });

      setChartData(chartData);
   }, []);
   
   return (
      <div data-testid='mood-chart' className={styles.moodContainer}>
         <h2>Ваша история поиска</h2>
         <LineChart width={window.innerWidth - 200} height={300} data={chartData}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
         </LineChart>
      </div>
   )
}

export default MoodChart;