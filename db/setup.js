import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const appCredentials = {
  type: "service_account",
  projectId: "budget-application-ea8df",
};

const firebaseApp = initializeApp(appCredentials);

export const db = getFirestore(firebaseApp);
