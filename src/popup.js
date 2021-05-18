export default class Popup {
  constructor(parent, custom_html) {
    this.parent = parent;
    this.custom_html = custom_html;
    this.make();
  }

  make() {
    this.parent.innerHTML = `
            <div class="title"></div>
            <div class="subtitle"></div>
            <div class="pointer"></div>
        `;

    this.hide();

    this.title = this.parent.querySelector('.title');
    this.subtitle = this.parent.querySelector('.subtitle');
    this.pointer = this.parent.querySelector('.pointer');
  }

  show(options) {
    if (!options.target_element) {
      throw new Error('target_element is required to show popup');
    }
    if (!options.position) {
      options.position = 'left';
    }
    const target_element = options.target_element;

    if (this.custom_html) {
      let html = this.custom_html(options.task, options.data);
      html += '<div class="pointer"></div>';
      this.parent.innerHTML = html;
      this.pointer = this.parent.querySelector('.pointer');
    } else {
      // set data
      this.title.innerHTML = options.title;
      if (options.subtitle) {
        this.subtitle.innerHTML = options.subtitle;
      }
      this.parent.style.width = this.parent.clientWidth + 'px';
    }

    // set position
    let position_meta = this.getPositionMeta(target_element);

    if (options.position === 'left') {
      this.parent.style.left =
        position_meta.x + (position_meta.width + 10) + 'px';
      this.parent.style.top = position_meta.y + 'px';

      this.pointer.style.transform = 'rotateZ(90deg)';
      this.pointer.style.left = '-7px';
      this.pointer.style.top = '2px';
    }

    // show
    this.parent.style.opacity = 1;
  }

  hide() {
    this.parent.style.opacity = 0;
  }

  move(target_element) {
    let position_meta = this.getPositionMeta(target_element);
    this.parent.style.top = (position_meta.y + position_meta.height + 5) + 'px';
  }

  getPositionMeta(target_element) {
    if (target_element instanceof HTMLElement) {
      return target_element.getBoundingClientRect();
    } else if (target_element instanceof SVGElement) {
      return target_element.getBBox();
    }
  }
}
