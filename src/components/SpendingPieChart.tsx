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
                    '#1282A2',//cerulean
                    '#001F54',//penn blue
                    '#C0B7B1', //silver
                    '#8E6E53',//some brown
                    '#048A81',//taupe
                    '#48392A',//dark cyan
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