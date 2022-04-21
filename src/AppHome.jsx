import 'flatpickr/dist/themes/airbnb.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AccountsLoginForm from './Components/Accounts/AccountsLoginForm/AccountsLoginForm';
import HomePage from './Components/AppHome/HomePage/HomePage';
import { getAllData, updateToken } from './Store/actionCreators';

function AppHome() {
  const loadStatus = useSelector((state) => state.loadStatus);
  const token = useSelector((state) => state.token);
  const data = useSelector((state) => state.data);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    /* Отключаем превью в HTML */
    if (loadStatus === 'INIT') {
      dispatch(getAllData());
    }
    if (loadStatus === 'LOADED' || !token) {
      const previewEl = document.getElementById('Preview');
      if (previewEl) {
        setTimeout(() => previewEl.classList.add('PreviewContainer_d-none'), 1200);
      }
    }
  }, [loadStatus, token, dispatch]);

  const onLoginSuccess = (newToken) => {
    dispatch(updateToken(newToken));
    dispatch(getAllData());
  };

  return (
    <div className="AppHome">
      {!token && error === 'ERROR_AUTH' && < AccountsLoginForm onLoginSuccess={onLoginSuccess} />}
      {loadStatus !== 'INIT' && data && <HomePage />}
    </div >
  );
}
export default AppHome;
