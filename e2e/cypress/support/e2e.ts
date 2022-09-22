// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * テスト画面で社内管理画面へログインするグローバル関数
       * デフォルトでadmin@admin.jpとしてログインするが、引数を指定すると、任意のアカウントにログインできる。
       * @example cy.login();
       * @example cy.login("user@email.com", "my-password");
       */
      login(email?: string, password?: string): Chainable<Element>;
    }
  }
}

// Alternatively you can use CommonJS syntax:
// require('./commands')
