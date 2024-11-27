import { useState } from 'react';
import { useNavigate } from 'react-router';
import './LoginForm.css';

function LoginForm() {

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
			const response = await fetch("http://localhost:8080/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const result = await response.json();

			if (response.ok) {
				sessionStorage.setItem("userId", result.userId);
				navigate("/menu");
			} else {
				alert(result.message);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return <>
		<div className='login-form-main'>
			<div className="login-illustration-container">
				<img className='login-illustration' src="/register-form-illustration.png" alt="" />
			</div>

			<div className="login-form-container">
				<div className="shopper-logo-container">
					<img className='shopper-logo' src="/shopper-logo.jpg" alt="" />
				</div>

				<form className='login-form' onSubmit={handleSubmit}>
					<div className='login-email-container'>
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

					<div className='login-password-container'>
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

					<div className="button-login-container">
						<button className='button-login' type="submit">
							Entrar
						</button>
					</div>
				</form>

				<div className="register">
					<p>ou</p>
					<p>Primeira vez? <a href="/register">Criar uma conta</a></p>
				</div>
			</div>
		</div>
	</>;
}

export default LoginForm;