import { useState } from 'react';
import { useNavigate } from 'react-router';
import './RegisterForm.css';

function RegisterForm() {

	const [formData, setFormData] = useState({ email: "", password: "" });
	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:8080/api/registerUser", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			await response.json();

			if (response.ok) {
				navigate("/");
			} 
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return <>
		<div className='register-main-container'>
			<div className="register-illustration-container">
				<img className='register-illustration' src="/register-form-illustration.png" alt="" />
			</div>

			<div className="register-form-container">
				<div className="register-shopper-logo-container">
					<img className='register-shopper-logo' src="/shopper-logo.jpg" alt="" />
				</div>

				<form className='register-form' onSubmit={handleSubmit}>
					<div className='register-email-container'>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							id="email"
							required
							placeholder="Digite seu email"
							value={formData.email}
							onChange={handleChange}
						/>
					</div>

					<div className='register-password-container'>
						<label htmlFor="password">Senha</label>
						<input
							type="password"
							name="password"
							id="password"
							required
							placeholder="Digite sua senha"
							value={formData.password}
							onChange={handleChange}
						/>
					</div>

					<div className="button-register-container">
						<button className='button-register' type="submit">
							Criar conta
						</button>
					</div>

				</form>
			</div>
		</div>
	</>;
}

export default RegisterForm;