import React, { useState, useEffect } from 'react';
import HomePage from './Components/HomePage/HomePage';
import Notice from './Components/Notice/Notice';
import { NoticeProvider } from './context';

function AppHome() {
  const toggleNotice = (context) => {
    /* Включатель уведомлений компонента Notice */
    if (context.show === true) {
      const time = context.time ? context.time : 7000;
      setTimeout(() => {
        toggleNotice({ show: false });
      }, time);
    }
    setNoticeState({
      show: context.show ? context.show : false,
      message: context.message ? context.message : '',
      status: context.status ? context.status : false,
      toggleNotice,
    });
  };

  const [noticeState, setNoticeState] = useState({
    show: false,
    message: '',
    status: false,
    toggleNotice,
  });

  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    /* Отключаем превью в HTML */
    if (showPreview !== false) {
      const previewEl = document.getElementById('Preview');
      if (previewEl) {
        previewEl.classList.add('PreviewContainer_d-none');
        // setTimeout(() => previewEl.classList.add('PreviewContainer_d-none'), 1200);
        setShowPreview(false);
      }
    }
  });

  return (
    <div className="App">
      <NoticeProvider value={noticeState}>
        <Notice />
        <HomePage />
      </NoticeProvider>
    </div >
  );
}

export default AppHome;
