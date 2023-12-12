import {
  createContext,
  useContext,
  useState,
  useEffect,
  FC,
  ReactNode,
} from "react";
import { parseCookies, destroyCookie, setCookie } from "nookies";
import { parseJwt } from "./parseJWT";
import { useRouter } from "next/router";

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  userId?: number;
  userName?: string;
  email?: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { token } = parseCookies();
    if (token) {
      const decodedUser = parseJwt(token);
      setUser({
        userId: Number(decodedUser.userId),
        userName: decodedUser.userName,
        email: decodedUser.email,
        token,
      });
    }
  }, []);

  const login = (token: string) => {
    const decodedUser = parseJwt(token);
    setUser({
      userId: Number(decodedUser.userId),
      userName: decodedUser.userName,
      email: decodedUser.email,
      token,
    });
    setCookie(null, "token", token, {
      sameSite: "strict",
      path: "/", // Adjust the path as needed
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });
    router.push("/");
  };

  const logout = () => {
    destroyCookie(null, "token");
    setUser(null);
  };

  const contextValue: AuthContextType = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
