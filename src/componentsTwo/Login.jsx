import React, {useState, useEffect} from "react";
import Signup from "./Signup";
import Signin from "./Signin";
import Left from "./Left";
import Right from "./Right";
import App from "../components/App";

function Login() {

    // useEffect(() => {
	// 	axios.post("http://localhost:8080/login",{
	// 		body: userInData
	// 	})
	// },[])

    // useEffect(() => {
	// 	axios.post("http://localhost:8080/register",{
	// 		body: userUpData
	// 	})
	// },[])

    const [userUpData, setUserUpData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [userInData, setUserInData] = useState({
		email: "",
		password: ""
	});

    function userLog(userData) {
		setUserInData(() => {
            return {
                email: userData.email,
                password: userData.password
            }
        })
	}

    function userSign(signData){
        setUserUpData(() => {
            return {
                name: signData.name,
                email: signData.email,
                password: signData.password
            }
        })
    }

    const [exchangeCss, setExchangeCss] = useState();

    function changing(css){
        setExchangeCss(css);
    }

    return(
        <div>

<div className={ exchangeCss + " container"}  idName="container">
	<Signup
        userSignUp={userSign}
    />
	<Signin
        userLogIn={userLog}
    />
	<div className="overlay-container">
		<div className="overlay">
            <Left
                changeFun={changing}
            />
            <Right
                changeFun={changing}
            />
		</div>
	</div>
</div>

        </div>

    );
}

export default Login;