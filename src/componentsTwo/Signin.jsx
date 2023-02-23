import React, {useState, useEffect} from "react";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import axios from "axios";

function Signin(props) {

	//     useEffect(() => {
	// 	axios.post("http://localhost:8080/login",{
	// 		body: userInData
	// 	})
	// },[])

	const [userInData, setUserInData] = useState({
		username: "",
		password: ""
	});

	function LogIn(event){
			axios.post("http://localhost:8080/login",{
			userInData
		}).then((data) => {
			console.log("login done");
			console.log(data);
		}).catch(err => {
			console.log("login error");
			console.log(err);
		})
		props.userLogin(userInData);
		setUserInData({
			username: "",
		    password: ""
		});
		event.preventDefault();
	}

	function userIn(event) {
		const {name, value} = event.target;
		setUserInData((prevData) => {
			return {
				...prevData,
				[name]: value
			}
		})
	}

     
    return(
        <div className="form-container sign-in-container">
		<form action="#">
			<h1>Log in</h1>
			<div className="social-container">
				<a href="#" className="social"><i className="fab fa-facebook-f"><GoogleIcon/></i></a>
				<a href="#" className="social"><i className="fab fa-google-plus-g"><FacebookIcon/></i></a>
				<a href="#" className="social"><i className="fab fa-linkedin-in"><LinkedInIcon/></i></a>
			</div>
			<span>or create your own account</span>
			<input onChange={userIn} name="username" value={userInData.email} type="email" placeholder="Email" />
			<input onChange={userIn} name="password" value={userInData.password} type="password" placeholder="Password" />
			<a href="#">Forgot your password?</a>
			<button onClick={LogIn}>Log In</button>
		</form>
	</div>
    );
}

export default Signin;