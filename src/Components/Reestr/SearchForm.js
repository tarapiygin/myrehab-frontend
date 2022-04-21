import DropDownWidget from './DropDownWidget';
import API from '../../API';

export default class SearchForm {
  constructor(element) {
    this.element = element;
    this.data = null;
    this.elementList = null;
    this.dropDownWidgetLlst = [];
    this.aciveField = null;
  }

  async updateData() {
    const baseData = await API.getDataSearchForm();
    this.data = baseData.formData;
  }

  getQueryParams() {
    const params = new URL(document.location.href).searchParams;
    for (const [name, value] of params) {
      const elem = this.elementList.find((e) => e.name === name);
      if (value !== '') elem.value = value;
    }
  }

  onInputFormField(e) {
    this.aciveField = e.target;
    const { name, value } = e.target;
    this.reRenderActiveWidget(name, value);
  }

  onClickFormField(e) {
    this.aciveField = e.target;
    const { name, value } = e.target;
    this.reRenderActiveWidget(name, value);
  }

  onBlurFormField(e) {
    if (e.target === this.aciveField) {
      setTimeout(() => {
        const widget = this.dropDownWidgetLlst.find((w) => w.name === e.target.name);
        if (widget === undefined) return;
        widget.hide();
      }, 800);
    }
  }

  reRenderActiveWidget(name, value) {
    if (this.data === null) return;
    let widget = null;
    this.dropDownWidgetLlst.forEach((w) => {
      if (w.name === name) widget = w;
      else w.hide();
    });
    if (widget === null) return;

    if (value !== '') {
      widget.show();
      const items = this.data[name].filter((v) => v.toLowerCase().includes(value.toLowerCase()));
      if (items.length < 4) widget.reRender([...(new Set(items))]);
      else widget.reRender([...(new Set(items.slice(0, 4)))]);
      return;
    }
    widget.hide();
  }

  onClickDropDownWidget(name, value) {
    const elem = this.elementList.find((input) => input.name === name);
    elem.value = value;
    elem.dispatchEvent(new Event('input'));
  }

  renderDropDownWidgets() {
    this.elementList.forEach((elem) => {
      const widget = new DropDownWidget(
        elem.closest('.form-group'),
        elem.name,
        this.onClickDropDownWidget.bind(this),
      );
      this.dropDownWidgetLlst.push(widget);
    });
  }

  init() {
    this.element.innerHTML = SearchForm.getMarkup();
    this.elementList = Array.from(this.element.querySelectorAll('.SearchFormWidget_input'));
    this.renderDropDownWidgets();
    this.getQueryParams();
    this.registerEvents();
    this.updateData();
  }

  registerEvents() {
    this.elementList.forEach((element) => {
      element.addEventListener('input', this.onInputFormField.bind(this));
    });
    this.elementList.forEach((element) => {
      element.addEventListener('click', this.onClickFormField.bind(this));
    });
    this.elementList.forEach((element) => {
      element.addEventListener('blur', this.onBlurFormField.bind(this));
    });
  }

  static getMarkup() {
    return `
      <div class="form-group">
          <label for="city"></label>
          <input type="text"
                class="form-control SearchFormWidget_input"
                id="city"
                placeholder="Введите Город"
                name="city">
      </div>
      <div class="form-group">
        <label for="specialty"></label>
        <input type="text"
                  class="form-control SearchFormWidget_input"
                  id="specialty"
                  placeholder="Введите специализацию"
                  name="specialty">
      </div>
      <div style="text-align: center">ИЛИ</div>
      <div class="form-group">
        <label for="name"></label>
        <input type="text"
              class="form-control SearchFormWidget_input"
              id="name"
              placeholder="Введите Фамилию и Имя"
              name="name">
      </div>
<button class="btn btn-outline-success btn-lg btn-block searchForm-submit-btn studentList_searchForm__btn"
        type="submit">Искать специалиста</button>`;
  }
}
