import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { ConnectWallet } from "../ui/button/ConnectWallet";

const Navbar = () => {
  const [navHeight, setNavHeight] = useState(false);
  const navigate = useNavigate();
  const gotoHome = ()=>{
    navigate('/');
  }



  return (
    <>
      <nav className={navHeight ? "show nav" : "nav"}>
        <div className="logo" onClick={()=> gotoHome()}>PROPERTY RENTALS</div>
          <div style={{display: 'flex', alignItems: "center", gap: '32px'}}>
            <ul>
              <li>
                <Link to={"/aboutus"}>ABOUT US</Link>
              </li>
              <li>
                <Link to={"/villas"}>VILLAS</Link>
              </li>
              <li>
                <Link to={"/contact"}>CONTACT</Link>
              </li>
            </ul>

      
            <ConnectWallet />
            <RxHamburgerMenu
              className="hamburger"
              onClick={() => setNavHeight(!navHeight)}
            />

        </div>
      </nav>
    </>
  );
};

export default Navbar;