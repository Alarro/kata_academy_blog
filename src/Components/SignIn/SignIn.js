import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import classnames from "classnames";

import { logIn } from "../../Services/Services";

import classes from "./SignIn.module.scss";

function SignIn({ state, logIn }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (user) => {
		user = {
			user: {
				email: user.email,
				password: user.password,
			},
		};
		logIn(user);
	};

	let emailInput = classnames(classes.inputField, {[classes.inputWrong] : errors.email});
	let passwordInput = classnames(classes.inputField, {[classes.inputWrong] : errors.password});

	return (
		<form className={classes.signIn} onSubmit={handleSubmit(onSubmit)}>
			<header className={classes.signInHeader}>Sign In</header>
			<div>
				<span className={classes.inputSign}>Email address</span>
				<input
					className={emailInput}
					placeholder={"Email address"}
					{...register("email", {
						required: "Поле обязательно для заполнения",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: "Адрес введён некорректно",
						},
					})}
				/>
				<p>{errors.email?.message}</p>
			</div>
			<div>
				<span className={classes.inputSign}>Password</span>
				<input
					placeholder={"Password"}
					className={passwordInput}
					type='password'
					{...register("password", {
						required: "Поле обязательно для заполнения",
						minLength: {
							value: 6,
							message: "Минимум 6 символов",
						},
						maxLength: {
							value: 40,
							message: "Максимум 40 символов",
						},
					})}
				/>
				<p>{errors.password?.message}</p>
				<p>
					{state.errors &&
            `Email or password ${state.errors["email or password"]}`}
				</p>
			</div>
			<div className={classes.signUp__footer}>
				<button className={classes.btnLogin}>Login</button>
				<span className={classes.footerCaption}>
          Don’t have an account?{" "}
					<Link to='/sign-up/' className={classes.signInFooter__a}>
            Sign Up
					</Link>
				</span>
			</div>
		</form>
	);
}

const mapStateProps = (state) => ({
	state,
});

const mapDispatchToProps = (dispatch) => ({
	logIn: (user) => dispatch(logIn(user)),
});

export default connect(mapStateProps, mapDispatchToProps)(SignIn);