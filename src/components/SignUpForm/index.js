import React, { Component } from "react";
import Header from "../Header";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import "./index.css";

const gender_list = ["male", "female"];

class SignUpForm extends Component {
	state = {
		username: "",
		name: "",
		password: "",
		gender: gender_list[0],
		location: "",
		errorMessage: "",
		showLoginError: false,
		showCreateUser: false,
		successMessage: "",
	};

	onSubmitFailure = (error) => {
		this.setState({ errorMessage: error, showLoginError: true });
	};

	onSuccessUserCreation = (message) => {
		this.setState({ successMessage: message, showCreateUser: true });
	};

	createNewUser = async (event) => {
		event.preventDefault();
		this.setState({ showLoginError: false, showCreateUser: false });
		const { username, name, password, gender, location } = this.state;
		const userDetails = { username, name, password, gender, location };
		const url = "https://react-user-login-test.herokuapp.com/register";
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(userDetails),
		};
		const response = await fetch(url, options);
		const data = await response.json();
		if (response.ok === true) {
			this.onSuccessUserCreation(data.user_created);
		} else {
			this.onSubmitFailure(data.error_msg);
		}
	};

	onChangeUsername = (event) => {
		this.setState({ username: event.target.value });
	};
	onChangeName = (event) => {
		this.setState({ name: event.target.value });
	};

	onChangePassword = (event) => {
		this.setState({ password: event.target.value });
	};

	onChangeGender = (event) => {
		this.setState({ gender: event.target.value });
	};

	onChangeLocation = (event) => {
		this.setState({ location: event.target.value });
	};

	render() {
		const {
			username,
			name,
			password,
			gender,
			location,
			showLoginError,
			errorMessage,
			showCreateUser,
			successMessage,
		} = this.state;
		const jwtToken = Cookies.get("jwt_token");
		if (jwtToken !== undefined) {
			return <Redirect to='/' />;
		}
		return (
			<div>
				<Header />
				<h1 className='signup-label'>Signup For Free</h1>
				<div className='create-user-container'>
					<form
						onSubmit={this.createNewUser}
						className='create-user-form-container'
					>
						<div className='login-user-field-container'>
							<label className='login-input-label' htmlFor='username'>
								Username
							</label>
							<input
								type='text'
								id='username'
								placeholder='Username'
								className='input-field'
								onChange={this.onChangeUsername}
								value={username}
							/>
						</div>
						<div className='login-user-field-container'>
							<label className='login-input-label' htmlFor='name'>
								Name
							</label>
							<input
								type='text'
								id='name'
								placeholder='name'
								className='input-field'
								onChange={this.onChangeName}
								value={name}
							/>
						</div>
						<div className='login-user-field-container'>
							<label className='login-input-label' htmlFor='password'>
								Password
							</label>
							<input
								type='password'
								id='password'
								placeholder='password'
								className='input-field'
								onChange={this.onChangePassword}
								value={password}
							/>
						</div>
						<p className='login-input-label gender-heading'>Gender</p>
						<div className='login-user-field-container gender-container'>
							<label
								className='login-input-label gender-label'
								htmlFor='male'
							>
								Male
							</label>
							<input
								type='radio'
								id='male'
								placeholder='gender'
								className='input-field radio'
								checked={gender === gender_list[0]}
								value={gender_list[0]}
								name='gender'
								onChange={this.onChangeGender}
							/>
							<label
								className='login-input-label gender-label'
								htmlFor='female'
							>
								Female
							</label>
							<input
								type='radio'
								id='female'
								placeholder='gender'
								className='input-field radio'
								checked={gender === gender_list[1]}
								value={gender_list[1]}
								name='gender'
								onChange={this.onChangeGender}
							/>
						</div>
						<div className='login-user-field-container'>
							<label className='login-input-label' htmlFor='location'>
								Location
							</label>
							<input
								type='text'
								id='location'
								placeholder='location'
								className='input-field'
								onChange={this.onChangeLocation}
								value={location}
							/>
						</div>
						<div className='signup-button-container'>
							<button
								type='submit'
								className='login-submit-button signup-button'
							>
								Signup
							</button>
							{showLoginError && (
								<p className='login-error-message'>{errorMessage}</p>
							)}
							{showCreateUser && (
								<p className='create-user-success-message'>
									{successMessage}
								</p>
							)}
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default SignUpForm;
