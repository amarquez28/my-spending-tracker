import React, {useState, useEffect} from 'react';
import './App.css';
import { Expense } from './types';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import SpendingPieChart from './components/SpendingPieChart';
import Percentages from './components/Percentages';

//we create a React Functional Component ('React.FC')
//then specify the shape that its props will have, syntax for this will be React.FC<interfaceName> 
const App: React.FC = () => {
  const [expenses, setExpenses] = useState <Expense[]> (() => {
    const savedExpenses = localStorage.getItem('expenses');
    if(savedExpenses){
      try{
        const parsedExpenses = JSON.parse(savedExpenses);
        return Array.isArray(parsedExpenses) ? parsedExpenses : [];
      }
      catch(error){
        console.error("Failed to parse expenses from local storage", error);
        return [];
      }
    }
    else{
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    setExpenses([...expenses,{...expense, id: Date.now().toString() }]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return (
    <div style={{padding: '2rem'}}>
      <h1>My Spending Tracker</h1>
      <ExpenseForm onSubmit={addExpense}/>
      <div className='main-content'>
        <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense}/>
        <SpendingPieChart expenses={expenses}/>
      </div>
        <Percentages expenses={expenses}/>
    </div>
  );
};


export default App;
