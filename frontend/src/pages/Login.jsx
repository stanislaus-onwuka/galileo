import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import AuthLayout from "../components/layouts/auth-layout";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
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

        // try {
        //     const response = await axios.post("http://localhost:8000/auth/login", formData);
        //     console.log(response.data);

        //     return navigate("/admin");
        //     // Handle successful signup (e.g., redirect to login)
        // } catch (error) {
        //     console.error("There was an error during login", error);
        // }

        navigate("/");
    };

    return (
        <AuthLayout>
            <>
                <div className="flex flex-col items-center mb-[88px]">
                    <div className="mb-10">
                        <img src="/assets/svgs/customer/company-logo.svg" alt="Logo" />
                    </div>
                    <h3 className="text-[32px] leading-[120%] font-bold">Sign in to Galileo</h3>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-[354px]">
                    <input
                        type="email"
                        name="email"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        className="px-4 py-[15.5px] rounded-lg border border-[#EAECF0]"
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        className="px-4 py-[15.5px] rounded-lg border border-[#EAECF0]"
                    />
                    <button
                        type="submit"
                        className="rounded py-3 text-base bg-default w-full font-bold mt-[26px] mb-7 text-white"
                    >
                        Login
                    </button>
                </form>
            </>
        </AuthLayout>
    );
};

export default Login;
