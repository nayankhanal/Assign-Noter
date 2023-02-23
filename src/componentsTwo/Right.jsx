import React, {useState, useEffect} from "react";

function Right(props) {

	function exchange(){
			props.changeFun("right-panel-active")
	}

    return (
        <div className="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button className="ghost" idName="signUp" onClick={exchange}>Sign Up</button>
			</div>
    );
}

export default Right;