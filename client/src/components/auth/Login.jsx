import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { setAuthData } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isAllowedToLogin, setIsAllowedToLogin] = useState(false);

  const { email, password } = formData;

  useEffect(() => {
    if (email.length > 5 && password.length >= 8) {
      setIsAllowedToLogin(true);
    } else setIsAllowedToLogin(false);
  }, [email, password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
    if (data && data.userId && data.token) {
      const date = new Date();
      const newAuthData = {
        userId: data.userId,
        authToken: data.token,
        isAuth: true,
        expiresIn: date.setTime(date.getTime() + 3300000),
      };
      localStorage.setItem("authUser", JSON.stringify(newAuthData));
      setAuthData(newAuthData);
      navigate("/");
    }
  };

  return (
    <form className="auth_form" onSubmit={handleSubmit}>
      <label className="auth_form_label" htmlFor="email">
        Email
      </label>
      <input
        className="auth_form_input"
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={handleChange}
      />
      <label className="auth_form_label" htmlFor="password">
        Password
      </label>
      <input
        className="auth_form_input"
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={handleChange}
      />
      <button className="btn" type="submit" disabled={!isAllowedToLogin}>
        Login
      </button>
    </form>
  );
};
export default Login;
