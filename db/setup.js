import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const appCredentials = {
  apiKey: "AIzaSyDe43bcs-Q2Si4fDMVpttu89v8HdAE92Ck",
  authDomain: "budget-application-ea8df.firebaseapp.com",
  projectId: "budget-application-ea8df",
  storageBucket: "budget-application-ea8df.appspot.com",
  messagingSenderId: "278974269040",
  appId: "1:278974269040:web:f29b5114cb49b44bf796b5",
  measurementId: "G-156KSQMGH4",
};

const firebaseApp = initializeApp(appCredentials);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);