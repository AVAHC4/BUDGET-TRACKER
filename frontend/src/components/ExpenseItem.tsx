import { useState, memo } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { deleteExpense } from "../features/expenses/expenseSlice";
import { ExpenseDocument } from "@shared/types/types";
import { FaTrashCan, FaPencil, FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { formatCurrency } from "../utils/currencyFormatter";
import UpdateExpenseModal from "./UpdateExpenseModal";
import { format } from "date-fns";

// Using memo to prevent unnecessary re-renders
const ExpenseItem = memo(({ expense }: { expense: ExpenseDocument }) => {
  if (!expense || !expense._id) {
    console.error('Missing expense data or MongoDB _id');
    return null; // Don't render if MongoDB data is invalid
  }

  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mongoId = expense._id.toString(); // Ensure MongoDB ID is a string

  const handleDelete = () => {
    dispatch(deleteExpense(mongoId));
  };

  // Format the date using MongoDB timestamp
  const expenseDate = new Date(expense.customDate || expense.createdAt);
  const formattedDate = format(expenseDate, 'MMM dd, yyyy');
  
  // Pre-compute values based on expense type from MongoDB
  const isExpenseType = expense.type === "expense";
  const typeIcon = isExpenseType ? (
    <FaArrowDown className="text-error" />
  ) : (
    <FaArrowUp className="text-success" />
  );
  
  const typeColorClass = isExpenseType ? "bg-error/10" : "bg-success/10";
  const amountColorClass = isExpenseType ? "text-error" : "text-success";
  const amountPrefix = isExpenseType ? "-" : "+";
  
  // Separate edit and delete button components to avoid React key warnings
  const EditButton = (
    <button 
      onClick={() => setIsModalOpen(true)} 
      className="btn btn-ghost btn-sm text-info hover:bg-info/10"
    >
      <FaPencil size={14} /> <span>Edit</span>
    </button>
  );

  const DeleteButton = (
    <button 
      onClick={handleDelete} 
      className="btn btn-ghost btn-sm text-error hover:bg-error/10"
    >
      <FaTrashCan size={14} /> <span>Delete</span>
    </button>
  );
  
  return (
    <div 
      key={mongoId}
      className="bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 p-5 rounded-2xl mb-4 flex flex-col border border-base-200 relative overflow-hidden group"
    >
      {/* Type indicator */}
      <div 
        className={`absolute top-0 right-0 w-24 h-24 flex justify-center items-center -rotate-45 -mt-12 -mr-12 ${typeColorClass}`}
      >
        <div className="mt-14 mr-1">{typeIcon}</div>
      </div>
      
      {/* Content */}
      <div className="flex flex-col">
        <p className="text-xl font-bold mb-2 line-clamp-1">{expense.text}</p>
        <p className="text-xs text-base-content/60 mb-3">{formattedDate}</p>
        
        <p className={`text-2xl font-bold mb-4 ${amountColorClass}`}>
          {amountPrefix}
          {formatCurrency(expense.amount)}
        </p>
        
        {/* Actions */}
        <div className="flex justify-between mt-auto pt-2 border-t border-base-200 opacity-70 group-hover:opacity-100 transition-opacity">
          {EditButton}
          {DeleteButton}
        </div>
      </div>
      
      <UpdateExpenseModal
        key={mongoId}
        expense={expense}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
});

// Add display name for better debugging
ExpenseItem.displayName = 'ExpenseItem';

export default ExpenseItem;
