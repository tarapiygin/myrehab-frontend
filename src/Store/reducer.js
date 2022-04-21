/* eslint-disable no-case-declarations */
/* eslint-disable default-param-last */
import {
  UPDATE_TOKEN_SUCCESS,
  GET_DATA_REQUEST, GET_DATA_SUCCESS, GET_DATA_FAILURE,
  UPDATE_USER_SUCCESS, UPDATE_STUDENT_SUCCESS, UPDATE_PATIENT_SUCCESS,
  ADD_STUDENT_MEETING_SUCCESS, UPDATE_STUDENT_MEETING_SUCCESS,
  UPDATE_PATIENT_MEETING_SUCCESS,
  SHOW_NOTICE_MESSAGE, HIDE_NOTICE_MESSAGE, SET_ACTIVE_COMPONENT,
  SET_EDITABLE_STUDENT_MEETING,
  SET_EDITABLE_PATIENT_MEETING,
} from './actionTypes';

const initialState = {
  loadStatus: 'INIT',
  activeComponent: 'USER',
  editableStudentMeeting: null,
  editablePatientMeeting: null,
  token: null,
  error: null,
  data: null,
  notice: {
    show: false,
    message: '',
    status: false,
    time: 7000,
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_COMPONENT:
      return { ...state, activeComponent: action.payload };
    case SET_EDITABLE_STUDENT_MEETING:
      return {
        ...state,
        editableStudentMeeting: state.data.studentMeetings.find((m) => m.id === action.payload),
      };
    case SET_EDITABLE_PATIENT_MEETING:
      return {
        ...state,
        editablePatientMeeting: state.data.patientMeetings.find((m) => m.id === action.payload),
      };
    case UPDATE_TOKEN_SUCCESS:
      return { ...state, token: action.payload };
    case GET_DATA_REQUEST:
      return {
        ...state, loadStatus: 'LOADING', error: null,
      };
    case GET_DATA_SUCCESS:
      return {
        ...state, loadStatus: 'LOADED', token: action.payload.user.auth_token, data: { ...state.data, ...action.payload }, error: null,
      };
    case GET_DATA_FAILURE:
      return {
        ...state, loadStatus: 'FAILED', error: action.payload,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state, data: { ...state.data, user: { ...state.data.user, ...action.payload } },
      };
    case UPDATE_STUDENT_SUCCESS:
      return {
        ...state, data: { ...state.data, student: { ...state.data.student, ...action.payload } },
      };
    case UPDATE_PATIENT_SUCCESS:
      return {
        ...state, data: { ...state.data, patient: { ...state.data.patient, ...action.payload } },
      };
    case ADD_STUDENT_MEETING_SUCCESS:
      const addStudentMeetings = state.data.studentMeetings.map((m) => m);
      addStudentMeetings.push(action.payload);
      return {
        ...state,
        data: {
          ...state.data,
          studentMeetings: addStudentMeetings,
        },
      };
    case UPDATE_STUDENT_MEETING_SUCCESS:
      const updateStudentMeetings = state.data.studentMeetings.map((m) => {
        if (m.id === action.payload.id) return action.payload;
        return m;
      });
      return {
        ...state,
        data: {
          ...state.data,
          studentMeetings: updateStudentMeetings,
        },
      };
    case UPDATE_PATIENT_MEETING_SUCCESS:
      const updatePatientMeetings = state.data.patientMeetings.map((m) => {
        if (m.id === action.payload.id) return action.payload;
        return m;
      });
      return {
        ...state,
        data: {
          ...state.data,
          patientMeetings: updatePatientMeetings,
        },
      };
    case SHOW_NOTICE_MESSAGE:
      return {
        ...state,
        notice: {
          ...state.notice, show: true, ...action.payload,
        },
      };
    case HIDE_NOTICE_MESSAGE:
      return { ...state, notice: { ...initialState.notice } };
    default:
      return state;
  }
}
