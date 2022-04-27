import './AvatarLoader.css';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { avatarIsValid, resizeImage } from '../../../utils';
import { showNotice, updateUser } from '../../../Store/actionCreators';
import AvatarCroper from '../AvatarCroper/AvatarCroper';

export default function AvatarLoader({ userId, avatarUrl }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState();
  const dispatch = useDispatch();

  const onChangeAvatar = async (e) => {
    const src = URL.createObjectURL(e.target.files[0]);
    e.target.value = '';
    const { message, status } = await avatarIsValid(src);
    if (status) {
      setFile(src);
    } else dispatch(showNotice(message, status));
  };

  const updateAvatar = async (newSrc) => {
    if (newSrc) {
      const { message, status } = await avatarIsValid(newSrc);
      if (status) {
        setFile(null);
        const smallFile = await resizeImage(newSrc);
        const formData = new FormData();
        formData.append('avatar', smallFile, 'avatar.jpg');
        formData.append('id', userId);
        dispatch(updateUser(
          formData,
          'Мы обновили изображение. У Вас изумительное фото😊',
          'Возникла ошибка при обновлении данных, наши специалисты уже работают над ее решением',
        ));
      } else dispatch(showNotice(message, status));
    } else {
      setFile(null);
      dispatch(showNotice('Не удалось обновить фото, попробуйте выбрать другой файл', false));
    }
  };

  const onClickAvatar = (e) => {
    inputRef.current.dispatchEvent(new MouseEvent('click'));
  };

  const onCloseCroper = (e) => {
    if (e) e.preventDefault();
    setFile(null);
  };

  return (
    <div className="AvatarLoaderContainer">
    <div className="AvatarLoader AvatarLoader--notInstaled" onClick={onClickAvatar} style={{ backgroundImage: `url(${avatarUrl})` }}>
      <input className="AvatarLoader__input" ref={inputRef} onChange={onChangeAvatar} name="avatar" type="file" accept="image/*"/>
      <span className="AvatarLoader__text">
        {!avatarUrl && 'Установите Ваше реальную фотографию'}
        {avatarUrl && 'Вы можете обновить фото профиля'}
      </span>
    </div>
    {file && <AvatarCroper img={file} onCropped={updateAvatar} onClose={onCloseCroper}/>}
    </div>
  );
}
