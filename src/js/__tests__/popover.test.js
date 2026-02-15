import Popover from '../Popover';

describe('Popover', () => {
  let button;
  let popover;

  beforeEach(() => {
    // Настройка DOM
    document.body.innerHTML = `
      <button class="btn" data-popover-title="Test Title" data-popover-content="Test Content">
        Test Button
      </button>
    `;
    button = document.querySelector('.btn');
    popover = new Popover(button);
  });

  afterEach(() => {
    // Очистка
    document.body.innerHTML = '';
    const popovers = document.querySelectorAll('.popover');
    popovers.forEach(p => p.remove());
  });

  test('should create popover instance', () => {
    expect(popover).toBeInstanceOf(Popover);
    expect(popover.title).toBe('Test Title');
    expect(popover.content).toBe('Test Content');
  });

  test('should show popover on click', () => {
    button.click();
    const popoverElement = document.querySelector('.popover');
    expect(popoverElement).toBeTruthy();
    expect(popoverElement.querySelector('.popover-header').textContent).toBe('Test Title');
    expect(popoverElement.querySelector('.popover-body').textContent).toBe('Test Content');
  });

  test('should hide popover on second click', () => {
    button.click();
    expect(document.querySelector('.popover')).toBeTruthy();
    
    button.click();
    expect(document.querySelector('.popover')).toBeFalsy();
  });

  test('should hide popover when clicking outside', () => {
    button.click();
    expect(document.querySelector('.popover')).toBeTruthy();
    
    // Клик вне popover
    document.body.click();
    expect(document.querySelector('.popover')).toBeFalsy();
  });

  test('should create popover with arrow', () => {
    button.click();
    const popoverElement = document.querySelector('.popover');
    const arrow = popoverElement.querySelector('.popover-arrow');
    expect(arrow).toBeTruthy();
  });

  test('should position popover correctly', () => {
    button.click();
    const popoverElement = document.querySelector('.popover');
    const buttonRect = button.getBoundingClientRect();
    const popoverRect = popoverElement.getBoundingClientRect();
    
    // Popover должен быть над кнопкой
    expect(popoverRect.bottom).toBeLessThanOrEqual(buttonRect.top + 10);
    
    // Popover должен быть центрирован по горизонтали
    const buttonCenter = buttonRect.left + buttonRect.width / 2;
    const popoverCenter = popoverRect.left + popoverRect.width / 2;
    expect(Math.abs(buttonCenter - popoverCenter)).toBeLessThan(1);
  });
});
