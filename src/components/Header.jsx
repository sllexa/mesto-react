import React from 'react';
import logo from '../images/logo.svg';

const Header = () => {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип" />
    </header>
  );
}

export default Header;
