

class SignupPage {

  go() {
    cy.visit('/')
    cy.get('a[href="/deliver"]').click()
    cy.get('#page-deliver form h1').should('have.text','Cadastre-se para  fazer entregas')
  }

  fillForm(deliveryman) {
    cy.get('input[name="fullName"]').type(deliveryman.name)
    cy.get('input[name="cpf"]').type(deliveryman.cpf)
    cy.get('input[name="email"]').type(deliveryman.email)
    cy.get('input[name="whatsapp"]').type(deliveryman.whatsapp)

    cy.get('input[name="postalcode"]').type(deliveryman.address.postalcode)
    cy.get('input[type=button][value="Buscar CEP"]').click()

    cy.get('input[name="address-number"]').type(deliveryman.address.number)
    cy.get('input[name="address-details"]').type(deliveryman.address.details)
    cy.get('input[name="address"]').should('have.value', deliveryman.address.street)
    cy.get('input[name="district"]').should('have.value', deliveryman.address.district)
    cy.get('input[name="city-uf"]').should('have.value',deliveryman.address.city_uf )
    cy.contains('.delivery-method li', deliveryman.delivery_method.second_method).click()
    cy.get('div[class="dropzone"]').selectFile('cypress/fixtures/images/cnh-digital.jpg', { action: 'drag-drop' })

  }

  submit() {
    cy.get('form button[type="submit"]').click()
  }

  modalContentShouldBe(expectedMessage) {
    cy.get('.swal2-container .swal2-html-container').should('have.text', expectedMessage)
  }

  alerMessageShouldBe(expectedMessage) {
    //Buscando a informação de errro do sistema
    //cy.get('.alert-error').should('have.text', expectedMessage)
    cy.contains('.alert-error', expectedMessage).should('be.visible')
  }
}

export default new SignupPage()
