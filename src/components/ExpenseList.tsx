import React from "react";
import { Expense } from "../types";
interface ExpenseListProps {
    expenses: Expense[];
}

const ExpenseList: React.FC<ExpenseListProps>  = ({ expenses }) => {
    return(
        <div className="expense-list-container">
            <h2>Expenses</h2>
            <ul >
                {expenses.map((expense) => (
                    <li key={expense.id}>
                        {expense.description}: ${expense.amount.toFixed(2)} ({expense.category})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;