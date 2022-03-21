///<reference types = "cypress"/>
describe('first test suite', () => {

    it('first test', () => {
        cy.visit('http://localhost:4200/') //Navigate to url in cypress.json baseurl
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        cy.wait(5)
        //by tagname
        cy.get('input')

        //by id
        cy.get('#inputFirstName')

        //by class
        cy.get('.input-full-width')

        //by attribute
        cy.get('[placeholder="First Name"]')

        //by class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by id and attribute
        cy.get('input#inputFirstName[placeholder="First Name"]')

        //by two attributes
        cy.get('[placeholder="First Name"][class="input-full-width size-medium shape-rectangle"]')
    })

    it('Parent Child locator test', () => {
        cy.visit('http://localhost:4200/') //Navigate to url in cypress.json baseurl
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('#inputEmail1').parents('form').find('button') //parent child approach

        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .parents('form')
            .find('input')
    })

    it.only('alternate way to find child using contains', () => {
        cy.visit('http://localhost:4200/') //Navigate to url in cypress.json baseurl
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card','Horizontal form').find('#inputEmail3').type('ravi@test.com')
    })

    it('alternate way to find child from parent test', () => {
        cy.visit('http://localhost:4200/') //Navigate to url in cypress.json baseurl
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //alternate parent child approach
        cy.get('#inputEmail3').parents('nb-card').find('span.custom-checkbox').click()


    })


    it('then and wrap functions', () => {
        cy.visit('http://localhost:4200/') //Navigate to url in cypress.json baseurl
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //cypress chainable jquery assertion
        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

        //this might fail due to asysnchronous nature of java script
        // const grid=cy.contains('nb-card', 'Using the Grid')
        // grid.find('[for="inputEmail1"]').should('contain', 'Email')
        // grid.find('[for="inputPassword2"]').should('contain', 'Password')

        //Then is used since cypress is asynchronus so that common element can assigned and used
        cy.contains('nb-card', 'Using the Grid').then(usingTheGridForm => {
            const strEmail = usingTheGridForm.find('[for="inputEmail1"]').text()
            const strPwd = usingTheGridForm.find('[for="inputPassword2"]').text()
            expect(strEmail).to.equal('Email')
            expect(strPwd).to.equal('Password')

            //switch back to cypress chain of commands we use wrap
            cy.wrap(usingTheGridForm).should('contain', 'Email')
            cy.wrap(usingTheGridForm).should('contain', 'Password')
        })

        
    })
    it('Invoke function', () => {
        cy.visit('http://localhost:4200/') //Navigate to url in cypress.json baseurl
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //method1
        cy.get('[for="inputEmail1"]').should('contain','Email')
        
        //method2
        cy.get('[for="inputEmail1"]').then(label=>{
            expect(label.text()).to.equal('Email')
        })

        //method3
        cy.get('[for="inputEmail1"]').invoke('text').then(text=>{
            expect(text).to.equal('Email')
        })

        //method4 to check if the check box is checked
        cy.contains('nb-card','Horizontal form').find('nb-checkbox').click()
        .find('.custom-checkbox')
        .invoke('attr','class')
        .should('contain','checked')

         //method5 to check if the check box is checked
         cy.contains('nb-card','Horizontal form').find('nb-checkbox')
         .click()
         .click() //extra click since above lines will uncheck the check box
         .find('span.custom-checkbox')
         .invoke('attr','class')
         .then(strValue=>{
            expect(strValue).to.contain('checked')
         })


        })
})

