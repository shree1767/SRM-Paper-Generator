import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const navigate = useNavigate();

  const logout = async () => {
    if (!user) return;

    removeCookie("jwt", { path: "/" });
    setUser(null);
  };

  const login = async (email, password) => {
    const fetchOpts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password
      })
    };
    const response = await fetch("http://localhost:8000/auth/login", fetchOpts);

    const data = await response.json();

    const expiration = new Date();
    expiration.setDate(expiration.getDate() + 90);
    setCookie('jwt', data.token, {path: '/', expires: expiration});

    console.log(response.status);

    
    if (response.status === 200) return true;
    return false;
  }

	const authorize = async (token) => { 
    const fetchOpts = {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch("http://localhost:8000/auth", fetchOpts);
    const data = await response.json();
		setUser(data.user);

    if (response.status === 200) navigate("/home");

    return;
  }

  useEffect(() => { 
    if (cookies.jwt) authorize(cookies.jwt);
	}, [])
	
	return (
		<UserContext.Provider value={{user, logout, login}}>
			{children}
		</UserContext.Provider>
	);
}

export default UserProvider;