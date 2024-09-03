import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate()
    
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        //   const form_data = new FormData()
        //   form_data.append('username', formData.username)
        //   form_data.append('password', formData.password)
        
        try {
            const response = await axios.post("http://localhost:8000/auth/login", formData);
            console.log(response.data);

            return navigate('/admin');
            // Handle successful signup (e.g., redirect to login)
        } catch (error) {
            console.error("There was an error during login", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-slate-300 flex flex-col gap-4 max-w-96 p-8">
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
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
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
