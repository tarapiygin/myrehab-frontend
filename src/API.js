import { getCookie } from './utils';

export const HREF = 'http://127.0.0.1/';
export const ORIGIN = 'http://127.0.0.1';
const CALLS = [];
export default class API {
  static async getResponse(adress, method = 'GET', body = undefined, exHeaders = {}) {
    const url = new URL(ORIGIN + adress);
    const headers = exHeaders;
    const controller = new AbortController();

    if (method in ['POST', 'PUT', 'DELETE']) {
      headers['X-CSRFToken'] = getCookie();
    }
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
    const response = await fetch(url.href, {
      headers, method, body, signal: controller.signal,
    });

    try {
      if (response.ok) {
        // если HTTP-статус в диапазоне 200-299
        return await response.json();
      }
      return { status: 'error', message: response.error };
    } catch (error) {
      return { status: 'error', message: error };
    }
  }

  static async getUserData() {
    const adress = '/reestr/api/user';
    return API.getResponse(adress);
  }

  static async getStudentData() {
    const adress = '/reestr/api/student';
    return API.getResponse(adress);
  }

  static async getPatientData() {
    const adress = '/reestr/api/patient';
    return API.getResponse(adress);
  }

  static async getMeetingsData() {
    const adress = '/reestr/api/meeting';
    return API.getResponse(adress);
  }

  static async getSpecialties() {
    const adress = '/reestr/api/specialty';
    return API.getResponse(adress);
  }

  static async getAlldata() {
    const user = await API.getUserData();
    const student = await API.getStudentData();
    const patient = await API.getPatientData();
    const meetings = await API.getMeetingsData();
    const state = {
      user: user.data,
      student: student.data,
      patient: patient.data,
      studentMeetings: meetings.data.student_meetings,
      patientMeetings: meetings.data.patient_meetings,
    };
    return state;
  }

  static async updateUser(body) {
    const adress = '/reestr/api/user';
    const method = 'PUT';
    return API.getResponse(adress, method, body);
  }

  static async updateMeeting(body) {
    const adress = '/reestr/api/meeting';
    const method = 'PUT';
    return API.getResponse(adress, method, body);
  }

  static async updateStudent(body) {
    const adress = '/reestr/api/student';
    const method = 'PUT';
    return API.getResponse(adress, method, body);
  }

  // static async createPatient(body) {
  //   // отправляем запрос на создание пациента, если все ОК, то ничего не вернется
  //   // если ошибка, то отрисовываем их в виджете
  //   const adress = '';
  //   const method = 'POST';
  //   return API.getResponse(adress, method, body);
  // }

  static async getDataSearchForm() {
    const url = new URL(HREF);
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
