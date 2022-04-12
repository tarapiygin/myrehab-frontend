/* eslint-disable max-len */
import './AvatarLoader.css';
import { useContext, useRef } from 'react';
import { avatarIsValid, resizeImage } from '../../../utils';
import NoticeContext from '../../../context';
import API from '../../../API';

export default function AvatarLoader({ avatarUrl, dispatchState }) {
  const noticeContext = useContext(NoticeContext);
  const inputRef = useRef(null);

  const onChangeAvatar = (e) => {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(e.target.files[0]);
    img.onload = () => {
      const { message, status } = avatarIsValid(img);
      if (status) {
        resizeImage(img, (smallFile) => {
          img.remove();
          updateAvatar(smallFile);
        });
      } else noticeContext.toggleNotice({ show: true, message });
    };
  };

  const updateAvatar = async (file) => {
    const formData = new FormData();
    formData.append('avatar', file, 'avatar.jpg');
    const response = await API.updateUser(formData);
    let message = '';
    if (response.status === 'ok') {
      message = 'Мы обновили изображение. У Вас изумительное фото😊';
      noticeContext.toggleNotice({ show: true, message, status: true });
      dispatchState({ type: 'updateUser', payload: response.data });
    } else {
      message = 'Возникла ошибка при обновлении данных, наши специалисты уже работают над ее решением';
      noticeContext.toggleNotice({ show: true, message });
    }
  };

  const onClickContainer = (e) => {
    inputRef.current.dispatchEvent(new MouseEvent('click'));
  };

  return (
    <div className="AvatarLoader AvatarLoader--notInstaled" onClick={onClickContainer} style={{ backgroundImage: `url(${avatarUrl})` }}>
      <input className="AvatarLoader__input" ref={inputRef} onChange={onChangeAvatar} name="avatar" type="file" accept="image/*"/>
      <span className="AvatarLoader__text">
        {!avatarUrl && 'Установите Ваше реальную фотографию'}
        {avatarUrl && 'Вы можете обновить фото профиля'}
      </span>
    </div>
  );
}
