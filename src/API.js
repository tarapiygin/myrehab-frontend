import Notice from './Notice';
import {HREF, ORIGIN} from './app';
import {getCookie} from './utils';

export default class API {
  static async getResponse(response) {
    try {
      if (response.ok) {
        // если HTTP-статус в диапазоне 200-299
        return await response.json();
      }
      Notice.show('Возникла ошибка при отправке данных', false);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getUserData() {
    const adress = '/reestr/api/user';
    const url = new URL(ORIGIN + adress);
    const response = await API.getResponse(await fetch(url.href));
    if (response.status === 'ok') return response.data;
    Notice.show('Возникла ошибка при получении данных пользователя =(');
  }

  static async getSpecialties() {
    const adress = '/reestr/api/specialty';
    const url = new URL(ORIGIN + adress);
    const response = await API.getResponse(await fetch(url.href));
    if (response.status === 'ok') return response.data.specialties;
    Notice.show('Возникла ошибка при получении данных специальностей =(');
  }

  static async getSpecialtyById(id) {
    const adress = '/reestr/api/specialty';
    const url = new URL(ORIGIN + adress);
    url.searchParams.set('id', id);
    const response = await API.getResponse(await fetch(url.href));
    if (response.status === 'ok') return response.data;
    Notice.show('Возикла ошибка при получении данных специальности =(');
  }

  static async updateUser(body) {
    const adress = '/reestr/api/user';
    const url = new URL(ORIGIN + adress);
    // отправляем запрос на создание пациента, если все ОК, то ничего не вернется
    // если ошибка, то отрисовываем их в виджете
    const method = 'PUT';
    const headers = {
      "X-CSRFToken": getCookie()
    }
    return await API.getResponse(await fetch(url.href, {headers: headers, method, body}));
  }

  static async updateMeeting(body) {
    const adress = '/reestr/api/meeting';
    const url = new URL(ORIGIN + adress);
    const method = 'PUT';
    const headers = {
      "X-CSRFToken": getCookie()
    }
    return await API.getResponse(await fetch(url.href, {headers: headers, method, body}));
  }

  static async updateStudent(body) {
    const adress = '/reestr/api/student';
    const url = new URL(ORIGIN + adress);
    // отправляем запрос на создание пациента, если все ОК, то ничего не вернется
    // если ошибка, то отрисовываем их в виджете
    const method = 'PUT';
    const headers = {
      "X-CSRFToken": getCookie()
    }
    return await API.getResponse(await fetch(url.href, {headers: headers, method, body}));
  }


  static async createPatient(body) {
    // отправляем запрос на создание пациента, если все ОК, то ничего не вернется
    // если ошибка, то отрисовываем их в виджете
    const method = 'POST';
    return await API.getResponse(await fetch(HREF, {method, body}));
  }

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
