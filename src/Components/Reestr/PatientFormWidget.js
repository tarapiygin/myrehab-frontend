import API from '../../API';

export default class PatientFormWidget {
  constructor(element) {
    this.element = element;
    this.captchaImage = this.element.querySelector('.captcha');
    this.captchaHideInput = this.element.querySelector('#id_captcha_0');
  }

  async onSubmit(e) {
    e.preventDefault();
    const body = new FormData(this.element);
    const response = await API.createPatient(body);
    if (response.status === 'error') {
      const data = response;
      this.drawErrors(data.form_errors);
      this.updateCaptcha(data.new_cptch_image, data.new_cptch_key);
    }
    if (response.status === 'ok') {
      this.drawCompleteMessage(response.data.user);
    }
  }

  drawCompleteMessage(user) {
    this.element.style.display = 'none';
    const modalElement = this.element.closest('.modal-body');
    const title = modalElement.querySelector('.modal-title');
    title.textContent = `Успех!\n
    ${user.name}, контакты специалиста были отправлены на Ваш электронный адрес.
    `;
  }

  updateCaptcha(captchaImageUrl, captchaKey) {
    this.captchaImage.src = captchaImageUrl;
    this.captchaHideInput.value = captchaKey;
  }

  drawErrors(errors) {
    this.element.querySelectorAll('.errors').forEach((e) => {
      e.remove();
    });
    if ('captcha' in errors) {
      let html = '<div class="errors">';
      errors.captcha.forEach((e) => {
        html += `<div class='error'>${e}</div>`;
      });
      html += '</div>';
      this.captchaImage.insertAdjacentHTML('beforebegin', html);
    }
    if ('patient' in errors) {
      let html = '<div class="errors">';
      errors.patient.forEach((e) => {
        html += `<div class='error'>${e}</div>`;
      });
      html += '</div>';
      this.captchaImage.insertAdjacentHTML('beforebegin', html);
    }
  }

  init() {
    this.element.addEventListener('submit', this.onSubmit.bind(this));
  }
}
