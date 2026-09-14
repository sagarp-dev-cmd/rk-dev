import React, { createContext, useContext, useState, ReactNode,useEffect } from "react";
import axios from "axios";
import { getCSRFToken } from '../pages/Auth/axiosConfig';


interface AuthContextType {
  user: { username: string } | null;
  login: (username: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // const login = (username: string) => {
  //   setUser({ username }); 
  // };

  // const logout = () => {
  //   setUser(null);
  // };


  // Restore user from localStorage on page load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
      setLoading(false);
  }, []);

  const login = (username: string) => {
    const userData = { username };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Save to localStorage
  };

  const logout = async () => {
    try {
      // Call backend logout API
      const csrfToken =  await getCSRFToken();
          const response = await axios.post("user/logout/", {}, {
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrfToken,
            },
            withCredentials: true, // Important for session auth

       });
        //  console.log(response.data);
        }  catch (error: any) {
      console.error("Backend logout failed:", error);
    } finally {
      // Clear frontend state regardless of backend call success
      setUser(null);
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout,loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
