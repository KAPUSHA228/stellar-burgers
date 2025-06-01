import cypressConfig from '../../cypress.config';

beforeEach(() => {
  window.localStorage.setItem('refreshToken', 'mockedRefreshToken');
  cy.setCookie('accessToken', 'mockedAccessToken');

  cy.intercept('GET', 'api/auth/user', { fixture: 'user' }).as('getUser');
  cy.visit('/');
  cy.wait('@getUser');
});
afterEach(() => {
  cy.clearAllLocalStorage();
  cy.clearAllCookies();
});
const selectors = {
  my_burger_ingredient: '[data-cy=my_burger_ingredient]',
  my_burger_ingredient_btn: '[data-cy=my_burger_ingredient] > button',
  my_burger_ingredient_nth_btn:
    '[data-cy=my_burger_ingredient]:nth-of-type(3) > button',
  burger_constructor_empty_top: '[data-cy=burger_constructor_empty_top]',
  burger_constructor_empty_middle: '[data-cy=burger_constructor_empty_middle]',
  burger_constructor_empty_down: '[data-cy=burger_constructor_empty_down]',
  my_modal: '[data-cy=my_modal]',
  my_modal_overlay: '[data-cy=my_modal_overlay]',
  burger_constructor_element: '[data-cy=burger_constructor_element]',
  constructor_bun_up: '[data-cy=constructor-bun-up]',
  constructor_bun_down: '[data-cy=constructor-bun-down]',
  my_burger_ingredient_title: '[data-cy=my_burger-ingredient-title]',
  my_modal_close_button: '[data-cy=my_modal_close_button]',
  burger_constructor_submit: '[data-cy=burger_constructor_submit]',
  my_order_details_order_number: '[data-cy=my_order_number]',
  constructor_ingredient_643d69a5c3f7b9001cfa093f : `[data-cy=constructor-ingredient-643d69a5c3f7b9001cfa093f]`
} as const;
it('should add ingredient to burger', () => {
  cy.get(selectors.burger_constructor_empty_top).should('exist');
  cy.get(selectors.burger_constructor_empty_middle).should('exist');
  cy.get(selectors.burger_constructor_empty_down).should('exist');
  cy.get(selectors.burger_constructor_element).should('not.exist');

  cy.get(selectors.my_burger_ingredient_btn).first().should('exist').click();
  cy.get(selectors.my_burger_ingredient_nth_btn)
    .first()
    .should('exist')
    .click();

  cy.get(selectors.constructor_bun_up).should('exist');
  cy.get(selectors.constructor_bun_down).should('exist');
  cy.get(selectors.burger_constructor_element).should('exist');
});
describe('test open|close modal windows', () => {
  it('should open window', () => {
    cy.get(selectors.my_burger_ingredient).first().should('exist').click();
    cy.get(selectors.my_modal).should('be.visible');
    cy.get(selectors.my_burger_ingredient_title).should(
      'contain',
      'Краторная булка N-200i'
    );
    cy.get(selectors.my_modal_overlay).should('exist').click({ force: true });
    cy.get(selectors.my_modal).should('not.exist');
    cy.get(selectors.my_modal_overlay).should('not.exist');
  });
  it('should close window', () => {
    cy.get(selectors.my_modal).should('not.exist');
    cy.get(selectors.my_modal_overlay).should('not.exist');
    cy.get(selectors.my_burger_ingredient).first().should('exist').click();
    cy.get(selectors.my_modal).should('be.visible');
    cy.get(selectors.my_modal_close_button).click();
  });
});
it('should create an order', () => {
  cy.get(selectors.my_burger_ingredient_btn).first().should('exist').click();
  cy.get(selectors.my_burger_ingredient_nth_btn)
    .first()
    .should('exist')
    .click();
  cy.get(selectors.constructor_bun_up).should(
    'contain',
    'Краторная булка N-200i (верх)'
  );
  cy.get(selectors.constructor_bun_down).should(
    'contain',
    'Краторная булка N-200i (низ)'
  );
  cy.get(selectors.constructor_ingredient_643d69a5c3f7b9001cfa093f).should(
    'exist'
  );
  cy.intercept('POST', 'api/orders', { fixture: 'order' }).as('order');
  cy.get(selectors.burger_constructor_submit).should('exist').click();
  cy.wait('@order');

  cy.fixture('order').then((newOrder) => {
    cy.get(selectors.my_order_details_order_number).contains(
      newOrder.order.number
    );
  });
});

it('should constructor is empty', () => {
  cy.get(selectors.burger_constructor_empty_top).should('exist');
  cy.get(selectors.burger_constructor_empty_middle).should('exist');
  cy.get(selectors.burger_constructor_empty_down).should('exist');
  cy.get(selectors.burger_constructor_element).should('not.exist');
});
