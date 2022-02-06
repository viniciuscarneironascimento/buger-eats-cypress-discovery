//importando a biblioteca faker
var faker = require('faker')
var cpf = require('gerador-validador-cpf')



//criando um bloco
export default {
    //Criar uma função
    deliver: function () {

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()


        //Onde tinha "nome: 'Vinicius Nascimento'," na variável abaixo eu substituo por "nome: `${firstName} ${lastName}`,". Obs.: uso apóstrofo (crase) no lugar da aspa simples


        //Onde tinha "email: 'contato@gmail.com'," substituo por "email: faker.internet.email(firstName),"
        //Onde tinha   cpf: '00011122200',   substituo por cpf: cpf.generate(),

        var data = {
            nome: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whatsapp: '71999999999',
            endereco: {
                cep: '41100720',
                rua: 'Rua Cyridião Durval',
                numero: '423',
                complemento: 'Ap 104',
                bairro: 'Pernambués',
                cidade_uf: 'Salvador/BA'
            },
            metodo_entrega: "Moto",
            cnh: 'cnh-digital.jpg'
        }

        return data
    }
}