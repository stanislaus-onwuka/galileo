import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/layouts/auth-layout";
import { useMutation } from "@tanstack/react-query";
import authApi from "../api/auth";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import Loader from "../components/misc/loader";

const Signup = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [step, setStep] = useState(1);
	const { login } = useAuth();

	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		role: "customer",
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const registerUser = useMutation({
		mutationFn: (data) => {
			return authApi.registerUser(data);
		},
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		registerUser.mutate(formData, {
			onSuccess(data) {
				login(data);
				navigate("/");
			},
			onError(error) {
				toast.error(error.message);
			},
		});
	};

	return (
		<AuthLayout>
			<>
				<div className="flex flex-col items-center mb-[60px]">
					<div className="mb-10">
						<img src="/assets/svgs/customer/company-logo.svg" alt="Logo" />
					</div>
					<h3 className="text-[32px] leading-[120%] font-bold">
						Welcome to <span className="text-default">Galileo</span>
					</h3>
				</div>

				<form className="flex flex-col gap-4 p-8 w-[80%]">
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
						</div>
					) : null}

					{step === 2 ? (
						<div>
							<button className="mb-6" onClick={() => setStep(1)}>
								{"<"} Back
							</button>
							<div className="flex justify-between gap-2 px-4 py-[15.5px] rounded-lg border border-[#EAECF0] mb-1">
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									value={formData.password}
									onChange={handleChange}
									placeholder="Password"
									required
									className="w-full"
								/>
								<button onClick={() => setShowPassword(!showPassword)}>
									{showPassword ? (
										<img src="/assets/svgs/customer/hide.svg" alt="Hide Password" />
									) : (
										<img src="/assets/svgs/customer/show.svg" alt="Show Password" />
									)}
								</button>
							</div>
							<div className="flex justify-between gap-2 px-4 py-[15.5px] rounded-lg border border-[#EAECF0]">
								<input
									type={showConfirmPassword ? "text" : "password"}
									name="confirmPassword"
									value={formData.confirmPassword}
									onChange={handleChange}
									placeholder="Confirm Password"
									required
									className="w-full"
								/>
								<button onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
									{showConfirmPassword ? (
										<img src="/assets/svgs/customer/hide.svg" alt="Hide Password" />
									) : (
										<img src="/assets/svgs/customer/show.svg" alt="Show Password" />
									)}
								</button>
							</div>
							<button
								type="submit"
								className="rounded py-3 text-base bg-default w-full font-bold mt-[26px] mb-7 text-white disabled:bg-neutral-500"
								onClick={() => setStep(3)}
							>
								Continue
							</button>
						</div>
					) : null}

					{step === 3 ? (
						<div className="flex flex-col">
							<button className="mb-6 self-start" onClick={() => setStep(2)}>
								{"<"} Back
							</button>
							<label htmlFor="role">Select Role:</label>
							<select
								name="role"
								className="px-4 py-[15.5px] rounded-lg border border-[#EAECF0]"
								value={formData.role}
								onChange={handleChange}
							>
								<option value="supplier">Supplier</option>
								<option value="artisan">Artisan</option>
								<option value="customer">Customer</option>
							</select>

							{registerUser.isPending ? (
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
						</div>
					) : null}
				</form>
			</>
		</AuthLayout>
	);
};

export default Signup;
