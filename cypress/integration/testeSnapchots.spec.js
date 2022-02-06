

//Instalar antes npm install --save-dev cypress-image-snapshot
// npm install --save-dev cypress-image-snapshot

// Adicione o código abaixo no caminho </cypress/plugins/index.js:
// const {
//   addMatchImageSnapshotPlugin,
// } = require('cypress-image-snapshot/plugin');
// module.exports = (on, config) => {
//   addMatchImageSnapshotPlugin(on, config);
// };

// E depois adicione o comando no caminh </cypress/support/commands.js add:
// import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
// addMatchImageSnapshotCommand();

describe('Home', () => {
    it.skip('should render on desktop in production', () => {
        cy.viewport(1920, 1080)
        // cy.visit('https://buger-eats.vercel.app/');
        cy.visit('https://buger-eats.vercel.app/deliver');
        // cy.positionStickyElementsAbsolutly();
        cy.matchImageSnapshot('home');
        // cy.resetStickyElements();
    });

    it.skip('should render on desktop in TI env', ()=> {
        cy.viewport(1920, 1080)
        // cy.visit('https://buger-eats.vercel.app/deliver');
        cy.visit('https://buger-eats.vercel.app/');
        // cy.positionStickyElementsAbsolutly();
         cy.matchImageSnapshot('home');
        // cy.resetStickyElements();
    })
})