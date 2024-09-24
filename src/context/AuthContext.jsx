// src/context/AuthContext.js
import { account } from "@/services/appwrite";
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(false);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      if (user) {
        setLoading(true);
  
        await account.deleteSession('current'); 
        
        // Send request to backend to audit authToken as ''.
        const authToken = sessionStorage.getItem("authToken");
        const response = await fetch('http://localhost:3000/api/v1/user/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ authToken }),
        });
  
        if (response.ok) {
          const data = await response.json(); 
          setUser(null); // Reset user state
          sessionStorage.removeItem("authToken"); // Clear the authToken from sessionStorage
          sessionStorage.removeItem("role"); // Clear the authToken from sessionStorage
          // console.log(data); // Log the response data
        } else {
          console.error("Logout failed: ", response);
        }
      }
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
