import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const navigate = useNavigate();

  const login = async (email, password) => {
    const fetchOpts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    };
    const response = await fetch("http://localhost:8000/auth/login", fetchOpts);
    if (response.status !== 200) return;

    const data = await response.json();

    const expiration = new Date();
    expiration.setDate(expiration.getDate() + 90);
    setCookie("jwt", data.token, { path: "/", expires: expiration });

    setUser(data.user);

    navigate("/home");
  };

  const signup = async (newUser) => {
    const body = newUser;
    const fetchOpts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(
      "http://localhost:8000/auth/signup",
      fetchOpts,
    );
    if (response.status !== 201) return;

    const data = await response.json();

    const expiration = new Date();
    expiration.setDate(expiration.getDate() + 90);
    setCookie("jwt", data.token, { path: "/", expires: expiration });

    setUser(data.user);

    navigate("/home");
  };

  const logout = async () => {
    if (!user) return;

    removeCookie("jwt", { path: "/" });
    setUser(null);
    navigate("/");
  };

  const authorize = async (token) => {
    const fetchOpts = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("http://localhost:8000/auth", fetchOpts);
    if (response.status === 200) return;

    const data = await response.json();
    setUser(data.user);

    navigate("/home");
  };

  useEffect(() => {
    if (cookies.jwt) authorize(cookies.jwt);
  }, [cookies]);

  return (
    <UserContext.Provider value={{ user, logout, login, signup }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
