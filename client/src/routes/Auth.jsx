import { Routes, Route } from "react-router-dom";
import SignUp from "../components/auth/SignUp";
import Login from "../components/auth/Login";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Route>
    </Routes>
  );
};

export default AuthRoutes;
