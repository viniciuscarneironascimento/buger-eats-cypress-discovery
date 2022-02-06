

describe('home page', ()=>{
    it('app deve estar online', ()=>{
        cy.viewport(1920, 1080)
        cy.visit('https://buger-eats.vercel.app')
        
        //cy.get('h1').should('have.text', 'Seja um parceiro entregador pela Buger Eats')
        //a linha acima pode ser substituída por
        cy.get('#page-home main h1').should('have.text', 'Seja um parceiro entregador pela Buger Eats')
    })
})