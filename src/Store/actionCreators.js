import API from '../API';
import {
  UPDATE_TOKEN_SUCCESS,
  GET_DATA_REQUEST, GET_DATA_SUCCESS, GET_DATA_FAILURE,
  SHOW_NOTICE_MESSAGE, HIDE_NOTICE_MESSAGE,
  UPDATE_USER_SUCCESS,
  UPDATE_STUDENT_SUCCESS,
  UPDATE_STUDENT_MEETING_SUCCESS,
  UPDATE_PATIENT_MEETING_SUCCESS,
  ADD_STUDENT_MEETING_SUCCESS,
  SET_ACTIVE_COMPONENT,
  SET_EDITABLE_STUDENT_MEETING,
  SET_EDITABLE_PATIENT_MEETING,
} from './actionTypes';

export function showNotice(message, status, time = 7000) {
  return { type: SHOW_NOTICE_MESSAGE, payload: { message, status, time } };
}

export function hideNotice() {
  return { type: HIDE_NOTICE_MESSAGE };
}

export function getDataRequest() {
  return { type: GET_DATA_REQUEST };
}

export function getDataSuccess(data) {
  return { type: GET_DATA_SUCCESS, payload: data };
}

export function getDataFailure(error) {
  return { type: GET_DATA_FAILURE, payload: error };
}

export function updateToken(token) {
  return { type: UPDATE_TOKEN_SUCCESS, payload: token };
}

export const getAllData = () => async (dispatch, getState) => {
  dispatch(getDataRequest());
  // const localData = localStorage.getItem('homeAppData');
  // if (localData !== null) {
  //   dispatch(getDataSuccess(JSON.parse(localData)));
  // }
  const response = await API.getAlldata(getState().token);
  if (response.status === 'ok') {
    dispatch(getDataSuccess(response.data));
    // localStorage.setItem('homeAppData', JSON.stringify(getState().data));
  } else {
    let message = 'Возникла ошибка при загрузке данных, в данный момент сервис не доступен';
    if (response.error === 'ERROR_AUTH') message = 'Чтобы войти в личный кабинет, вам нужно авторизоваться';
    dispatch(getDataFailure(response.error));
    dispatch(showNotice(message, false, 10000));
  }
};

export function updateUserSuccess(user) {
  return { type: UPDATE_USER_SUCCESS, payload: user };
}

export const updateUser = (
  formData,
  messageSuccess,
  messageFailure,
) => async (dispatch, getState) => {
  const response = await API.updateUser(formData, getState().token);
  if (response.status === 'ok') {
    const text = messageSuccess || 'Информация успешно обновлена';
    dispatch(showNotice(text, true));
    dispatch(updateUserSuccess(response.data));
  } else {
    const text = messageFailure || 'К сожалению возникла ошибка, попробуйте позже...';
    dispatch(showNotice(text, false));
  }
};

export function updateStudentSuccess(student) {
  return { type: UPDATE_STUDENT_SUCCESS, payload: student };
}

export const updateStudent = (
  formData,
  messageSuccess,
  messageFailure,
) => async (dispatch, getState) => {
  const response = await API.updateStudent(formData, getState().token);
  if (response.status === 'ok') {
    const text = messageSuccess || 'Информация успешно обновлена';
    dispatch(showNotice(text, true));
    dispatch(updateStudentSuccess(response.data));
  } else {
    const text = messageFailure || 'К сожалению возникла ошибка, попробуйте позже...';
    dispatch(showNotice(text, false));
  }
};

export function updateStudentMeetingSuccess(meeting) {
  return { type: UPDATE_STUDENT_MEETING_SUCCESS, payload: meeting };
}

export function updatePatientMeetingSuccess(meeting) {
  return { type: UPDATE_PATIENT_MEETING_SUCCESS, payload: meeting };
}

export const updateMeeting = (
  jsonData,
  type,
  messageSuccess,
  messageFailure,
) => async (dispatch, getState) => {
  const response = await API.updateMeeting(jsonData, getState().token);
  if (response.status === 'ok') {
    const text = messageSuccess || 'Информация успешно обновлена';
    dispatch(showNotice(text, true));
    if (type === 'student') dispatch(updateStudentMeetingSuccess(response.data));
    if (type === 'patient') dispatch(updatePatientMeetingSuccess(response.data));
  } else {
    const text = messageFailure || 'К сожалению возникла ошибка, попробуйте позже...';
    dispatch(showNotice(text, false));
  }
};

export function addStudentMeetingSuccess(meeting) {
  return { type: ADD_STUDENT_MEETING_SUCCESS, payload: meeting };
}

export const addStudentMeeting = (
  jsonData,
  messageSuccess,
  messageFailure,
) => async (dispatch, getState) => {
  const response = await API.createMeeting(jsonData, getState().token);
  if (response.status === 'ok') {
    const text = messageSuccess || 'Информация успешно обновлена';
    dispatch(addStudentMeetingSuccess(response.data));
    dispatch(showNotice(text, true));
  } else {
    const text = messageFailure || 'К сожалению возникла ошибка, попробуйте позже...';
    dispatch(showNotice(text, false));
  }
};

export function setActiveComponent(data) {
  return { type: SET_ACTIVE_COMPONENT, payload: data };
}

export function setEditableStudentMeeting(id) {
  return { type: SET_EDITABLE_STUDENT_MEETING, payload: id };
}

export function setEditablePatientMeeting(id) {
  return { type: SET_EDITABLE_PATIENT_MEETING, payload: id };
}
