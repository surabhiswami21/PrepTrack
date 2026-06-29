import { useState } from "react";
import { loginUser } from "../services/authService";

function Login() {

    const [formData, setFormData] = useState({
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

        const response = await loginUser(formData);

        alert(response.data);

    } catch (error) {

        alert("Login Failed");

        console.log(error);

    }
};

    return (

        <div className="container">

            <h1>PrepTrack</h1>

            <h3>Login</h3>

            <form onSubmit={handleSubmit}>

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
                    Login
                </button>

            </form>

        </div>
    );
}

export default Login;