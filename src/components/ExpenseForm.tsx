import React, {useState} from 'react';
import { Expense } from '../types';

interface ExpenseFormProps{
    onSubmit: (expense: Omit<Expense, 'id'>) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({onSubmit}) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!description || !amount || !category) return;

        onSubmit({
            description,
            amount: parseFloat(amount),
            category,
        });

        setDescription('');
        setAmount('');
        setCategory('');
    };
    return(
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
            <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            />
            <input
            type="text"
            placeholder="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            />
            <button type="submit">Add Expense</button>
        </form>
    );
};

export default ExpenseForm;