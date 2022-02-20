import * as db from "./util.js";

export const getMonthlyExpense = async (budgetId, month) => {
  const monthlyExpense = await db.getDocument(
    `budgets/${budgetId}/monthly_expenses/${month}`
  );
  return monthlyExpense ? monthlyExpense : { id: month };
};

export const getYearlyExpense = async (budgetId, year) => {
  const yearlyExpense = await db.getDocument(
    `budgets/${budgetId}/yearly_expenses/${year}`
  );
  return yearlyExpense ? yearlyExpense : { id: year };
};

export const getDailyExpense = async (budgetId, date) => {
  const dailyExpense = await db.getDocument(
    `budgets/${budgetId}/daily_expenses/${date}`
  );
  return dailyExpense ? dailyExpense : { id: date };
};

//const data = await getMonthlyExpense("2xhwmTxgiCraAWKRPYos", "2-2022");
//const data = await getYearlyExpense("2xhwmTxgiCraAWKRPYos", "2022");
// const data = await getDailyExpense("2xhwmTxgiCraAWKRPYos", "23-05-2022");
// console.log(data);
