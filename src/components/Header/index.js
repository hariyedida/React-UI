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

	return (
		<div className='header-container'>
			<Link to='/'>
				<img
					className='web-logo'
					src='https://d18gf9zcxp8qg0.cloudfront.net/newWebsite/Financepeer_new_logo.png'
					alt='web-logo'
				/>
			</Link>

			<button
				onClick={onClickLogout}
				type='button'
				className='logout-button'
			>
				Log out
			</button>
		</div>
	);
}

export default withRouter(Header);
