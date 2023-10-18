import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function handleSave() {
    if (!email.trim() || !password.trim() || !passwordConfirm.trim()) {
      alert("emply!");
      return;
    } else {
      let formData = new FormData()
      formData.append("email", email)
      formData.append("password", password)
      formData.append("passwordConfirm", passwordConfirm)
    }

  }
  return (
    <div>
      <h1>Register</h1>
      <input type="text" placeholder="" />
      <input type="text" placeholder="" />
      <input type="text" placeholder="" />
      <button>Register</button>
    </div>
  );
};

export default Register;
