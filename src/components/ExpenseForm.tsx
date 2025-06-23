import React, {useState} from 'react';
import { Expense } from '../types';

interface ExpenseFormProps{
    //this is defining the type for the onSubmit prop, the (...) => void is the function signature
    // the parentheses contain the parameters that the function must accept
    // the arrow ( => ) seperates the parameters from the return value, in this case the return type is void 
    onSubmit: (expense: Omit<Expense, 'id'>) => void;
    //to breakdown the parameter here we have expense which is a inferface defined in types.ts
    // omit will tell typescript to create a new type by taking an existing type and removing (or omitting) specific properties from it
    //the reason for it here is at the moment of creation the new expense does not have an id yet, only after the form is submitted by the user
}

const categoriesList = ['Rent', 'Groceries', 'Bills', 'Entertainment', 'Subscription','Miscellaneous'];

const ExpenseForm: React.FC<ExpenseFormProps> = ({onSubmit}) => {
    //here when you declare variable typescript will infer the datatype of the variables beacuse we declared them inside the useState()
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