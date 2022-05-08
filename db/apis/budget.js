import * as db from "./util.js";
import { arrayUnion } from "firebase/firestore";

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
 * Function to get all expense details from a budget
 * @param {String} budgetId - The budgetId to get daily expense
 */
 export const getAllExpense = async (budgetId) => {
  const AllExpense = await db.getDocuments(
    `budgets/${budgetId}/daily_expenses`
  );
  return AllExpense ? AllExpense : { };
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

/**
 * Function to set expense names from a budget
 * @param {String} budgetId - The budgetId to get expenseNames
 */
export const addExpenseName = async (budgetId, expenseName) => {
  return await db.updateDocument(`budgets/${budgetId}`, {
    expense_names: arrayUnion(expenseName),
  });
};

/**
 * Function to get expense names from a budget
 * @param {String} budgetId - The budgetId to get expenseNames
 */
export const getUsersInBudget = async (budgetId) => {
  const budgetDetails = await db.getDocument(`budgets/${budgetId}`);
  const usersList = budgetDetails["users"];
  return usersList;
};

/**
 * Function to add new expense for a date
 * @param {String} budgetId - The budgetId to update details
 * @param {String} date - The date to add expense. format: `01-01-2022`
 * @param {Object} expenseData - The expense details to add. format `{expenseName: "exp3", amount: 1}`
 */
export const addNewExpenseItem = async (budgetId, date, expenseData) => {
  return await db.addNewExpenseItem(budgetId, date, expenseData);
};
