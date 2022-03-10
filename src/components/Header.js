import React from 'react'

// Font Awesome
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <div className="header-wrapper">
        <div className="header-content">
          <div id="header-item" className="header-title-wrapper">
            <h1 className='header-title'>WODLOG <FontAwesomeIcon className="header-icon" icon={faDumbbell} /></h1>
          </div>
          <div id="header-item" className="nav-wrapper">
            <Link className="nav-item" to="/">Welcome</Link>
            <Link className="nav-item" to="/log">Log</Link>
            <Link className="nav-item" to="/programs">Programs</Link>
          </div>
          <p className='header-subtitle'>Your Workout Solution</p>
        </div>
      </div>
    </div>
  )
}

export default Header