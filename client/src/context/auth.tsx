
import { ReactNode, createContext, useEffect, useState } from "react";
import authService from "../service/authService";


interface IUser {
  user: {
    name: string;
    email: string;
    password: string;
    avatar?: string;
  };
}

interface AuthContextType {
  currentUser: IUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}
const defaultAuthContext: AuthContextType = {
  currentUser: null,
  login: async () => {},
  logout: () => {}
};


export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(
    JSON.parse(localStorage.getItem("user") as string) || null
  );

  

  useEffect(() => {
    const currentUser = authService.getCurrentUser();

    if (!currentUser) {
      console.log(currentUser)
    } else {
      setCurrentUser(currentUser);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const user = await authService.login(email, password);
    setCurrentUser(user);
  }; 

  const logout = () => {
    authService.logout().then(() => {
      setCurrentUser(null);
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

// Example usage of the AuthContext in a component
