import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBLjMPlDnNI2pj6JIgTr-TAK3kC_D1Cg2Q",
  authDomain: "chat-60092.firebaseapp.com",
  projectId: "chat-60092",
  storageBucket: "chat-60092.firebasestorage.app",
  messagingSenderId: "280507273977",
  appId: "1:280507273977:web:6831d3c52a4a522d3b8828",
  measurementId: "G-QF5NGFPCE8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;