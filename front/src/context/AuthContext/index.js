import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../provider/FirebaseProvider";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [localUser, setlocalUser] = useState(() => {
    const storedLocalUser = localStorage.getItem("user");
    return storedLocalUser ? JSON.parse(storedLocalUser) : null;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  function login(userData, userToken) {
    setCurrentUser(userData);
    setToken(userToken);
    setUserLoggedIn(true);
    setlocalUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userToken);
  }

  async function logout() {
    await signOut(auth);
    setCurrentUser(null);
    setToken(null);
    setUserLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  const value = {
    currentUser,
    userLoggedIn,
    loading,
    login,
    logout,
    token,
    openAuthModal,
    setOpenAuthModal,
    localUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
