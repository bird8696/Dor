import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="header_box">
        <div className="item_box">
          <div className="logo_box"></div>
          <div className="item">
            <Link to="/activity">활동</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
