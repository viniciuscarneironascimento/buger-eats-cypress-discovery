//Importadndo o PageObject que faz referência a este teste
//Quando digita "../" o sistema reconhece a pasta onde está este PageObject, no caso na pasta "pages"
//Uma vez importada, temos que instanciar esta classe page logo após as variáveis abaixo
// import SignupPage from '../pages/SignupPage'

//Outra forma é receber o import através da variável que recebe a instância 
//De  "import SignupPage from '../pages/SignupPage'"
//Para  "import SignupPage from '../pages/SignupPage'"
import signup from '../pages/SignupPage'

import SignupFactory from '../factories/SignupFactory'




describe('Cadastro', () => {

    // //Criando GANCHOS
    // before(function () {
    //     cy.log('Tudo aqui é executado uma única vez ANTES de TODOS os casos de testes')
    // })

    // //Criando GANCHOS
    // beforeEach(function () {
    //     cy.log('Tudo aqui é executado SEMPRE ANTES de CADA os caso de teste')
    // })

    // //Criando GANCHOS
    // afterEach(function () {
    //     cy.log('Tudo aqui é executado SEMPRE DEPOIS de CADA os caso de teste')
    // })

    // //Criando GANCHOS
    // after(function () {
    //     cy.log('Tudo aqui é executado uma única vez DEPOIS de TODOS os casos de testes')
    // })



    //O before foi comentado pois passei a usar  "var entregador = SignupFactory.deliver()" logo abaixo
    // beforeEach(function () {
    //     cy.fixture('entregador').then((item) => {
    //         this.entregador = item
    //     })
    // })


    it.skip('Usuário deve se tornar um entregador', function () {
        // cy.viewport(1920, 1080)
        // cy.visit('https://buger-eats.vercel.app')

        // cy.get('a[href="/deliver"]').click()
        // cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')



        //criando massa de teste com uma variável que recebe um objeto do java script neste formato
        //A MASSA foi comentada pois está sendo utilizada no FIXTURES como JSON

        // var entregador = {
        //     nome: 'Vinicius Nascimento',
        //     cpf: '00011122200',
        //     email: 'contato@gmail.com',
        //     whatsapp: '71999999999',
        //     endereco: {
        //         cep: '41100720',
        //         rua: 'Rua Cyridião Durval',
        //         numero: '423',
        //         complemento: 'Ap 104',
        //         bairro: 'Pernambués',
        //         cidade_uf: 'Salvador/BA'
        //     },
        //     metodo_entrega: "Moto",
        //     cnh: 'cnh-digital.jpg'
        // }


        //No lugar da massa de teste acima, vou escrever a linha abaixo
        var entregador = SignupFactory.deliver()



        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'

        //Comentar a linha abaixo pois a instanciação foi implementada no final da classe pageobject e ao importar aqui no topo: 
        //var signup = new SignupPage()
        signup.go()
        //troca alinha abaixo pela seguinte
        // signup.fillForm(entregador)

        //mais uma vez vou comentar a linha abaixo
        // signup.fillForm(this.entregador.signup)
        //E substituir por 
        signup.fillForm(entregador)

        signup.submit()
        signup.assert(expectedMessage)



        // cy.get('input[name="name"]').type(entregador.nome)
        // cy.get('input[name="cpf"]').type(entregador.cpf)
        // cy.get('input[name="email"]').type(entregador.email)
        // cy.get('input[name="whatsapp"]').type(entregador.whatsapp)

        // cy.get('input[name="postalcode"]').type(entregador.endereco.cep)
        // cy.get('input[type="button"][value="Buscar CEP"]').click()

        // cy.get('input[name="address-number"]').type(entregador.endereco.numero)
        // cy.get('input[name="address-details"]').type(entregador.endereco.complemento)

        // //Fazer checkpoint aqui para validar se o campo preenchido automaticamente pela busca do CEP condiz com o valor da massa de teste, ou seja, não valida pelo texto apresentado no campo e sim pela propriedade "value". Portanto o should deve validar pelo "have.value"
        // cy.get('input[name="address"]').should('have.value', entregador.endereco.rua)
        // cy.get('input[name="district"]').should('have.value', entregador.endereco.bairro)
        // cy.get('input[name="city-uf"]').should('have.value', entregador.endereco.cidade_uf)

        // //Utiliza função contains do cypress onde consegue usar o localizador com texto
        // cy.contains('.delivery-method li', entregador.metodo_entrega).click()

        // //
        // cy.get('input[accept^="image"]').attachFile('/images/' + entregador.cnh)

        // cy.get('form button[type="submit"]').click()

        // cy.get('.swal2-container .swal2-html-container').should('have.text', expectedMessage)

    })

    it.skip('CPF incorreto', function () {

        //Para esta massa de teste funcionar repito a chamada da variável e mudo apenas o CPF inválido
        var entregador = SignupFactory.deliver()
        entregador.cpf = '199875664AA'


        signup.go()
        //Substituo pela linha abaixo
        // signup.fillForm(this.entregador.cpf_invalido)
        signup.fillForm(entregador)
        signup.submit()
        signup.assert2('Oops! CPF inválido')
    })


    it.skip('email incorreto', function () {

        //Para esta massa de teste funcionar repito a chamada da variável e mudo apenas o CPF inválido
        var entregador = SignupFactory.deliver()
        entregador.email = 'next.me'


        signup.go()
        // signup.fillForm(this.entregador.email_invalido)
        signup.fillForm(entregador)
        signup.submit()
        signup.assert2('Oops! Email com formato inválido.')
    })


    context('Validar campos obrigatórios', function () {

        //adiciono uma constante do tipo array para criar a MASSA DE TESTE que representa as mensagens de validação
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o e-mail' },
            { field: 'cep', output: 'É necessário informar o CEP' },
            { field: 'endereco', output: 'É necessário informar o número do endereço' },
            { field: 'metodo_entrea', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        //O BEFORE é executado antes de cada caso de teste 'Tudo aqui é executado uma única vez ANTES de TODOS os casos de testes'
        before(function () {
            signup.go()
            signup.submit()
        })

        //Fazendo loop (forEach) no array "messages"
        messages.forEach(function (msg) {

            //Criando casos de teste (IT) dinâmicos utilizando o nome do campo (field) concatenado com o texto "is requerid" que será aprewentado na execução do cypress
            it(`${msg.field} é obrigatório`, function () {
                //Executando para cada loop a função "assert2" do pageObject SignupPages.js para validar cada mensagem de alerta
                signup.assert2(msg.output)
            })
        })
    })


    //Criar um CONTEXTO para substituir o IT abaixo
    // it('Validar campos obrigatórios', function () {
    //     signup.go()
    //     signup.submit()
    //     signup.assert2('É necessário informar o nome')
    //     signup.assert2('É necessário informar o CPF')
    //     signup.assert2('É necessário informar o email')
    //     signup.assert2('É necessário informar o CEP')
    //     signup.assert2('É necessário informar o número do endereço')
    //     signup.assert2('Selecione o método de entrega')
    //     signup.assert2('Adicione uma foto da sua CNH')
    // })


})
