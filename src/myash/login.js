import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBLjMPlDnNI2pj6JIgTr-TAK3kC_D1Cg2Q",
  authDomain: "chat-60092.firebaseapp.com",
  projectId: "chat-60092",
  storageBucket: "chat-60092.firebasestorage.app",
  messagingSenderId: "280507273977",
  appId: "1:280507273977:web:6831d3c52a4a522d3b8828",
  measurementId: "G-QF5NGFPCE8"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

console.log("🚀 Login loaded");

// Save user to Firestore
const saveUser = async (user) => {
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName || "Anonymous",
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    });
  } else {
    await setDoc(userRef, {
      lastLogin: new Date().toISOString()
    }, { merge: true });
  }
};

// Wait for DOM
document.addEventListener("DOMContentLoaded", () => {

  // EMAIL LOGIN
  const submit = document.getElementById("submit");

  submit.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful ✅");
      await saveUser(userCredential.user);
      window.location.href = "dashboard.html";
    } catch (error) {
      alert(error.message);
    }
  });

  // GOOGLE LOGIN
  const googleBtn = document.getElementById("googleLogin");

  googleBtn.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await saveUser(result.user);

      alert("Google Login successful ✅");
      window.location.href = "dashboard.html";
    } catch (error) {
      alert(error.message);
    }
  });

});