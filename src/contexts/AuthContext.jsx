import { createContext, useContext, useState, useEffect } from "react";
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut 
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
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
  const [emailVerified, setEmailVerified] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        
        // Fetch user role from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserRole(data.role || "school");
            setEmailVerified(data.emailVerified || false);
            setUserData(data);
          } else {
            setUserRole("school");
            setEmailVerified(false);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserRole("school");
          setEmailVerified(false);
        }
      } else {
        setUser(null);
        setUserRole(null);
        setEmailVerified(false);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  };

  // Register a new school user and create associated Firestore documents
  const register = async (email, password, displayName, schoolName) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    const uid = result.user.uid;
    const createdAt = new Date().toISOString();

    // Create user document in "users" collection
    await setDoc(doc(db, "users", uid), {
      uid,
      email: result.user.email,
      displayName: displayName || "",
      role: "school",
      schoolId: uid,
      // keep existing fields used elsewhere in the app
      emailVerified: false,
      createdAt,
      lastLogin: createdAt
    });

    // Create school document in "schools" collection
    await setDoc(doc(db, "schools", uid), {
      schoolId: uid,
      name: schoolName || "",
      location: "",
      totalMembers: 0,
      status: "pending",
      profileImageUrl: null,
      createdAt
    });

    // Sign out so the user must explicitly log in after registration
    await signOut(auth);

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
        emailVerified: true, // Google accounts are pre-verified
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

  const markEmailAsVerified = async () => {
    if (user) {
      try {
        await updateDoc(doc(db, "users", user.uid), {
          emailVerified: true
        });
        setEmailVerified(true);
        setUserData(prev => ({ ...prev, emailVerified: true }));
      } catch (error) {
        console.error("Error marking email as verified:", error);
        throw error;
      }
    }
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
    isAuthenticated: !!user,
    emailVerified,
    markEmailAsVerified,
    userData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
