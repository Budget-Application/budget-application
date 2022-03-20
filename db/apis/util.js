import {
  getDoc,
  collection,
  getDocs,
  doc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../setup.js";

/**
 * Function to get a document
 * @param {String} documentPath - The path of the document to get data from
 * @returns An object of `document`
 */
export const getDocument = async (documentPath) => {
  try {
    const docSnap = await getDoc(doc(db, documentPath));
    return docSnap.exists() ? { ...docSnap.data(), id: docSnap.id } : null;
  } catch (e) {
    console.error(`Error getting document: ${documentPath}`, e);
  }
};

/**
 * Function to create new document
 * @param {String} documentPath - The path of the document to set data
 * @param {Object} properties - The properties to add to the document, e.g: `{key1: value1, key2: value2}`
 * @returns true/false
 */
export const setDocument = async (documentPath, properties) => {
  try {
    await setDoc(doc(db, documentPath), properties);
    return true;
  } catch (e) {
    console.error(`Error creating document: ${documentPath}`, e);
    return false;
  }
};

/**
 * Function to get documents from a collection
 * @param {String} collectionPath - The path of the collection to get docs from
 * @returns {Array} An array of `documents`
 */
export const getDocuments = async (collectionPath) => {
  try {
    const querySnap = await getDocs(collection(db, collectionPath));
    let documents = [];
    querySnap.forEach((doc) => {
      documents.push({ ...doc.data(), id: doc.id });
    });
    return documents;
  } catch (e) {
    console.error(
      `Error getting documents from collection: ${collectionPath} `,
      e
    );
  }
};

/**
 * Function to add new expense for a date
 * @param {String} budgetId - The budgetId to update details
 * @param {String} date - The date to add expense. format: `01-01-2022`
 * @param {Object} expenseData - The expense details to add. format `{expenseName: "exp3", amount: 1}`
 */
export const addNewExpenseItem = async (budgetId, date, expenseData) => {
  let [day, month, year] = date.split("-");
  day = parseInt(day);
  const [dayPath, monthPath, yearPath, budgetPath] = [
    `budgets/${budgetId}/daily_expenses/${date}`,
    `budgets/${budgetId}/monthly_expenses/${month + "-" + year}`,
    `budgets/${budgetId}/yearly_expenses/${year}`,
    `budgets/${budgetId}`,
  ];
  const [dayRef, monthRef, yearRef, budgetRef] = [
    doc(db, dayPath),
    doc(db, monthPath),
    doc(db, yearPath),
    doc(db, budgetPath),
  ];
  try {
    const response = await runTransaction(db, async (transaction) => {
      const [dayDoc, monthDoc, yearDoc, budgetDoc] = [
        await transaction.get(dayRef),
        await transaction.get(monthRef),
        await transaction.get(yearRef),
        await transaction.get(budgetRef),
      ];

      const expenseAmount = dayDoc.exists()
        ? dayDoc.data()[expenseData.expenseName]
          ? dayDoc.data()[expenseData.expenseName]["amount"] +
            expenseData.amount
          : expenseData.amount
        : expenseData.amount;

      const dayExpenseItem = {};
      dayExpenseItem[expenseData.expenseName] = {
        amount: expenseAmount,
        last_updated_time: serverTimestamp(),
      };
      transaction.set(dayRef, dayExpenseItem, { merge: true });

      const monthExpenseItem = {};
      monthExpenseItem[day] = monthDoc.exists()
        ? monthDoc.data()[day]
          ? monthDoc.data()[day] + expenseData.amount
          : expenseData.amount
        : expenseData.amount;
      transaction.set(monthRef, monthExpenseItem, { merge: true });

      const yearExpenseItem = {};
      month = parseInt(month);
      yearExpenseItem[month] = yearDoc.exists()
        ? yearDoc.data()[month]
          ? yearDoc.data()[month] + expenseData.amount
          : expenseData.amount
        : expenseData.amount;
      transaction.set(yearRef, yearExpenseItem, { merge: true });

      transaction.set(
        budgetRef,
        {
          budget_total: budgetDoc.data()["budget_total"] + expenseData.amount,
          last_updated_time: serverTimestamp(),
        },
        { merge: true }
      );
      return true;
    });
    return response;
  } catch (e) {
    console.error("Error adding new-expense-item", e);
    return false;
  }
};

/**
 * Function to create new budget group
 * @param {String} budgetName - The budget name
 * @param {Array} userIds - List of userIds to include in budget group
 */
export const createNewBudgetGroup = async (budgetName, userIds) => {
  const userRefs = [];
  const budgetRef = doc(collection(db, "budgets"));
  userIds.forEach((userId) => {
    userRefs.push(doc(db, `users/${userId}/budgets/${budgetRef.id}`));
  });
  try {
    const response = await runTransaction(db, async (transaction) => {
      transaction.set(budgetRef, {
        budget_name: budgetName,
        budget_total: 0,
        last_updated_time: serverTimestamp(),
        users: userIds,
      });
      userRefs.forEach((userRef) => {
        transaction.set(userRef, { ref: budgetRef }, { merge: true });
      });
      return true;
    });
    return response;
  } catch (e) {
    console.error("Error creating new budget", e);
    return false;
  }
};
