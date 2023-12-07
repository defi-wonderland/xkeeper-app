/// <reference types="cypress" />

describe('xKeeper Blockchain interaction tests', () => {
  beforeEach(() => {
    cy.visit('/');

    // Connect wallet
    cy.get('[data-test="connect-button"]').click();
  });

  it('create vault', () => {
    cy.visit('/create');
    const vaultName = 'TestVault';
    const userAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    // const functionSignatue = '0xf39Fd6e5';

    cy.contains(/Create Vault/i).should('exist');

    // Checks initial state of form
    cy.get('[data-test="create-vault-alias-input"]').find('input').should('have.value', '');
    cy.get('[data-test="create-vault-owner-input"]').find('input').should('have.value', '');

    // Should appear the user address
    cy.get('[data-test="create-vault-owner-input"]').find('input').should('have.value', userAddress);

    // Adds a vault alias
    cy.get('[data-test="create-vault-alias-input"]').find('input').type(vaultName);

    // Checks that the vault not exist
    cy.get('[data-test="vault-name"]').should('not.exist');
    cy.contains(/Vault Overview/i).should('not.exist');

    // Clicks on the create vault button
    cy.get('[data-test="confirm-create-vault-button"]').click().wait(4000);

    // Checks if the vault was created
    cy.get('[data-test="vault-name"]').contains(vaultName);
    cy.contains(/Vault Overview/i).should('exist');

    // Checks if the vault is empty
    cy.contains(/No relays enabled./i).should('exist');
    cy.contains(/No jobs enabled./i).should('exist');
  });

  it('add new relay', () => {
    const userAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    cy.get('[data-test="vault-card-0"]').click();

    // Checks if the vault is empty
    cy.contains(/No relays enabled./i).should('exist');

    // Adds a new relay
    cy.contains(/Open Relay/i).should('not.exist');
    cy.get('[data-test="add-relay-button"]').click();
    cy.get('[data-test="relay-dropdown-button"]').click();
    cy.get('[data-test="relay-dropdown-option-1"]').click();
    cy.get('[data-test="relay-caller-input"]').find('input').type(userAddress);
    cy.get('[data-test="confirm-new-relay-button"]').click();

    cy.get('[data-test="relay-alias-0"]').should('exist');
  });

  it('add new job', () => {
    const userAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    const functionSignatue = '0xf39Fd6e5';
    cy.get('[data-test="vault-card-0"]').click();

    // Checks if the vault is empty
    cy.contains(/No jobs enabled./i).should('exist');

    // Adds a new job
    cy.contains(/Job 1/i).should('not.exist');
    cy.get('[data-test="add-job-button"]').click();
    cy.get('[data-test="job-address-input"]').find('input').type(userAddress);
    cy.get('[data-test="raw-function-button"]').click();
    cy.get('[data-test="function-signature-input"]').find('input').type(functionSignatue);
    cy.get('[data-test="confirm-new-job-button"]').click();

    cy.get('[data-test="job-alias-0"]').should('exist');
  });

  it('edit relay alias', () => {
    cy.get('[data-test="vault-card-0"]').click();

    // Edit relay alias
    cy.get('[data-test="relay-alias-0"]').click();
    cy.get('[data-test="edit-alias-input"]').find('input').type('{selectAll}{backspace}TestRelay');
    cy.get('[data-test="confirm-edit-alias-button"]').click();

    cy.get('[data-test="relay-alias-0"]').contains('TestRelay');
  });

  it('edit job alias', () => {
    cy.get('[data-test="vault-card-0"]').click();
    // Edit job alias
    cy.get('[data-test="job-alias-0"]').click();
    cy.get('[data-test="edit-alias-input"]').find('input').type('{selectAll}{backspace}TestJob');
    cy.get('[data-test="confirm-edit-alias-button"]').click();

    cy.get('[data-test="job-alias-0"]').contains('TestJob');
  });

  it('revoke relay', () => {
    cy.get('[data-test="vault-card-0"]').click();

    // Revokes the relay
    cy.get('[data-test="no-relays-enabled"]').should('not.exist');
    cy.get('[data-test="relay-options-0"]').click();
    cy.get('[data-test="revoke-button"]').click();
    cy.get('[data-test="confirm-revoke"]').click();

    cy.get('[data-test="no-relays-enabled"]').should('exist');
  });

  it('revoke job', () => {
    cy.get('[data-test="vault-card-0"]').click();

    // Revokes the job
    cy.get('[data-test="no-jobs-enabled"]').should('not.exist');
    cy.get('[data-test="job-options-0"]').click();
    cy.get('[data-test="revoke-button"]').click();
    cy.get('[data-test="confirm-revoke"]').click();

    cy.get('[data-test="no-jobs-enabled"]').should('exist');
  });
});
