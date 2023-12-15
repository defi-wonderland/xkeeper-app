describe('xKeeper Blockchain interaction tests', () => {
  beforeEach(() => {
    // Mocks the getPrices function
    cy.intercept('GET', 'https://coins.llama.fi/**', {
      statusCode: 200,
      body: {},
    });
  });

  it('create vault', () => {
    const vaultName = 'TestVault';
    const userAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

    cy.visit('/create');
    cy.contains(/Create Vault/i).should('exist');

    // Checks initial state of form
    cy.getDataTest('create-vault-alias-input').find('input').should('have.value', '');
    cy.getDataTest('create-vault-owner-input').find('input').should('have.value', '');

    cy.getDataTest('connect-button').click();

    // Should appear the user address
    cy.getDataTest('create-vault-owner-input').find('input').should('have.value', userAddress);

    // Adds a vault alias
    cy.getDataTest('create-vault-alias-input').find('input').type(vaultName);

    // Checks that the vault not exist
    cy.getDataTest('vault-name').should('not.exist');
    cy.contains(/Vault Overview/i).should('not.exist');

    // Clicks on the create vault button
    cy.getDataTest('confirm-create-vault-button').click();

    // Checks if the vault was created
    cy.contains(/Vault Overview/i).should('exist');

    // Checks if the vault is empty
    cy.contains(/No relays enabled./i).should('exist');
    cy.contains(/No jobs enabled./i).should('exist');
  });

  beforeEach(() => {
    cy.visit('/');

    // Connect wallet
    cy.getDataTest('connect-button').click();
  });

  it('add new relay', () => {
    const userAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    cy.getDataTest('vault-card-0').click();

    // Checks if the vault is empty
    cy.contains(/No relays enabled./i).should('exist');

    // Adds a new relay
    cy.contains(/Open Relay/i).should('not.exist');
    cy.getDataTest('add-relay-button').click();
    cy.getDataTest('relay-dropdown-button').click();
    cy.getDataTest('relay-dropdown-option-1').click();
    cy.getDataTest('relay-caller-input').find('input').type(userAddress);
    cy.getDataTest('confirm-new-relay-button').click();

    cy.getDataTest('relay-alias-0').should('exist');
  });

  it('add new job', () => {
    const userAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    const functionSignatue = '0xf39Fd6e5';
    cy.getDataTest('vault-card-0').click();

    // Checks if the vault is empty
    cy.contains(/No jobs enabled./i).should('exist');

    // Adds a new job
    cy.contains(/Job 1/i).should('not.exist');
    cy.getDataTest('add-job-button').click();
    cy.getDataTest('job-address-input').find('input').type(userAddress);
    cy.getDataTest('raw-function-button').click();
    cy.getDataTest('function-signature-input').find('input').type(functionSignatue);
    cy.getDataTest('confirm-new-job-button').click();

    cy.getDataTest('job-alias-0').should('exist');
  });

  it('edit relay alias', () => {
    cy.getDataTest('vault-card-0').click();

    // Edit relay alias
    cy.getDataTest('relay-alias-0').click();
    cy.getDataTest('edit-alias-input').find('input').type('{selectAll}{backspace}TestRelay');
    cy.getDataTest('confirm-edit-alias-button').click();

    cy.getDataTest('relay-alias-0').contains('TestRelay');
  });

  it('edit job alias', () => {
    cy.getDataTest('vault-card-0').click();
    // Edit job alias
    cy.getDataTest('job-alias-0').click();
    cy.getDataTest('edit-alias-input').find('input').type('{selectAll}{backspace}TestJob');
    cy.getDataTest('confirm-edit-alias-button').click();

    cy.getDataTest('job-alias-0').contains('TestJob');
  });

  it('revoke relay', () => {
    cy.getDataTest('vault-card-0').click();

    // Revokes the relay
    cy.getDataTest('no-relays-enabled').should('not.exist');
    cy.getDataTest('relay-options-0').click();
    cy.getDataTest('revoke-button').click();
    cy.getDataTest('confirm-revoke').click();

    cy.getDataTest('no-relays-enabled').should('exist');
  });

  it('revoke job', () => {
    cy.getDataTest('vault-card-0').click();

    // Revokes the job
    cy.getDataTest('no-jobs-enabled').should('not.exist');
    cy.getDataTest('job-options-0').click();
    cy.getDataTest('revoke-button').click();
    cy.getDataTest('confirm-revoke').click();

    cy.getDataTest('no-jobs-enabled').should('exist');
  });
});
