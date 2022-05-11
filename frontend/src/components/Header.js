import React from 'react';
import header_logo from '../image/header_logo.svg';
import { Link, Route } from 'react-router-dom';
//import { CurrentUserContext } from '../contexts/CurrentUserContext';
//import { AuthContext } from '../contexts/AuthContext';

function Header(props) {

   return (

      <header className="header">

         <img className="header__logo" src={header_logo} alt="Логотип Mesto Russia" />

         <Route path='/sign-up'>
            <Link className='header__link' to='/sign-in'>Войти</Link>
         </Route>

         <Route path='/sign-in'>
            <Link className='header__link' to='/sign-up'>Регистрация</Link>
         </Route>

         <Route exact path='/'>
            <div className='header__user-info'>
               <p className='header__link-email'>{props.email}</p>
               <Link className='header__link' to='/sign-in' onClick={props.handleSignOut}>Выйти</Link>
            </div>
         </Route>

      </header>
   );
};


export default Header;