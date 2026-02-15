/**
 * Класс виджета Popover
 * Реализует всплывающую подсказку, которая появляется над элементом при клике
 */

export default class Popover {
  constructor(element) {
    this.element = element;
    this.popover = null;
    this.isVisible = false;
    
    this.title = element.dataset.popoverTitle || '';
    this.content = element.dataset.popoverContent || '';
    
    this.init();
  }
  
  /**
   * Инициализация popover
   */

  init() {
    this.element.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggle();
    });
    
    // Закрыть popover при клике вне его области

    document.addEventListener('click', (e) => {
      if (this.isVisible && !this.popover.contains(e.target) && e.target !== this.element) {
        this.hide();
      }
    });
  }
  
  /**
   * Переключение видимости popover
   */

  toggle() {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }
  
  /**
   * Показать popover
   */

  show() {
    // Скрыть все другие видимые popover

    document.querySelectorAll('.popover').forEach(popover => {
      popover.remove();
    });
    
    this.popover = this.createPopoverElement();
    document.body.appendChild(this.popover);
    
    this.positionPopover();
    this.isVisible = true;
  }
  
  /**
   * Скрыть popover
   */

  hide() {
    if (this.popover) {
      this.popover.remove();
      this.popover = null;
    }
    this.isVisible = false;
  }
  
  /**
   * Создать DOM-элемент popover
   */

  createPopoverElement() {
    const popover = document.createElement('div');
    popover.className = 'popover';
    
    // Создать стрелку

    const arrow = document.createElement('div');
    arrow.className = 'popover-arrow';
    popover.appendChild(arrow);
    
    // Создать заголовок, если есть название

    if (this.title) {
      const header = document.createElement('h3');
      header.className = 'popover-header';
      header.textContent = this.title;
      popover.appendChild(header);
    }
    
    // Создать тело

    const body = document.createElement('div');
    body.className = 'popover-body';
    body.textContent = this.content;
    popover.appendChild(body);
    
    return popover;
  }
  
  /**
   * Позиционировать popover над элементом
   */

  positionPopover() {
    const rect = this.element.getBoundingClientRect();
    const popoverRect = this.popover.getBoundingClientRect();
    
    // Вычислить позицию
    const top = rect.top - popoverRect.height - 10; // 10px для стрелки

    const left = rect.left + (rect.width / 2) - (popoverRect.width / 2);
    
    this.popover.style.top = `${top + window.scrollY}px`;
    this.popover.style.left = `${left + window.scrollX}px`;
  }
  
  /**
   * Статический метод для инициализации всех popover на странице
   */

  static initAll() {
    const buttons = document.querySelectorAll('[data-popover-title], [data-popover-content]');
    buttons.forEach(button => {
      new Popover(button);
    });
  }
}
