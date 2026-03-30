    import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";
    import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
    import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

    // 🔹 Your Firebase config
    const firebaseConfig = {
      apiKey: "AIzaSyBLjMPlDnNI2pj6JIgTr-TAK3kC_D1Cg2Q",
      authDomain: "chat-60092.firebaseapp.com",
      projectId: "chat-60092",
      storageBucket: "chat-60092.firebasestorage.app",
      messagingSenderId: "280507273977",
      appId: "1:280507273977:web:6831d3c52a4a522d3b8828",
      measurementId: "G-QF5NGFPCE8"
    };

    // 🔹 Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    console.log("🚀 Register.js loaded successfully!");

    // ✅ Initialize auth
    const auth = getAuth(app);
    
    // 🔹 Initialize Firestore
    const db = getFirestore(app);
    
    // 🔹 Google Auth Provider
    const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });

    // 🔹 Save user to Firestore helper function
    const saveUserToFirestore = async (user) => {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      
      if (!docSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          displayName: user.displayName || "Anonymous",
          email: user.email,
          photoURL: user.photoURL || null,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        });
        console.log("✅ New user saved to Firestore!");
      } else {
        await setDoc(userRef, {
          lastLogin: new Date().toISOString()
        }, { merge: true });
        console.log("✅ Existing user login updated!");
      }
    };

    // 🔹 Handle Register - Run after a small delay to ensure DOM is ready
    setTimeout(() => {
      console.log("📄 Setting up event listeners...");
      
      // Email/password registration
      const submit = document.getElementById("submit");
      if (submit) {
        console.log("✅ Submit button found");
        submit.addEventListener("click", (event) => {
          event.preventDefault();
          console.log("🔵 Submit button clicked");

          const email = document.getElementById("email").value;
          const password = document.getElementById("password").value;

          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const user = userCredential.user;
              alert("Account created successfully ✅");
              console.log(user);
              window.location.href = "dashboard.html";
            })
            .catch((error) => {
              alert(error.message);
            });
        });
      } else {
        console.error("❌ Submit button NOT found!");
      }

      // Google Register
      const googleRegisterBtn = document.getElementById("googleRegister");
      console.log("✅ Google Register button found:", !!googleRegisterBtn);
      
      if (googleRegisterBtn) {
        console.log("🔵 Attaching Google Register event listener...");
        googleRegisterBtn.addEventListener("click", (event) => {
          event.preventDefault();
          console.log("🔵 Google Register button clicked!");

          signInWithPopup(auth, googleProvider)
            .then((result) => {
              const user = result.user;
              const additionalInfo = getAdditionalUserInfo(result);

              if (additionalInfo.isNewUser) {
                console.log("🎉 New user registered via Google!");
                saveUserToFirestore(user);
                alert("Account created successfully with Google ✅");
              } else {
                console.log("👋 Existing user logged in via Google");
                saveUserToFirestore(user);
                alert("Login successful with Google ✅");
              }

              window.location.href = "dashboard.html";
            })
            .catch((error) => {
              console.error("Google Sign-In Error:", error);
              alert("Google Sign-In Error: " + error.message);
            });
        });
        console.log("✅ Google Register event listener attached!");
      } else {
        console.error("❌ Google Register button NOT FOUND in DOM!");
      }
      console.log("🎯 All event listeners setup complete!");
    }, 100);