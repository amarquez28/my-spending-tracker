import React from "react";
import { Expense } from "../types";

interface PercentagesListProps{
    expenses: Expense[];
}

const Percentages: React.FC<PercentagesListProps> = ({expenses}) => {
    const totalSpending = expenses.reduce((acc,expense) => acc + expense.amount, 0);
    const spendingByCategory = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {} as Record<string, number>);

    const Percentages = Object.keys(spendingByCategory).map(category =>{
        const categoryTotal = spendingByCategory[category];
        const percentage = totalSpending > 0 ? (categoryTotal / totalSpending) *  100: 0;
        return {
            category,
            percentage: percentage.toFixed(2)
        };
    });
    return (
        <div className="percentages-container">
            <h2>Percent By Category</h2>
            <ul>
                {Percentages.map(({category, percentage}) =>(
                    <li key={category} >
                        <span>{category}:</span>
                        <strong>{percentage}%</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Percentages;