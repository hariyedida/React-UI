import "./index.css";

import React from "react";

function UserData(props) {
	const { userData } = props;
	return (
		<li className='li-items'>
			<p className='user-data-label'>
				Id: <span className='user-data'>{userData.id}</span>
			</p>
			<p className='user-data-label'>
				UserId: <span className='user-data'>{userData.userId}</span>
			</p>
			<p className='user-data-label'>
				Title:<span className='user-data'> {userData.title}</span>
			</p>
			<p className='user-data-label'>
				Body: <span className='user-data'>{userData.body}</span>
			</p>
		</li>
	);
}

export default UserData;
