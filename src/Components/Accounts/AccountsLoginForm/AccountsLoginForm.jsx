import './AccountsLoginForm.css';
import { useRef, useState } from 'react';
import InputFormGroup from '../../Base/InputFormGroup/InputFormGroup';
import API from '../../../API';

export default function AccountsLoginForm({ onLoginSuccess }) {
  const formRef = useRef(null);
  const [error, setError] = useState(null);

  const onSubmitForm = async (e = null) => {
    if (e) e.preventDefault();
    const formData = new FormData(formRef.current);
    const response = await API.login(formData);
    if (response.token) onLoginSuccess(response.token);
    else setError('Неправильный логин или пароль');
  };

  const onChangeForm = () => {
    if (error) setError(null);
  };

  return (
    <div className="AccountsLoginForm commonFormContainer">
      <h1 className="HomeUserContainer__title">Пожалуйста, авторизуйтесь</h1>
      <form className="row" onSubmit={onSubmitForm} ref={formRef}>
        {error && <p className="alert alert-danger" role="alert">{error}</p>}
        <InputFormGroup name='username' extendedClasses='col-12' label='Эл. адрес' type='email' onChangeHook={onChangeForm}/>
        <InputFormGroup name='password' extendedClasses='col-12' label='Пароль' type='password' onChangeHook={onChangeForm}/>
        <button className="btn btn-outline-success mx-auto btn-lg AccountsLoginForm__button mt-2" type="submit">Войти</button>
      </form>
    </div>
  );
}
