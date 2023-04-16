import React, {useState, useEffect} from "react";
import styles from "../cssStyle/Login.module.css";
import "../cssStyle/LoginGlobal.css";

function Right(props) {

	function exchange(){
			props.changeFun("right-panel-active")
	}

    return (
        <div className={styles["overlay-panel"] + " " + styles["overlay-right"]}>
				<h1 className="h1Login">Hello, Friend!</h1>
				<p className="pLogin">Enter your personal details and start journey with us</p>
				<button className={styles.ghost + " " + "buttonLogin"} idName={styles.signUp} onClick={exchange}>Sign Up</button>
			</div>
    );
}

export default Right;