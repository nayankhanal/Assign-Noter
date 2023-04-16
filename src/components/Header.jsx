import React from "react";
import "../cssStyle/KeeperGlobal.css";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

function Header(props) {

  function logout(){
    props.checkAccount("");
  }

  return (
    <header className="header">
      <h1>Keeper</h1>
      <button onClick={logout}>
          <LogoutOutlinedIcon/>
      </button>
      
    </header>
  );
}

export default Header;
