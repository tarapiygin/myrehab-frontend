/* eslint-disable max-len */
import './AvatarLoader.css';
import { useContext, useRef, useState } from 'react';
import { avatarIsValid, resizeImage } from '../../utils';
import NoticeContext from '../../context';

export default function AvatarLoader(props) {
  // const { onChangeAvatarFile } = props;
  const noticeContext = useContext(NoticeContext);
  const [avatarUrl, setAvatarUrl] = useState(props.avatarUrl);
  const [classNames, setClassNames] = useState({ container: 'AvatarLoader AvatarLoader--notInstaled', text: 'AvatarLoader__text' });
  const inputRef = useRef(null);

  const onChangeAvatar = (e) => {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(e.target.files[0]);
    img.onload = () => {
      const { message, status } = avatarIsValid(img);
      if (status) {
        resizeImage(img, (smallFile) => {
          const newAvatarUrl = URL.createObjectURL(smallFile);
          setAvatarUrl(newAvatarUrl);
          setClassNames(() => ({ container: 'AvatarLoader', text: 'AvatarLoader__text d-none' }));
          // onChangeAvatarFile(smallFile);
          img.remove();
        });
      } else noticeContext.toggleNotice({ show: true, message });
    };
  };

  const onClickContainer = (e) => {
    inputRef.current.dispatchEvent(new MouseEvent('click'));
  };

  return (
    <div className={classNames.container} onClick={onClickContainer} style={{ backgroundImage: `url(${avatarUrl})` }}>
      <input className="AvatarLoader__input" ref={inputRef} onChange={onChangeAvatar} name="avatar" type="file" accept="image/*"/>
      <span className={classNames.text}>Установите реальное фото для профиля</span>
    </div>
  );
}
