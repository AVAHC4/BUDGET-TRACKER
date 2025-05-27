import { ExpenseDocument } from "@shared/types/types";
import { formatCurrency } from "../utils/currencyFormatter";

interface WeeklyChartProps {
  expenses: ExpenseDocument[];
}

export default function WeeklyChart({ expenses }: WeeklyChartProps) {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Assuming week starts on Monday
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const sortedExpenses = [...expenses].sort((a, b) => {
    const dateA = new Date(a.customDate || a.createdAt);
    const dateB = new Date(b.customDate || b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  const weeklyExpenses = sortedExpenses.filter((expense) => {
    const expenseDate = new Date(expense.customDate || expense.createdAt);
    return expenseDate >= startOfWeek && expenseDate <= endOfWeek && expense.type === "expense";
  });

  const dailyExpenses = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);

    const dayExpenses = weeklyExpenses.filter((expense) => {
      const expenseDate = new Date(expense.customDate || expense.createdAt);
      return (
        expenseDate.getDate() === date.getDate() &&
        expenseDate.getMonth() === date.getMonth() &&
        expenseDate.getFullYear() === date.getFullYear()
      );
    });
    return dayExpenses.reduce((total, expense) => total + (expense.amount || 0), 0);
  });

  const locale = navigator.language;
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date);
  });

  const maxDataValue = Math.max(...dailyExpenses, 0);

  const monthlyExpenses = weeklyExpenses.reduce(
    (total, expense) => total + (expense.amount || 0),
    0,
  );

  return (
    <div className="w-full">
      <div className="relative h-64 bg-base-100 rounded-xl mb-6">
        {dailyExpenses.reduce((acc, value) => acc + value, 0) > 0 ? (
          <>
            {/* Chart grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-20">
              <div className="w-full border-t border-base-content"></div>
              <div className="w-full border-t border-base-content"></div>
              <div className="w-full border-t border-base-content"></div>
              <div className="w-full border-t border-base-content"></div>
            </div>
            
            {/* Bars */}
            <div className="absolute inset-x-0 bottom-0 flex justify-around items-end h-full px-2 pt-8 pb-10">
              {dailyExpenses.map((value, index) => (
                <div
                  key={`day-expense-${daysOfWeek[index]}-${index}`}
                  className="flex flex-col items-center justify-end group"
                  style={{
                    height: "100%",
                    width: `${100 / 7}%`,
                  }}
                >
                  {/* Value tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mb-2 px-2 py-1 bg-base-300 rounded-lg shadow-md text-xs font-medium">
                    {formatCurrency(value)}
                  </div>
                  
                  {/* Bar */}
                  <div 
                    className="w-full max-w-[24px] bg-primary/20 group-hover:bg-primary transition-colors duration-300 rounded-t-md mx-auto relative overflow-hidden"
                    style={{
                      height: `${Math.max((value / maxDataValue) * 70, 5)}%`,
                    }}
                  >
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-primary"
                      style={{
                        height: `${Math.max((value / maxDataValue) * 70, 5)}%`,
                      }}
                    ></div>
                  </div>
                  
                  {/* Day label */}
                  <div className="text-center text-xs mt-2 font-medium">{daysOfWeek[index]}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-base-content/50 flex-col">
            <svg className="w-12 h-12 mb-3 opacity-20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 21h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM5 5h14l.001 14H5V5z"/>
              <path d="m13.553 11.658-4-2-2.448 4.895 1.79.894 1.552-3.105 4 2 2.448-4.895-1.79-.894z"/>
            </svg>
            <p className="text-sm font-medium">No expenses this week</p>
            <p className="text-xs mt-1">Add some transactions to see your weekly chart</p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center px-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <span className="text-sm font-medium">Daily spending</span>
        </div>
        <div className="flex-col text-right">
          <p className="text-sm text-base-content/70">Total this week</p>
          <p className="text-2xl font-bold">{formatCurrency(monthlyExpenses)}</p>
        </div>
      </div>
    </div>
  );
}
