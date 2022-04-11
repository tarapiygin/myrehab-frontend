import React, { useEffect, useReducer } from 'react';
import API from './API';
import HomePage from './Components/HomePage/HomePage';
import Notice from './Components/Notice/Notice';
import { NoticeProvider } from './context';

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateData':
      return { ...state, loading: 'loaded', data: action.payload };
    case 'updateNotice':
      return { ...state, notice: action.payload };
    case 'updateLoadStatus':
      return { ...state, loadStatus: action.payload };
    case 'updateUser':
      return { ...state, data: { ...state.data, user: action.payload } };
    case 'updateStudent':
      return { ...state, data: { ...state.data, student: action.payload } };
    case 'updateStudentMeetings':
      return { ...state, data: { ...state.data, studentMeetings: action.payload } };
    case 'updatePatientMeetings':
      return { ...state, data: { ...state.data, patientMeetings: action.payload } };
    default:
      throw new Error('type attribute not passed');
  }
};

function AppHome() {
  const toggleNotice = (context) => {
    /* Включатель уведомлений компонента Notice */
    if (context.show === true) {
      const time = context.time ? context.time : 7000;
      setTimeout(() => {
        toggleNotice({ show: false });
      }, time);
    }
    dispatch({
      type: 'updateNotice',
      payload: {
        show: context.show ? context.show : false,
        message: context.message ? context.message : '',
        status: context.status ? context.status : false,
        toggleNotice,
      },
    });
  };

  const [state, dispatch] = useReducer(reducer, {
    loadStatus: 'init',
    notice: {
      show: false,
      message: '',
      status: false,
      toggleNotice,
    },
    data: {},
  });

  useEffect(() => {
    /* Отключаем превью в HTML */
    if (state.loadStatus === 'init') {
      API.getAlldata().then((value) => dispatch({ type: 'updateData', payload: value }));
      dispatch({ type: 'updateLoadStatus', payload: 'loading' });
    }
    if (state.loading === 'loaded') {
      const previewEl = document.getElementById('Preview');
      if (previewEl) {
        previewEl.classList.add('PreviewContainer_d-none');
        // setTimeout(() => previewEl.classList.add('PreviewContainer_d-none'), 1200);
      }
    }
  });

  return (
    <div className="AppHome">
      <NoticeProvider value={state.notice}>
        <Notice />
        {state.loading === 'loaded' && <HomePage {...state.data} dispatchState={dispatch} />}
      </NoticeProvider>
    </div >
  );
}
export default AppHome;
