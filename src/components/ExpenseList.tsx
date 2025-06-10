import React from "react";
import { Expense } from "../types";
interface ExpenseListProps {
    expenses: Expense[];
    onDeleteExpense: (id:string) => void;
}

const ExpenseList: React.FC<ExpenseListProps>  = ({ expenses, onDeleteExpense }) => {
    return(
        <div className="expense-list-container">
            <h2>Expenses</h2>
            <ul >
                {expenses.map((expense) => (
                    <li key={expense.id} className="expense-item">
                        <div className="expense-details">
                            {expense.description}: ${expense.amount.toFixed(2)} ({expense.category})
                        </div>
                        <button 
                            onClick={() => onDeleteExpense(expense.id)}
                            className="delete-btn">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;