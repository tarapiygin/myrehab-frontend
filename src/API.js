import { getCookie } from './utils';

const getOrigin = () => {
  if (process.env.NODE_ENV === 'development') return 'http://127.0.0.1:80';
  return window.origin;
};

export const ORIGIN = getOrigin();

const CALLS = [];
export default class API {
  static async getResponse(adress, token = '', method = 'GET', body = undefined, exHeaders = {}) {
    const url = new URL(ORIGIN + adress);
    const headers = exHeaders;
    const controller = new AbortController();
    headers['X-CSRFToken'] = getCookie();
    if (token !== '') headers.Authorization = `Token ${token}`;
    const i = CALLS.findIndex((c) => c.href === url.href && c.method === method);
    if (i !== -1) {
      CALLS[i].controller.abort();
      CALLS.splice(i, 1);
    }
    const call = {
      href: url.href,
      headers,
      method,
      body,
      controller,
    };
    CALLS.push(call);
    try {
      const response = await fetch(url.href, {
        headers, method, body, signal: controller.signal,
      });
      if (response.ok) {
        // если HTTP-статус в диапазоне 200-299
        return await response.json();
      }
      if (response.status > 400 && response.status < 500) {
        return { status: 'error', error: 'ERROR_AUTH' };
      }
      return { status: 'error', error: 'ERROR_SERVER' };
    } catch (error) {
      return { status: 'error', error: 'ERROR_SERVER' };
    }
  }

  static async getUserData(token) {
    const adress = '/reestr/api/user';
    return API.getResponse(adress, token);
  }

  static async getStudentData(token) {
    const adress = '/reestr/api/student';
    return API.getResponse(adress, token);
  }

  static async getPatientData(token) {
    const adress = '/reestr/api/patient';
    return API.getResponse(adress, token);
  }

  static async getMeetingsData(token) {
    const adress = '/reestr/api/meeting';
    return API.getResponse(adress, token);
  }

  static async getSpecialties() {
    const adress = '/reestr/api/specialty';
    return API.getResponse(adress);
  }

  static async getAlldata(token) {
    const user = await API.getUserData(token);
    const student = await API.getStudentData(token);
    const patient = await API.getPatientData(token);
    const meetings = await API.getMeetingsData(token);
    const specialties = await API.getSpecialties();
    if (user.status === 'error') return user;
    const state = {
      user: user.data,
      student: student.data,
      patient: patient.data,
      studentMeetings: meetings.data.student_meetings,
      patientMeetings: meetings.data.patient_meetings,
      specialties: specialties.data,
    };
    return { status: 'ok', data: state };
  }

  static async updateUser(body, token) {
    const adress = '/reestr/api/user';
    const method = 'PUT';
    return API.getResponse(adress, token, method, body);
  }

  static async createMeeting(body, token) {
    const adress = '/reestr/api/meeting';
    const method = 'POST';
    return API.getResponse(adress, token, method, body, { 'Content-Type': 'application/json' });
  }

  static async updateMeeting(body, token) {
    const adress = '/reestr/api/meeting';
    const method = 'PUT';
    return API.getResponse(adress, token, method, body, { 'Content-Type': 'application/json' });
  }

  static async updateStudent(body, token) {
    const adress = '/reestr/api/student';
    const method = 'PUT';
    return API.getResponse(adress, token, method, body);
  }

  static async login(body) {
    const adress = '/api-token-auth/';
    const method = 'POST';
    return API.getResponse(adress, '', method, body);
  }

  static async createPatient(body) {
    // отправляем запрос на создание пациента, если все ОК, то ничего не вернется
    // если ошибка, то отрисовываем их в виджете
    const url = new URL(window.location.href);
    const method = 'POST';
    const headers = {
      'X-CSRFToken': getCookie(),
    };
    const response = await fetch(url.href, { headers, method, body });
    try {
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      return {};
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getDataSearchForm() {
    const url = new URL(window.location.href);
    url.searchParams.set('format', 'JSON');
    const response = await fetch(url.href);
    try {
      if (response.ok) {
        const rowData = await response.json();
        return rowData.data;
      }
      return {};
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
