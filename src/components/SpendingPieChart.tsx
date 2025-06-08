import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart  as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Expense } from "../types";

ChartJS.register(ArcElement, Tooltip, Legend);

interface SpendingPieChartProps{
    expenses: Expense[];
}

const SpendingPieChart: React.FC<SpendingPieChartProps> = ({expenses}) => {
    const spendingByCategory = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;

    }, {} as Record<string, number>);

    const data = {
        labels: Object.keys(spendingByCategory),
        datasets: [
            {
                label: 'Spending by Category',
                data: Object.values(spendingByCategory),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
            },
        ],
    };
    return (
        <div style={{maxWidth: '400px', margin: '2rem auto'}}>
            <h2>Spending Breakdown</h2>
            <Pie data={data}/>
        </div>
    );
};

export default SpendingPieChart;