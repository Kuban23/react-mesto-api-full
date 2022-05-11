import React from "react";
import { Link } from 'react-router-dom';

function Register(props) {

   // Переменная состояния, собираем данные с формы
   const [data, setData] = React.useState(
      {
         email: '',
         password: ''

      });

   // Функция для обрабоки данных с инпутов
   function handleChange(evt) {
      const { name, value } = evt.target; // берем у таргета имя и значение полей
      setData({ // стэйт с новыми данными 
         ...data,
         [name]: value
      })
   }

   // Функция для сабмита
   function handlerSubmitForm(evt) {
      evt.preventDefault();
      props.hendleRegister(data.email, data.password);
   }

   return (

      <section className="auth">
         <h2 className="auth__title">Регистрация</h2>
         <form className="auth__form" onSubmit={handlerSubmitForm}>
            <input className="auth__input" placeholder="Email" type='email' name='email' required
               minLength='2' maxLength='30' onChange={handleChange} />
            <span className="auth__input-error" />

            <input className="auth__input" placeholder="Пароль" type='password' name='password' required
               minLength='8' maxLength='30' onChange={handleChange} />
            <span className="auth__input-error" />
            <button className="auth__submit" to='/sign-in'>Зарегистрироваться</button>
         </form>

         <div className="auth__link-title">Уже зарегистрированы?<Link className="auth__link" to='/sign-in'>Войти</Link></div>
     
      </section>

   )
}


export default Register;