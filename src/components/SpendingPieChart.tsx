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
                    'rgba(255, 255, 255, 0.51)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgb(0, 25, 98)',
                    'rgb(255, 0, 144)',
                    'rgba(119, 55, 249, 0.69)',
                    'rgb(172, 2, 2)',
                ],
            },
        ],
    };
    return (
        <div className="pie-chart-container">
            <h2>Spending Breakdown</h2>
            <Pie data={data}/>
        </div>
    );
};

export default SpendingPieChart;