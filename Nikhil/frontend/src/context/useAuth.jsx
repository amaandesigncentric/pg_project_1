import React ,{ createContext ,useContext, useState }  from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({children})=>{
  const [user, setUser] = useState(() => {
  const storedUser = localStorage.getItem("user_data");
  return storedUser ? JSON.parse(storedUser) : null;
});
  const navigate = useNavigate();
  const [dataStore, setDataStore] = useState({
    pumps: [],
    caps: [],
    glass: [],
    accessories: [],
  });

  const login  = (user)=>{
    setUser(user);
    localStorage.setItem("user_data",JSON.stringify(user));
  }

  const logout = ()=>{
    setUser(null);
    localStorage.clear();
    navigate("/");
  }

  return (
    <AuthContext.Provider value={{user,login,logout}}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = ()=> useContext(AuthContext);

export {AuthProvider ,useAuth}