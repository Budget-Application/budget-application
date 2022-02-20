import * as db from "./util.js";

export const getMonthlyExpenses = async (budgetId, month) => {
  const monthlyExpense = await db.getDocument(
    `budgets/${budgetId}/monthly_expenses/${month}`
  );
  return monthlyExpense ? monthlyExpense : { id: month };
};

// const data = await getMonthlyExpenses("2xhwmTxgiCraAWKRPYos", "2-2022");
// console.log(data);
