import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../../api/auth";
import toast from "react-hot-toast";
import AuthLayout from "../../../components/layouts/auth-layout";
import Loader from "../../../components/misc/loader";

function JoinAdminTeam() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [step, setStep] = useState(1);

	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const togglePassword = (e) => {
		e.preventDefault();
		setShowPassword(!showPassword);
	};

	const toggleConfirmPassword = (e) => {
		e.preventDefault();
		setShowConfirmPassword(!showConfirmPassword);
	};

	const registerUser = useMutation({
		mutationFn: (data) => {
			return authApi.registerUser(data);
		},
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

        registerUser.mutate({
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.username,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            role: "admin",
        }, {
			onSuccess() {
				toast.success("Sign up successful, please log in");
				navigate("/login");
			},
			onError(error) {
				toast.error(error.message);
			},
		});
	};
	

	return (
		<AuthLayout>
			<>
				<div className="flex flex-col items-center mb-10">
					<div className="mb-8">
						<img src="/assets/svgs/customer/company-logo.svg" alt="Logo" />
					</div>
					<h3 className="text-[32px] leading-[120%] font-bold">
						Join <span className="text-default">Galileo</span> Admin
					</h3>
				</div>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 w-[80%]">
					{step === 1 ? (
						<div className="flex flex-col w-full gap-1">
							<input
								type="text"
								name="firstName"
								value={formData.firstName}
								onChange={handleChange}
								placeholder="Firstname"
								required
								className="px-4 py-[15.5px] rounded-lg border border-[#EAECF0]"
							/>
							<input
								type="text"
								name="lastName"
								value={formData.lastName}
								onChange={handleChange}
								placeholder="Lastname"
								required
								className="px-4 py-[15.5px] rounded-lg border border-[#EAECF0]"
							/>
							<input
								type="text"
								name="username"
								value={formData.username}
								onChange={handleChange}
								placeholder="Username"
								required
								className="px-4 py-[15.5px] rounded-lg border border-[#EAECF0]"
							/>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="Email"
								required
								className="px-4 py-[15.5px] rounded-lg border border-[#EAECF0]"
							/>
							<button
								type="submit"
								className="rounded py-3 text-base bg-default w-full font-bold mt-[26px] mb-7 text-white"
								onClick={() => setStep(2)}
							>
								Continue
							</button>
							<h3 className="text-center">
								Already have an account?{" "}
								<Link to="/login" className="underline hover:no-underline">
									Login
								</Link>{" "}
							</h3>
						</div>
					) : null}

					{step === 2 ? (
						<div>
							<button className="mb-6" onClick={() => setStep(1)}>
								{"<"} Back
							</button>
							<div className="flex justify-between gap-2 rounded-lg border border-[#EAECF0] mb-1">
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									value={formData.password}
									onChange={handleChange}
									placeholder="Password"
									required
									className="w-full px-4 py-[15.5px]"
								/>
								<button onClick={togglePassword} className="pr-4">
									{showPassword ? (
										<img
											src="/assets/svgs/customer/hide.svg"
											className="w-6 h-6"
											alt="Hide Password"
										/>
									) : (
										<img
											src="/assets/svgs/customer/show.svg"
											className="w-6 h-6"
											alt="Show Password"
										/>
									)}
								</button>
							</div>
							<div className="flex justify-between gap-2 rounded-lg border border-[#EAECF0] mb-1">
								<input
									type={showConfirmPassword ? "text" : "password"}
									name="confirmPassword"
									value={formData.confirmPassword}
									onChange={handleChange}
									placeholder="Confirm Password"
									required
									className="w-full px-4 py-[15.5px]"
								/>
								<button onClick={toggleConfirmPassword} className="pr-4">
									{showConfirmPassword ? (
										<img
											src="/assets/svgs/customer/hide.svg"
											className="w-6 h-6"
											alt="Hide Password"
										/>
									) : (
										<img
											src="/assets/svgs/customer/show.svg"
											className="w-6 h-6"
											alt="Show Password"
										/>
									)}
								</button>
							</div>
							{registerUser.isPending ? (
								<Loader containerClass="w-8 h-8" />
							) : (
								<button
									type="submit"
									className="rounded py-3 text-base bg-default w-full font-bold mt-[26px] mb-7 text-white"
								>
									Register admin
								</button>
							)}
						</div>
					) : null}
				</form>
			</>
		</AuthLayout>
	);
}

export default JoinAdminTeam;
