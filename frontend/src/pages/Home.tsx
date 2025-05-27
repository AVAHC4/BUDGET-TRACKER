import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { getExpenses, reset } from "../features/expenses/expenseSlice";
import ExpenseItem from "../components/ExpenseItem";
import Loading from "../components/Loading";
import { ExpenseDocument } from "@shared/types/types";
import { FaPlus } from "react-icons/fa6";
import { FaWallet, FaChartLine, FaArrowDown, FaArrowUp, FaReceipt } from "react-icons/fa";
import { formatCurrency } from "../utils/currencyFormatter";
import WeeklyChart from "../components/WeeklyChart";

function Home() {
  const n = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);
  const { expenses, isLoading, isError, message } = useSelector(
    (state: RootState) => state.expenses,
  );

  useEffect(() => {
    if (!user) {
      n("/login");
    }
    dispatch(getExpenses({} as ExpenseDocument));
    return () => {
      dispatch(reset());
    };
  }, [user, n, isError, dispatch, message]);

  if (isLoading) {
    return <Loading />;
  }

  const sortedExpenses = [...(expenses as ExpenseDocument[])].sort((a, b) => {
    const dateA = new Date(a.customDate || a.createdAt);
    const dateB = new Date(b.customDate || b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  // Calculate total income for all time
  const totalIncome = (expenses as ExpenseDocument[])
    .filter((expense) => expense.type === "income")
    .reduce((total, expense) => total + (expense.amount || 0), 0);

  // Calculate total expenses for all time
  const totalExpenses = (expenses as ExpenseDocument[])
    .filter((expense) => expense.type === "expense")
    .reduce((total, expense) => total + (expense.amount || 0), 0);

  // Calculate actual balance
  const actualBalance = totalIncome - totalExpenses;
  
  // Get today's expenses only
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todaysExpenses = (expenses as ExpenseDocument[]).filter(expense => {
    const expenseDate = new Date(expense.customDate || expense.createdAt);
    expenseDate.setHours(0, 0, 0, 0);
    return expenseDate.getTime() === today.getTime();
  });
  
  const todaysSpending = todaysExpenses
    .filter(expense => expense.type === "expense")
    .reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Header & Welcome */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="text-4xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome back, {user && user.name} 👋
          </h3>
          <p className="text-base-content/70 mt-2">Here's what's happening with your finances today</p>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Balance Card */}
        <div className="bg-base-100 rounded-2xl shadow-lg p-6 border border-base-200 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold font-heading">Current Balance</h3>
            <div className="p-3 rounded-full bg-primary/10">
              <FaWallet className="text-primary" />
            </div>
          </div>
          <p 
            className={`text-3xl font-bold ${actualBalance >= 0 ? "text-success" : "text-error"}`}
          >
            {formatCurrency(actualBalance)}
          </p>
          <div className="text-sm text-base-content/70 mt-2 flex items-center gap-2">
            <span className="text-xs px-2 py-1 rounded-full bg-base-200">
              Updated just now
            </span>
          </div>
        </div>
        
        {/* Income Card */}
        <div className="bg-base-100 rounded-2xl shadow-lg p-6 border border-base-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold font-heading">Total Income</h3>
            <div className="p-3 rounded-full bg-success/10">
              <FaArrowUp className="text-success" />
            </div>
          </div>
          <p className="text-3xl font-bold text-success">{formatCurrency(totalIncome)}</p>
          <div className="text-sm text-base-content/70 mt-2">
            All-time income tracking
          </div>
        </div>
        
        {/* Expense Card */}
        <div className="bg-base-100 rounded-2xl shadow-lg p-6 border border-base-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold font-heading">Total Expenses</h3>
            <div className="p-3 rounded-full bg-error/10">
              <FaArrowDown className="text-error" />
            </div>
          </div>
          <p className="text-3xl font-bold text-error">{formatCurrency(totalExpenses)}</p>
          <div className="text-sm text-base-content/70 mt-2">
            {todaysSpending > 0 && (
              <span className="text-xs px-2 py-1 rounded-full bg-base-200">
                {formatCurrency(todaysSpending)} today
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Chart Section */}
      <div className="bg-base-100 rounded-2xl shadow-lg p-6 border border-base-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold font-heading">Weekly Spending Overview</h3>
          <div className="p-2 rounded-full bg-info/10">
            <FaChartLine className="text-info" />
          </div>
        </div>
        <WeeklyChart expenses={expenses as ExpenseDocument[]} />
      </div>
      
      {/* Transactions Section */}
      <div className="bg-base-100 rounded-2xl shadow-lg p-6 border border-base-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold font-heading">Recent Transactions</h3>
          <div className="p-2 rounded-full bg-secondary/10">
            <FaReceipt className="text-secondary" />
          </div>
        </div>
        
        {sortedExpenses.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sortedExpenses.slice(0, 6).map((expense) => {
              // Ensure MongoDB _id exists and is valid
              if (!expense._id) {
                console.error('Missing MongoDB _id for expense', expense);
                return null;
              }
              // Use string version of MongoDB ObjectId as key
              return <ExpenseItem key={expense._id.toString()} expense={expense} />;
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-base-200/50 rounded-xl">
            <p className="text-base-content/70">No transactions found</p>
            <p className="text-sm mt-2">Add your first expense to get started</p>
          </div>
        )}
        
        {sortedExpenses.length > 6 && (
          <div className="mt-6 text-center">
            <Link to="/transactions" className="btn btn-ghost btn-sm">
              View All Transactions
            </Link>
          </div>
        )}
      </div>
      
      {/* Add New Expense Button */}
      <Link to="/add">
        <button
          className="fixed bottom-6 right-6 btn btn-primary btn-lg shadow-xl rounded-full"
          data-tip="Add New Expense"
        >
          <FaPlus className="mr-2" /> Add Transaction
        </button>
      </Link>
    </div>
  );
}

export default Home;
