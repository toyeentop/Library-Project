import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { BOOK_DATA } from '../data';

export default function BookStatusPieChart() {
    const statusCounts = BOOK_DATA.reduce(
        (acc, book) => {
          if (book.status === 'Available') {
            acc.available += 1;
          } else if (book.status === 'Not Available') {
            acc.notAvailable += 1;
          }
          return acc;
        },
        { available: 0, notAvailable: 0 }
      );
  return (
    <div>
        <h2>Pie chart showing analysis of available books</h2>
        <PieChart
      series={[
        {
          data: [
            { id: 0, value: statusCounts.available + 11, label: 'Available', color: 'green' },
            { id: 1, value: statusCounts.notAvailable + 11, label: 'Not available', color: 'red' }
          ],
          arcLabel: (item) => `${item.value}%`
        },
      ]}
      width={400}
      height={200}
    />

    </div>
  );
}
