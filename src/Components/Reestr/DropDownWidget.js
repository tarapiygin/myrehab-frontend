export default class DropDownWidget {
  constructor(container, name, onClickValueListener) {
    this.container = container;
    this.name = name;
    this.elem = null;
    this.onClickValueListener = onClickValueListener;
    this.init();
  }

  init() {
    this.container.insertAdjacentHTML(
      'beforeend',
      `<ul class="list-group list-${this.name} DropDownWidget d-none"><ul>`,
    );

    this.elem = this.container.querySelector(`.list-${this.name}`);
  }

  reRender(items) {
    let innerHTML = '';
    items.forEach((i) => {
      if (i !== '') {
        innerHTML += `<li class="list-group-item dropdown-item mt-0" data-value='${i}'>${i}</li>`;
      }
    });
    this.elem.innerHTML = innerHTML;

    this.registerEvents();
  }

  onClickItem(e) {
    this.onClickValueListener.call(null, this.name, e.target.dataset.value);
    this.hide();
  }

  registerEvents() {
    this.elem.querySelectorAll('.list-group-item').forEach((e) => {
      e.addEventListener('click', this.onClickItem.bind(this));
    });
  }

  hide() {
    this.elem.classList.add('d-none');
  }

  show() {
    this.elem.classList.remove('d-none');
  }

  remove() {
    this.elem.remove();
  }
}
