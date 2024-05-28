import React, { createContext, useState, useContext, ReactNode } from "react";
import { useRouter } from "next/router";

interface User {
  name: string;
  login: string;
  password: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

interface AuthContextData {
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (login: string, password: string) => void;
  register: (name: string, login: string, password: string) => void;
  logout: () => void;
  users: User[];
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  const register = (name: string, login: string, password: string) => {
    const newUser = { name, login, password };
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    router.push("/");
  };

  const login = (login: string, password: string) => {
    const user = users.find(
      (user) => user.login === login && user.password === password
    );
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      router.push("/");
    } else {
      alert("Login ou senha incorretos");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        register,
        logout,
        users,
        posts,
        setPosts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
