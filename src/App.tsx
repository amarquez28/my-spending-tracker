import React, {useState, useEffect} from 'react';
import './App.css';
import { Expense } from './types';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import SpendingPieChart from './components/SpendingPieChart';

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

  return (
    <div style={{padding: '2rem'}}>
      <h1>My Spending Tracker</h1>
      <ExpenseForm onSubmit={addExpense}/>
      <ExpenseList expenses={expenses}/>
      <SpendingPieChart expenses={expenses}/>
    </div>
  );
};


export default App;
