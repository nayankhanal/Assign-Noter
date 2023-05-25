import React, { useState, useEffect } from "react";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import styles from "../cssStyle/Login.module.css";
import "../cssStyle/LoginGlobal.css";

function Signin(props) {

	//     useEffect(() => {
	// 	axios.post("http://localhost:8080/login",{
	// 		body: userInData
	// 	})
	// },[])
	const navigate = useNavigate();

	const [userInData, setUserInData] = useState({
		username: "",
		password: ""
	});

	function LogIn(event) {
		axios.post("http://localhost:8080/login", {
			username: userInData.username,
			password: userInData.password
		}).then((res) => {
			console.log("login done");
			console.log(res.data);
			props.checkAccount(res.data);
			navigate("/keeper");
		}).catch(err => {
			console.log("login error");
			console.log(err);
		})
		// props.userLogin(userInData);
		setUserInData({
			username: "",
			password: ""
		});
		event.preventDefault();
	}

	function userIn(event) {
		const { name, value } = event.target;
		setUserInData((prevData) => {
			return {
				...prevData,
				[name]: value
			}
		})
	}

	async function gAuth(){
		// window.location.href = "http://localhost:8080/auth/google";
		window.open("http://localhost:8080/auth/google","_self");
		const gUser = await axios.get("http://localhost:8080/auth/google/callback");
		props.checkAccount(gUser.data);
		navigate("/keeper");
	}

	useEffect(() => {
		console.log("trying to get data0");
		async () =>{
			console.log("trying to get data1");
			const gogUser = await axios.get("http://localhost:8080/auth/google/callback",{
				withCredentials: true,
			  });
			  console.log("trying to get data2");
			  console.log(gogUser);
			props.checkAccount(gogUser.data);
			console.log("trying to get data3");
			navigate("/keeper");
			console.log("trying to get data4");
		}
	},[])


	return (
		<div className={styles["form-container"] + " " + styles["sign-in-container"]}>
			<form className="formLogin" action="#">
				<h1 className="h1Login">Log in</h1>        
				<div className={styles["social-container"]}>
					<a href="http://localhost:8080/auth/google" /*onClick={gAuth}*/ className={styles.social}><i className={styles.fab + " " + styles["fa-google-plus-g"]}><GoogleIcon /></i></a>
					<a href="#" className={styles.social}><i className={styles.fab + " " + styles["fa-facebook-f"]}><FacebookIcon /></i></a>
					<a href="#" className={styles.social}><i className={styles.fab + " " + styles["fa-linkedin-in"]}><LinkedInIcon /></i></a>
				</div>
				<span className="spanLogin">or create your own account</span>
				<input className="inputLogin" onChange={userIn} name="username" value={userInData.email} type="email" placeholder="Email" />
				<input className="inputLogin" onChange={userIn} name="password" value={userInData.password} type="password" placeholder="Password" />
				<a className="aLogin" href="#">Forgot your password?</a>
				<button className="buttonLogin" onClick={LogIn}>Log In</button>
				{/* <button onclick={gAuth}>Login Alt</button> */}
			</form>
			
		</div>
	);
}

export default Signin;