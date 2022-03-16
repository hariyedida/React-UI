import "./index.css";
import React, { Component } from "react";
import ReactFileReader from "react-file-reader";
import Header from "../Header";
import UserData from "../UserData";
import { Bars } from "react-loader-spinner";
import Cookies from "js-cookie";

const apiStatusConstants = {
	initial: "INITIAL",
	success: "SUCCESS",
	failure: "FAILURE",
	inProgress: "IN_PROGRESS",
};

class Home extends Component {
	state = {
		inputFileData: [],
		fetchedData: [],
		apiStatus: apiStatusConstants.initial,
		error: "",
		displayError: false,
	};

	componentDidMount = () => {
		this.getDataFromDb();
	};

	postDataToDb = async () => {
		const { inputFileData } = this.state;
		const dataTodb = { userData: [...inputFileData] };
		this.setState({
			apiStatus: apiStatusConstants.inProgress,
		});
		const jwtToken = Cookies.get("jwt_token");
		const apiUrl = `https://react-user-login-test.herokuapp.com/user-table/`;
		const options = {
			method: "POST",
			headers: {
				Authorization: `Bearer ${jwtToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(dataTodb),
		};
		const response = await fetch(apiUrl, options);
		if (response.ok) {
			this.setState(
				{ apiStatus: apiStatusConstants.success },
				this.getDataFromDb
			);
		} else {
			this.setState({
				error: response.body.error_msg,
				apiStatus: apiStatusConstants.failure,
			});
		}
	};

	getDataFromDb = async () => {
		const jwtToken = Cookies.get("jwt_token");
		const apiUrl = `https://react-user-login-test.herokuapp.com/user-data/`;
		const options = {
			headers: {
				Authorization: `Bearer ${jwtToken}`,
				"Content-Type": "application/json",
			},
			method: "GET",
		};
		const response = await fetch(apiUrl, options);
		if (response.ok) {
			const fetchedData = await response.json();
			const updateData = fetchedData.userData.map((eachData) => ({
				id: eachData.id,
				userId: eachData.user_id,
				body: eachData.body,
				title: eachData.title,
			}));
			this.setState({
				apiStatus: apiStatusConstants.success,
				fetchedData: [...updateData],
			});
		} else {
			this.setState({ apiStatus: apiStatusConstants.failure });
		}
	};

	renderDataFromDb = () => {
		const { fetchedData } = this.state;
		return fetchedData.length > 0 ? (
			<ul className='ul-list'>
				{fetchedData.map((eachData) => (
					<UserData userData={eachData} key={eachData.id} />
				))}
			</ul>
		) : (
			<>
				<h1 className='no-data-text'>No data to display</h1>
				<h2 className='no-data-text'>Upload a file to view</h2>
			</>
		);
	};

	deleteData = async () => {
		const jwtToken = Cookies.get("jwt_token");
		this.setState({ apiStatus: apiStatusConstants.inProgress });
		console.log("Delete");
		const url = "https://react-user-login-test.herokuapp.com/delete-data";
		const options = {
			headers: {
				Authorization: `Bearer ${jwtToken}`,
				"Content-Type": "application/json",
			},
			method: "DELETE",
		};
		const response = await fetch(url, options);
		if (response.ok) {
			this.setState(
				{ apiStatus: apiStatusConstants.success },
				this.getDataFromDb
			);
		} else {
			this.setState(
				{ apiStatus: apiStatusConstants.failure },
				this.getDataFromDb
			);
		}
	};

	handleFiles = (files) => {
		const reader = new FileReader();
		reader.readAsText(files[0]);
		reader.onload = function (e) {
			localStorage.setItem("jsonData", e.target.result);
		};
		this.setState(
			{
				inputFileData: JSON.parse(localStorage.getItem("jsonData")),
			},
			this.postDataToDb
		);
	};

	renderFailureView = () => (
		<div className='failure-container'>
			<img
				className='failure-img'
				src='https://res.cloudinary.com/hariy/image/upload/v1647439409/Financepeer/failure-img_mopczn.png'
				alt='not-found'
			/>
			<h1>Failed</h1>
			<button onClick={this.getDataFromDb} type='button' className='btn'>
				Retry
			</button>
		</div>
	);

	renderLoadingView = () => (
		<div className='loader-container'>
			<Bars color='#164687' height='50' width='50' />
		</div>
	);

	renderUserInput = () => {
		const { apiStatus } = this.state;
		switch (apiStatus) {
			case apiStatusConstants.success:
				return this.renderDataFromDb();
			case apiStatusConstants.failure:
				return this.renderFailureView();
			case apiStatusConstants.inProgress:
				return this.renderLoadingView();
			default:
				return null;
		}
	};

	render() {
		const { fetchedData } = this.state;
		return (
			<div className='home-container'>
				<Header />
				{fetchedData.length > 0 ? (
					<button
						onClick={this.deleteData}
						className='delete-button'
						type='button'
					>
						Delete data
					</button>
				) : (
					<ReactFileReader
						fileTypes={[".json"]}
						handleFiles={this.handleFiles}
					>
						<button className='btn'>Upload file</button>
					</ReactFileReader>
				)}

				<div className='data-container'>{this.renderUserInput()}</div>
			</div>
		);
	}
}

export default Home;
