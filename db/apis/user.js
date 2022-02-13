import { async } from "@firebase/util";
import {
  getDoc,
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../setup.js";

// const dummyUser = {
//   name: "testUser",
//   phone_no: 1234567891,
//   email: "abc@gmail.com",
// };

// export const addDummyUser = async (db) => {
//   try {
//     await setDoc(doc(db, "users", "testUser"), dummyUser);
//     console.log("Dummy User Created");
//     //console.log(ref);
//   } catch (e) {
//     console.error("Error creating dummyUser: ", e);
//   }
// };

export const getUserDetails = async (uid) => {
  try {
    const docSnap = await getDoc(doc(db, `users/${uid}`));
    return docSnap.exists() ? docSnap.data() : null;
  } catch (e) {
    console.log(`Error getting user:${uid} details`, e);
  }
};

export const getUserBudgetList = async (uid) => {
  try {
    const querySnap = await getDocs(collection(db, `users/${uid}/budgets`));
    let budgetList = [];
    querySnap.forEach((doc) => {
      budgetList.push(doc.data());
    });
    return budgetList;
  } catch (e) {
    console.log(`Error getting budgets for user:${uid} `, e);
  }
};
