import { createContext, useContext, useState, useEffect } from "react";
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut 
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        
        // Fetch user role from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserRole(userData.role || "school");
          } else {
            setUserRole("school");
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserRole("school");
        }
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  };

  const register = async (email, password, displayName, role = "school") => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Default values
    const schoolId = role === "school" ? result.user.uid : null;

    // Create user document in Firestore
    await setDoc(doc(db, "users", result.user.uid), {
      uid: result.user.uid,
      email: result.user.email,
      displayName: displayName || "Anonymous",
      role,
      schoolId,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    });

    // If the user is a school, create its school profile document
    if (role === "school") {
      await setDoc(doc(db, "schools", schoolId), {
        schoolId,
        name: displayName || "School",
        location: "Kigali, Rwanda",
        status: "pending", // admin can approve later
        profileImageUrl: null,
        createdAt: new Date().toISOString()
      });
    }
    
    return result;
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    // Check if user exists, if not create document
    const userDoc = await getDoc(doc(db, "users", result.user.uid));
    if (!userDoc.exists()) {
      const schoolId = result.user.uid;
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName || "Anonymous",
        photoURL: result.user.photoURL,
        role: "school",
        schoolId,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      });

      await setDoc(doc(db, "schools", schoolId), {
        schoolId,
        name: result.user.displayName || "School",
        location: "Kigali, Rwanda",
        status: "pending",
        profileImageUrl: null,
        createdAt: new Date().toISOString()
      });
    } else {
      await setDoc(doc(db, "users", result.user.uid), {
        lastLogin: new Date().toISOString()
      }, { merge: true });
    }
    
    return result;
  };

  const logout = async () => {
    await signOut(auth);
  };

  const isAdmin = () => userRole === "admin";
  const isSchool = () => userRole === "school";

  const value = {
    user,
    userRole,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
    isAdmin,
    isSchool,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};