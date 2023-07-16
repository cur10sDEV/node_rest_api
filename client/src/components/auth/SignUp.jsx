import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isAllowedToRegister, setIsAllowedToRegister] = useState(false);

  const { username, email, password } = formData;

  useEffect(() => {
    if (username.length > 5 && password.length >= 8) {
      setIsAllowedToRegister(true);
    } else setIsAllowedToRegister(false);
  }, [username, email, password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data.msg);
    if (data.msg === "success" && data.errors.length === 0) {
      navigate("/auth/login");
    }
  };

  return (
    <form className="auth_form" onSubmit={handleSubmit}>
      <label className="auth_form_label" htmlFor="username">
        Username
      </label>
      <input
        className="auth_form_input"
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={handleChange}
      />
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
      <button className="btn" type="submit" disabled={!isAllowedToRegister}>
        Register
      </button>
    </form>
  );
};
export default SignUp;
