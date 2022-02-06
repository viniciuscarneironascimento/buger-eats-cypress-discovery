
//Classe que representa a página de cadastro
class SignupPage {

    //Criando função, basta dar um nome seguido de parêntese. Não precisa da palavra reservada "function" antes
    //Esta função irá fazer o acesso a página
    go() {

        //O viewport e a URL podem ser padronizados no arquivo de configuração "cypress.json"
        //cy.viewport(1920, 1080)
        // cy.visit('https://buger-eats.vercel.app')
        cy.visit('/')

        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    //Esta função ficará encarregada de preencher todo o cadastro do entregador
    //A massa de teste não é copiada para cá, a função recebe argumento
    fillForm(entregador) {
        cy.get('input[name="fullName"]').type(entregador.nome)
        cy.get('input[name="cpf"]').type(entregador.cpf)
        cy.get('input[name="email"]').type(entregador.email)
        cy.get('input[name="whatsapp"]').type(entregador.whatsapp)

        cy.get('input[name="postalcode"]').type(entregador.endereco.cep)
        cy.get('input[type="button"][value="Buscar CEP"]').click()

        cy.get('input[name="address-number"]').type(entregador.endereco.numero)
        cy.get('input[name="address-details"]').type(entregador.endereco.complemento)

        //Fazer checkpoint aqui para validar se o campo preenchido automaticamente pela busca do CEP condiz com o valor da massa de teste, ou seja, não valida pelo texto apresentado no campo e sim pela propriedade "value". Portanto o should deve validar pelo "have.value"
        cy.get('input[name="address"]').should('have.value', entregador.endereco.rua)
        cy.get('input[name="district"]').should('have.value', entregador.endereco.bairro)
        cy.get('input[name="city-uf"]').should('have.value', entregador.endereco.cidade_uf)

        //Utiliza função contains do cypress onde consegue usar o localizador com texto
        cy.contains('.delivery-method li', entregador.metodo_entrega).click()

        //a imagem tem que estar na pasta fixtures/images
        cy.get('input[accept^="image"]').attachFile('/images/' + entregador.cnh)
    }

    submit() {
        cy.get('form button[type="submit"]').click()
    }

    assert(expectedMessage) {
        cy.get('.swal2-container .swal2-html-container').should('have.text', expectedMessage)
    }

    assert2(expectedMessage) {
        // cy.get('.alert-error').should('have.text', expectedMessage)
        cy.contains('.alert-error', expectedMessage)
    }
  

}

//No final tenho que exportar para que possa utilizar na camada de testes
//export default SignupPage;

//Outra forma é exportar a classe já INSTANCIADA para a camada de testes
export default new SignupPage;

