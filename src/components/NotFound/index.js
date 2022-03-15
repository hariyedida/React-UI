import { Link } from "react-router-dom";

import "./index.css";

const NotFound = () => (
	<div className='rest-page-not-found-container'>
		<img
			src='https://res.cloudinary.com/hariy/image/upload/v1643000704/TastyKitchen/erroring_1_xijm9n.png'
			alt='not found'
		/>
		<div className='rest-page-not-found-desc-container'>
			<h1 className='rest-page-not-found-title'>Page Not Found</h1>
			<p className='rest-page-not-found-desc'>
				We are sorry, the page you requested could not be found. Please go
				back to the homepage
			</p>
			<Link to='/' className='rest-page-not-found-link'>
				<button type='button' className='rest-page-not-found-button'>
					Home Page
				</button>
			</Link>
		</div>
	</div>
);

export default NotFound;
