import * as db from "./util.js";

export const getUserDetails = async (uid) => {
  return await db.getDocument(`users/${uid}`);
};

export const getUserBudgetList = async (uid) => {
  return await db.getDocuments(`users/${uid}/budgets`);
};
