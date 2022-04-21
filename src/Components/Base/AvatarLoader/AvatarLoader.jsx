/* eslint-disable max-len */
import './AvatarLoader.css';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { avatarIsValid, resizeImage } from '../../../utils';
import { showNotice, updateUser } from '../../../Store/actionCreators';

export default function AvatarLoader({ userId, avatarUrl }) {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

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
      } else dispatch(showNotice(message, status));
    };
  };

  const updateAvatar = async (file) => {
    const formData = new FormData();
    formData.append('avatar', file, 'avatar.jpg');
    formData.append('id', userId);
    dispatch(updateUser(
      formData,
      'Мы обновили изображение. У Вас изумительное фото😊',
      'Возникла ошибка при обновлении данных, наши специалисты уже работают над ее решением',
    ));
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
