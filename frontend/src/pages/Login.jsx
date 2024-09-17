import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/layouts/auth-layout";
import { useMutation } from "@tanstack/react-query";
import authApi from "../api/auth";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import Loader from "../components/misc/loader";

const Login = () => {
	const navigate = useNavigate();
	const { login } = useAuth();

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

	const loginUser = useMutation({
		mutationFn: (data) => {
			return authApi.loginUser(data);
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		const form_data = new FormData();
		form_data.append("email", formData.email);
		form_data.append("password", formData.password);

		loginUser.mutate(
			{
				email: formData.email,
				password: formData.password,
			},
			{
				onSuccess(data) {
					login(data);
					toast.success("Login successful");
					navigate("/");
				},
				onError(error) {
					toast.error(error.message);
				},
			}
		);
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

				<form className="flex flex-col gap-4 w-full max-w-[354px]">
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
					{loginUser.isPending ? (
						<div className="mx-auto mt-4">
							<Loader />
						</div>
					) : (
						<button
							onClick={handleSubmit}
							className="rounded py-3 text-base bg-default w-full font-bold mt-[26px] mb-7 text-white"
						>
							Login
						</button>
					)}
				</form>
			</>
		</AuthLayout>
	);
};

export default Login;
