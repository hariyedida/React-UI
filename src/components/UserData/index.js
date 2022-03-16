import "./index.css";

import React from "react";

function UserData(props) {
	const { userData } = props;
	return (
		<li className='li-items'>
			<p>Id: {userData.id}</p>
			<p>UserId: {userData.userId}</p>
			<p>Title: {userData.title}</p>
			<p>Body: {userData.body}</p>
		</li>
	);
}

export default UserData;
