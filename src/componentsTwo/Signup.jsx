import React, {useState, useEffect} from "react";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import styles from "../cssStyle/Login.module.css";
import "../cssStyle/LoginGlobal.css";
import { Link } from "react-router-dom";

function Signup(props) {

	// useEffect(() => {
	// 	axios.post("http://localhost:8080/register",{
	// 		body: user
	// 	})
	// },[])
	const navigate = useNavigate();

	const [user, setUser] = useState({
		name:"",
		username:"",
		password:""
	})

	function userUp(event){
		const {name, value} = event.target;
		setUser((prevData) => {
			return {
				...prevData,
				[name]: value
			}
		})
	}

	function signUp(event){
			axios.post("http://localhost:8080/register",{
			body: user
		}).then((res) => {
			// console.log({message: "signup done fe"});
			console.log(res.message);
		}).catch(err => {
			console.log("signup error");
			console.log(err);
		})
		// props.userSignUp(user);
		setUser({
			name:"",
		    username:"",
		    password:""
		})
		event.preventDefault();
	}

	async function gAuth(){
		const gUser = await axios.get("http://localhost:8080/auth/google");
		props.checkAccount(gUser.data);
		navigate("/keeper");
	}

    return(
        <div className={styles["form-container"] + " " + styles["sign-up-container"]}>
		<form className="formLogin" action="#">
			<h1 className="h1Login">Create Account</h1>       
			<div className={styles["social-container"]}>
				<a href="http://localhost:8080/auth/google" /*onClick={gAuth}*/ className={styles.social}><i className={styles.fab + " " + styles["fa-google-plus-g"]}><GoogleIcon/></i></a>
				<a href="#" className={styles.social}><i className={styles.fab + " " + styles["fa-facebook-f"]}><FacebookIcon/></i></a>
				<a href="#" className={styles.social}><i className={styles.fab + " " + styles["fa-linkedin-in"]}><LinkedInIcon/></i></a>
			</div>
			<span className="spanLogin">or use your email for registration</span>
			<input className="inputLogin" onChange={userUp} name="name" type="text" placeholder="Name" />
			<input className="inputLogin" onChange={userUp} name="username" type="email" placeholder="Email" />
			<input className="inputLogin" onChange={userUp} name="password" type="password" placeholder="Password" />
			<button className="buttonLogin" onClick={signUp} > Sign Up </button>
			
		</form>
	</div>
    );
}

export default Signup;