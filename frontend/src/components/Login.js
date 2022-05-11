import React from "react";

function Login(props) {

   // Переменная состояния, собираем данные с формы
   const [data, setData] = React.useState(
      {
         email: '',
         password: ''
      }
   );

   // Функция для обрабоки данных с инпутов
   function handleChange(evt) {
      const {name, value} = evt.target; // берем у таргета имя и значение полей
      setData( // стэйт с новыми данными 
         {
            ...data,
            [name]: value
         })
   }

   // Функция для сабмита
   function submitForm(evt) {
      evt.preventDefault();
      props.handleLogin(data.email, data.password)
   }

   return (

      <section className="auth">
         <h2 className="auth__title">Вход</h2>
         <form className="auth__form" onSubmit={submitForm}>
            <input className="auth__input" placeholder="Email" type='email' name='email' required
               minLength='2' maxLength='30' onChange={handleChange} />
            <span className="auth__input-error" />

            <input className="auth__input" placeholder="Пароль" type='password' name='password' required
               minLength='8' maxLength='30' onChange={handleChange} />
            <span className="auth__input-error" />
            <button className="auth__submit">Войти</button>
         </form>

      </section>
   )
}

export default Login;