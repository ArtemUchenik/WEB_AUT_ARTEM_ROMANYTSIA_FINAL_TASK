describe('Automation Practice Form', () => {
  it('fills out and submits the form', () => {
    cy.visit('https://demoqa.com/automation-practice-form');

    // Закрываем баннеры и рекламу, если есть
    cy.get('body').then(($body) => {
      if ($body.find('#close-fixedban').length) {
        cy.get('#close-fixedban').click({ force: true });
      }
    });

    // Заполнение полей
    cy.get('#firstName').type('Ivan');
    cy.get('#lastName').type('Petrov');
    cy.get('#userEmail').type('ivan.petrov@example.com');
    cy.get('label[for="gender-radio-1"]').click(); // Male
    cy.get('#userNumber').type('9123456789');

    // Дата рождения
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__month-select').select('May');
    cy.get('.react-datepicker__year-select').select('1990');
    cy.get('.react-datepicker__day--015:not(.react-datepicker__day--outside-month)').click();

    // Предмет
    cy.get('.subjects-auto-complete__value-container').click().type('Maths{enter}');

    // Хобби
    cy.get('label[for="hobbies-checkbox-1"]').click(); // Sports

    // Загрузка файла
    cy.get('#uploadPicture').selectFile('cypress/fixtures/example.json');

    // Адрес
    cy.get('#currentAddress').type('123 Main Street');

    // Штат и город
    cy.get('#state').click().get('#react-select-3-option-0').click(); // NCR
    cy.get('#city').click().get('#react-select-4-option-0').click(); // Delhi

    // Отправка формы
    cy.get('#submit').click({ force: true });

    // Проверка модального окна
    cy.get('#example-modal-sizes-title-lg').should('contain', 'Thanks for submitting the form');
    cy.get('#closeLargeModal').click({ force: true });
  });
});
