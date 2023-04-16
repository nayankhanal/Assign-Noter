import React, {useState, useEffect} from "react";
import styles from "../cssStyle/Login.module.css";
import "../cssStyle/LoginGlobal.css";

function Left(props) {

	function exchange(){
		props.changeFun("")
}

    return (
        <div className={styles["overlay-panel"] + " " + styles["overlay-left"]}>
				<h1 className="h1Login">Welcome Back!</h1>
				<p className="pLogin">To keep connected with us please login with your personal info</p>
				<button className={styles.ghost + " " + "buttonLogin"} idName={styles.signIn} onClick={exchange}>Log In</button>
			</div>
    );
}

export default Left;

{/* <Routes>
      <Route exact path="/" component={Login} />
      <Route path="/keep" component={App} />
   </Routes> */}