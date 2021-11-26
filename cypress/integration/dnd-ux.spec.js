describe('service is available', function () {
  it('should be available on localhost:3000', function () {
    cy.visit('http://localhost:3000');
  });

  it("should get and drop bun ingredient", function () {
    cy.get('[class^=BurgerIngredients_ingredients__]').as("burger-ingredients");
    cy.get('[class^=BurgerConstructor_basket__list__]').as("burger-constructor"); 

    cy.get("@burger-ingredients")
    .find("a")
    .contains("Краторная булка N-200i")
    .as("ingredient-item");

    cy.get("@ingredient-item").trigger("dragstart");

    cy.get("@burger-constructor").trigger("drop");
  });

  it("should get and drop main ingredient", function () {
    cy.get('[class^=BurgerIngredients_ingredients__]').as("burger-ingredients");
    cy.get('[class^=BurgerConstructor_basket__list__]').as("burger-constructor"); 

    cy.get("@burger-ingredients")
    .find("a")
    .contains("Плоды Фалленианского дерева")
    .as("ingredient-item");

    cy.get("@ingredient-item").trigger("dragstart");

    cy.get("@burger-constructor").trigger("drop");
  });


  it("open and close popup window", function () {
    cy.get('[class^=BurgerIngredients_ingredients__]').as("burger-ingredients");

    cy.get("@burger-ingredients")
    .find("a")
    .contains("Плоды Фалленианского дерева")
    .as("ingredient-item");

    cy.get('@ingredient-item').click();

    cy.get('[class^=Modal_modal_opened__]').as("modal"); 

    cy.get("@modal")
    .find("button")
    .as("close-button");

    cy.get('@close-button').click();
  });

  it("should submit an order", function () {
    cy.get('[class^=BurgerConstructor_basket__]').as("burger-constructor"); 

    cy.get('@burger-constructor')
    .find("button")
    .contains("Войти в аккаунт")
    .as("submit-button");

    cy.get('@submit-button').click(); 
  });

  it("login into account", function () {
    cy.get('[class^=Auth_form__]').as("auth-form"); 

    cy.get('@auth-form').find('[class^=text]').first().as('email-input');
    cy.get('@auth-form').find('[class^=text]').last().as('password-input');
    cy.get('@auth-form').find('[class^=button_button__]').as('submit-button');

    cy.get('@email-input').type('test-bot@ya.ru', { force: true });
    cy.get('@password-input').type('123123123', { force: true });

    cy.get('@submit-button').click(); 
  });

  it("should re-submit an order", function () {
    cy.get('[class^=BurgerConstructor_basket__]').as("burger-constructor"); 

    cy.get('@burger-constructor')
    .find("button")
    .contains("Оформить заказ")
    .as("submit-button");

    cy.get('@submit-button').click(); 
  });
});