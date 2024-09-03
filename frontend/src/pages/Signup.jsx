import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        role: "customer",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/auth/signup", formData);
            console.log(response.data);

            navigate("/login");
        } catch (error) {
            console.error("There was an error during signup", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-slate-300 flex flex-col gap-4 max-w-96 p-8">
            <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Firstname"
                required
            />
            <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Lastname"
                required
            />
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />

            <label htmlFor="role">Select Role:</label>
            <select name="role" value={formData.role} onChange={handleChange}>
                <option value="admin">Admin</option>
                <option value="artisan">Artisan</option>
                <option value="customer">Customer</option>
            </select>

            <button type="submit">Sign Up</button>
        </form>
    );
};

export default Signup;
