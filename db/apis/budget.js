import * as db from "./util.js";

/**
 * Function to get expense details from a budget for a given month
 * @param {String} budgetId - The budgetId to get monthly expense
 * @param {String} month - The month on which to get monthly expense e.g `05-1999`
 */
export const getMonthlyExpense = async (budgetId, month) => {
  const monthlyExpense = await db.getDocument(
    `budgets/${budgetId}/monthly_expenses/${month}`
  );
  return monthlyExpense ? monthlyExpense : { id: month };
};

/**
 * Function to get expense details from a budget for a given year
 * @param {String} budgetId - The budgetId to get yearly expense
 * @param {String} year - The year on which to get yearly expense e.g `1999`
 */
export const getYearlyExpense = async (budgetId, year) => {
  const yearlyExpense = await db.getDocument(
    `budgets/${budgetId}/yearly_expenses/${year}`
  );
  return yearlyExpense ? yearlyExpense : { id: year };
};

/**
 * Function to get expense details from a budget for a given date
 * @param {String} budgetId - The budgetId to get daily expense
 * @param {String} date - The date on which to get daily expense e.g `23-05-1999`
 */
export const getDailyExpense = async (budgetId, date) => {
  const dailyExpense = await db.getDocument(
    `budgets/${budgetId}/daily_expenses/${date}`
  );
  return dailyExpense ? dailyExpense : { id: date };
};

/**
 * Function to get expense names from a budget
 * @param {String} budgetId - The budgetId to get expenseNames
 */
export const getExpenseNames = async (budgetId) => {
  const budgetDetails = await db.getDocument(`budgets/${budgetId}`);
  const expenseNames = budgetDetails["expense_names"];
  return expenseNames;
};

// const data = await getDailyExpense("2xhwmTxgiCraAWKRPYos", "26-02-2022");
// console.log(data);
// const data = await getExpenseNames("2xhwmTxgiCraAWKRPYos");
// console.log(data);