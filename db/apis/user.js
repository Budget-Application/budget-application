import * as db from "./util.js";
import { DocumentReference, getDoc } from "firebase/firestore";

export const getUserDetails = async (uid) => {
  return await db.getDocument(`users/${uid}`);
};

export const getUserBudgetList = async (uid) => {
  const budgetRefs = await db.getDocuments(`users/${uid}/budgets`);
  const budgets = [];
  await Promise.all(budgetRefs.map(async (budgetRefs) => {
    const docRef = budgetRefs["ref"];
    if (docRef instanceof DocumentReference) {
      const docSnap = await getDoc(docRef);
      budgets.push({...docSnap.data(), id: docSnap.id});
    }
  }));
  return budgets;
};

/**
 * Function to create new user
 * @param {String} uid - The uid of the user
 * @param {Object} userDetails - The user details to create.
 * ```{id: uid,
      email: userEmail,
      name: fullName,
      phone_no: userPhoneNumber}```
 */
export const createNewUser = async (uid, userDetails) => {
  return await db.setDocument(`users/${uid}`, userDetails);
}