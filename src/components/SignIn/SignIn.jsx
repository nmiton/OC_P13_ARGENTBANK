import { useRef } from "react";
import { connect } from "react-redux";
import { loginRequest, loginSuccess, loginFailure } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types, react-refresh/only-export-components
const SignIn = ({ loginRequest, loginSuccess, loginFailure }) => {
	const inputUsernameRef = useRef(null);
	const inputPasswordRef = useRef(null);
	const checkboxRememberRef = useRef(null);
	const navigate = useNavigate();

	const handleSubmitForm = async (e) => {
		e.preventDefault();

		const username = inputUsernameRef.current.value.trim();
		const password = inputPasswordRef.current.value;

		const body = {
			email: username,
			password: password,
		};

		loginRequest();

		try {
			const response = await fetch("http://localhost:3001/api/v1/user/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});

			const result = await response.json();

			if (response.status === 200) {
				loginSuccess(null, result.body.token);
				navigate("/profile");
			} else {
				loginFailure(result.message);
			}
		} catch (error) {
			loginFailure(error.message);
		}
	};

	return (
		<main className="main bg-dark">
			<section className="sign-in-content">
				<i className="fa fa-user-circle sign-in-icon"></i>
				<h1>Sign In</h1>
				<form onSubmit={handleSubmitForm}>
					<div className="input-wrapper">
						<label htmlFor="username">Username</label>
						<input type="text" id="username" ref={inputUsernameRef} />
					</div>
					<div className="input-wrapper">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" ref={inputPasswordRef} />
					</div>
					<div className="input-remember">
						<input type="checkbox" id="remember-me" ref={checkboxRememberRef} />
						<label htmlFor="remember-me">Remember me</label>
					</div>
					<button type="submit" className="sign-in-button">
						Sign In
					</button>
				</form>
			</section>
		</main>
	);
};

const mapDispatchToProps = {
	loginRequest,
	loginSuccess,
	loginFailure,
};

export default connect(null, mapDispatchToProps)(SignIn);
