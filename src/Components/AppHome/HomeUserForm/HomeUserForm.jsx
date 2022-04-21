import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../Store/actionCreators';
import AccountsMenu from '../../Accounts/AccountsMenu/AccountsMenu';
import AvatarLoader from '../../Base/AvatarLoader/AvatarLoader';
import InputFormGroup from '../../Base/InputFormGroup/InputFormGroup';

import { ORIGIN } from '../../../API';

export default function HomeUserForm() {
  const user = useSelector((state) => state.data.user);
  const dispath = useDispatch();

  const formRef = useRef(null);

  const onSubmitForm = async (e = null) => {
    if (e) e.preventDefault();
    const formData = new FormData(formRef.current);
    dispath(updateUser(formData));
  };

  return (
    <div className="HomeUserForm commonFormContainer">
      <AccountsMenu />
      <AvatarLoader userId={user.id} avatarUrl={ORIGIN + user.avatar}/>
      <h2 className="HomeUserForm__title">Общая информация</h2>
      <form onSubmit={onSubmitForm} ref={formRef}>
        <div className='row'>
          <InputFormGroup name='first_name' label='Имя' initValue={user.first_name}/>
          <InputFormGroup name='last_name' label='Фамилия' initValue={user.last_name}/>
          <InputFormGroup name='middle_name' label='Отчество' initValue={user.middle_name}/>
          <InputFormGroup name='phone' label='Телефон' initValue={user.phone}/>
          <InputFormGroup name='country' label='Страна' initValue={user.country}/>
          <InputFormGroup name='city' label='Город' initValue={user.city}/>
        </div>
        <button className="btn btn-outline-success mx-auto d-block" type="submit">Сохранить изменения</button>
      </form>
    </div>
  );
}
