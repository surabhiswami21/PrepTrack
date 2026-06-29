import { useState } from "react";
import { registerUser } from "../services/authService";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await registerUser(formData);

      alert(response.data);

      setFormData({
        name: "",
        email: "",
        password: ""
      });

    } catch (error) {

      alert("Registration Failed");

      console.log(error);

    }
  };
return (
  <div className="container">

  <h1>PrepTrack</h1>
<h3>Create Your Account</h3>

    <form onSubmit={handleSubmit}>

      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={formData.password}
        onChange={handleChange}
      />

      <button type="submit">
        Register
      </button>

    </form>

  </div>
);
  

}

export default Register;