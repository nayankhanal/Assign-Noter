import React, {useState, useEffect} from "react";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import axios from "axios";
import { Link } from "react-router-dom";

function Signup(props) {

	// useEffect(() => {
	// 	axios.post("http://localhost:8080/register",{
	// 		body: user
	// 	})
	// },[])

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
			console.log(res);
		}).catch(err => {
			console.log("signup error");
			console.log(err);
		})
		props.userSignUp(user);
		setUser({
			name:"",
		    username:"",
		    password:""
		})
		event.preventDefault();
	}

    return(
        <div className="form-container sign-up-container">
		<form action="#">
			<h1>Create Account</h1>
			<div className="social-container">
				<a href="#" className="social"><i className="fab fa-facebook-f"><GoogleIcon/></i></a>
				<a href="#" className="social"><i className="fab fa-google-plus-g"><FacebookIcon/></i></a>
				<a href="#" className="social"><i className="fab fa-linkedin-in"><LinkedInIcon/></i></a>
			</div>
			<span>or use your email for registration</span>
			<input onChange={userUp} name="name" type="text" placeholder="Name" />
			<input onChange={userUp} name="username" type="email" placeholder="Email" />
			<input onChange={userUp} name="password" type="password" placeholder="Password" />
			<button onClick={signUp} > Sign Up </button>
			
		</form>
	</div>
    );
}

export default Signup;