import React, {useState} from 'react';
import { Expense } from '../types';

interface ExpenseFormProps{
    onSubmit: (expense: Omit<Expense, 'id'>) => void;
}

const categoriesList = ['Rent', 'Groceries', 'Bills', 'Entertainment', 'Subscription','Miscellaneous '];

const ExpenseForm: React.FC<ExpenseFormProps> = ({onSubmit}) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState(categoriesList[0]);

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
        setCategory(categoriesList[0]);
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
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categoriesList.map((cat) => (
                <option key={cat} value={cat}>
                    {cat}
                </option>
            ))}
          </select>
            <button type="submit">Add Expense</button>
        </form>
    );
};

export default ExpenseForm;