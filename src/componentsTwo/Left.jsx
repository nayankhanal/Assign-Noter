import React, {useState, useEffect} from "react";

function Left(props) {

	function exchange(){
		props.changeFun("")
}

    return (
        <div className="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button className="ghost" idName="signIn" onClick={exchange}>Log In</button>
			</div>
    );
}

export default Left;

{/* <Routes>
      <Route exact path="/" component={Login} />
      <Route path="/keep" component={App} />
   </Routes> */}