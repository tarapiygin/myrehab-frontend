import { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import UserModel from '../../Models/UserModel';
import AccountsMenu from '../AccountsMenu/AccountsMenu';
import AvatarLoader from '../AvatarLoader/AvatarLoader';
import InputFormGroup from '../InputFormGroup/InputFormGroup';
import API, { ORIGIN } from '../../API';
import NoticeContext from '../../context';

export default function HomeUserContainer({ user, dispatchState }) {
  const noticeContext = useContext(NoticeContext);
  const formRef = useRef(null);

  const onSubmitForm = async (e = null) => {
    if (e) e.preventDefault();
    const formData = new FormData(formRef.current);
    const response = await API.updateUser(formData);
    let message = '';
    if (response.status === 'ok') {
      message = 'Информация успешно обновлена';
      noticeContext.toggleNotice({ show: true, message, status: true });
      dispatchState({ type: 'updateUser', payload: response.data });
    } else {
      message = 'Возникла ошибка при обновлении данных, наши специалисты уже работают над ее решением';
      noticeContext.toggleNotice({ show: true, message });
    }
  };

  return (
    <div className="HomeUserContainer commonFormContainer">
      <AccountsMenu />
      <AvatarLoader avatarUrl={ORIGIN + user.avatar} dispatchState={dispatchState}/>
      <h2 className="HomeUserContainer__title">Общая информация</h2>
      <form className="row" onSubmit={onSubmitForm} ref={formRef}>
        <InputFormGroup name='first_name' label='Имя' initValue={user.first_name}/>
        <InputFormGroup name='last_name' label='Фамилия' initValue={user.last_name}/>
        <InputFormGroup name='middle_name' label='Отчество' initValue={user.middle_name}/>
        <InputFormGroup name='phone' label='Телефон' initValue={user.phone}/>
        <InputFormGroup name='country' label='Страна' initValue={user.country}/>
        <InputFormGroup name='city' label='Город' initValue={user.city}/>
        <button className="btn btn-outline-success btn-lg mx-auto" type="submit">Сохранить изменения</button>
      </form>
    </div>
  );
}

HomeUserContainer.propTypes = {
  user: PropTypes.exact(UserModel),
  dispatchState: PropTypes.func,
};
