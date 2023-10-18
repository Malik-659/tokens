import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSave() {
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
  }
  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder=""
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder=""
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => handleSave()}>Log In</button>
    </div>
  );
};

export default Login;
