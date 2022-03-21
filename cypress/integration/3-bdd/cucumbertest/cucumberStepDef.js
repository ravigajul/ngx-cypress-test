import { Given,When,Then } from "cypress-cucumber-preprocessor/steps";

const url = 'https://example.cypress.io/todo'
Given('I open cypress example page', () => {
  cy.visit(url)
})

When('I add new todo items',()=>{
    const newItem = 'Feed the cat'
    cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)
})

Then('I validate if the new item is added',()=>{
    cy.get('.todo-list li')
      .should('have.length', 3)
      .last()
      .should('have.text', 'Feed the cat')
})