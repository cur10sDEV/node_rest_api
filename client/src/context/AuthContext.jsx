import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});
const authUser = JSON.parse(localStorage.getItem("authUser"));

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  // check whether the token is valid or expired
  const initialAuthData = {
    userId: null,
    isAuth: false,
    authToken: null,
    expiresIn: new Date().getTime(),
  };

  const [authData, setAuthData] = useState(initialAuthData);

  useEffect(() => {
    const currentTime = new Date().getTime();
    console.log({ authUser: authUser });
    if (authUser) {
      if (currentTime > authUser?.expiresIn) {
        localStorage.removeItem("authUser");
        navigate("/auth/login");
      } else {
        setAuthData({
          userId: authUser?.userId,
          isAuth: authUser?.isAuth,
          authToken: authUser?.authToken,
          expiresIn: authUser?.expiresIn,
        });
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
