import {createContext,useContext,useState} from 'react'

export const AuthContext=createContext();

export default function AuthProvider({children}) {
  const inititalAuthUser=localStorage.getItem("Users")       //local storage mein Users tha 
  const [authUser,setAuthUser]=useState(
    inititalAuthUser?JSON.parse(inititalAuthUser):undefined
  );
  return (
    <AuthContext.Provider value={[authUser,setAuthUser]}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth=()=> useContext(AuthContext);
