import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {

    const navigate = useNavigate();

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

            // JWT token save
            localStorage.setItem(
                "jwtToken",
                response.data.token
            );

            // User information save
            localStorage.setItem(
                "user",
                JSON.stringify({
                    email: formData.email
                })
            );

            alert(response.data.message);

            navigate("/");

        } catch (error) {

            console.log(error);

            if (error.response?.data) {
                alert(
                    error.response.data.message ||
                    error.response.data
                );
            } else {
                alert("Login Failed");
            }
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
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    );
}

export default Login;