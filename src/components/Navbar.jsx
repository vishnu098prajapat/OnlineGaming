import React from 'react';
import { Link } from 'react-scroll';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>GameZone</h1>
      </div>
      <div className="nav-links">
        <Link to="home" smooth={true} duration={500} spy={true} activeClass="active">
          Home
        </Link>
        <Link to="games" smooth={true} duration={500} spy={true} activeClass="active">
          Games
        </Link>
        <Link to="popular" smooth={true} duration={500} spy={true} activeClass="active">
          Popular
        </Link>
        <Link to="new" smooth={true} duration={500} spy={true} activeClass="active">
          New
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
