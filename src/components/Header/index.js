import React from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

function Header(props) {
	const onClickLogout = () => {
		const { history } = props;
		Cookies.remove("jwt_token");
		localStorage.removeItem("userDetails");
		history.replace("/login");
	};
	const jwtToken = Cookies.get("jwt_token");

	const { username } =
		jwtToken !== undefined && JSON.parse(localStorage.getItem("userDetails"));

	return (
		<div className='header-container'>
			<Link to='/'>
				<img
					className='web-logo'
					src='https://d18gf9zcxp8qg0.cloudfront.net/newWebsite/Financepeer_new_logo.png'
					alt='web-logo'
				/>
			</Link>
			{jwtToken !== undefined ? (
				<>
					<h1 className='welcome-label'>Welcome {username} </h1>
					<button
						onClick={onClickLogout}
						type='button'
						className='logout-button'
					>
						Log out
					</button>
				</>
			) : (
				<Link to='/login'>
					<button className='header-login-button' type='button'>
						Login
					</button>
				</Link>
			)}
		</div>
	);
}

export default withRouter(Header);
