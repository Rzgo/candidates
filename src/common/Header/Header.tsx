import React from 'react';
import './Header.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { navbarItems } from './constants';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  return (
    <header>
      <nav className="navbar">
        <ul className="navbar__wrapper container">
          {navbarItems.map((item) => (
            <li
              onClick={() => navigate(item.link)}
              className={classNames('navbar__item', {
                navbar__item_active: location === item.link,
              })}
              key={item.link}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
