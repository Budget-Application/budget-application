import {
  getDoc,
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../setup.js";

export const getDocument = async (documentPath) => {
  try {
    const docSnap = await getDoc(doc(db, documentPath));
    return docSnap.exists() ? { ...docSnap.data(), id: docSnap.id } : null;
  } catch (e) {
    console.log(`Error getting document: ${documentPath}`, e);
  }
};

export const getDocuments = async (collectionPath) => {
  try {
    const querySnap = await getDocs(collection(db, collectionPath));
    let documents = [];
    querySnap.forEach((doc) => {
      documents.push({ ...doc.data(), id: doc.id });
    });
    return documents;
  } catch (e) {
    console.log(
      `Error getting documents from collection: ${collectionPath} `,
      e
    );
  }
};
