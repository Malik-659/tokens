import { joinPaths } from "@remix-run/router";
import axios from "axios";
import React, { createContext, useState } from "react";
import { json } from "react-router-dom";

export const authContext = createContext();

const API = "http://34.173.115.25/api/v1";
const AuthContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRegister(formData, navigate) {
    setLoading(true);
    try {
      const res = await axios.post(`${API}/account/register/`, formData);
      navigate("/register-success");
    } catch (error) {
      setError(Object.values(err.pesponse.data).flat(2));
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(formData, email, navigate) {
    try {
      const res = await axios.post(`${API}/account/login/`, formData);
      localStorage.setItem("tokens", JSON.stringify(res.data));
      localStorage.setItem("email", email);
      setCurrentUser(email);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError([err.response.data.detail]);
    } finally {
    }
  }

  async function checkAuth() {
    setLoading(true);
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const Authorization = `Bearer ${tokens.access}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      const res = await axios.post(
        `${API}/account/token/refresh/`,
        {
          refrech: tokens.refresh,
        },
        config
      );
      localStorage.setItem(
        "tokens",
        JSON.stringify({ access: res.data.access, refresh: tokens.refresh })
      );
      const email = localStorage.getItem("email");
      setCurrentUser(email);
    } catch (error) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <authContext.Provider
      value={{
        currentUser,
        error,
        loading,
        setError,
        handleRegister,
        handleLogin,
        checkAuth,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContext;
