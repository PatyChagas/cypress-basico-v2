/// <reference types='Cypress' />

describe('Central de Atendimento ao Cliente TAT', function () {
	beforeEach(() => {
		cy.visit('./src/index.html');
	});

	it('verifica o título da aplicação', () => {
		cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
	});

	it('preenche os campos obrigatórios e envia o formulário', () => {
		const texto =
			'texto aleatório de preenchimento de input para testetexto aleatório de preenchimento de input para testetexto aleatório de preenchimento de input para testetexto aleatório de preenchimento de input para testetexto aleatório de preenchimento de input para teste';
		cy.get('#firstName').type('Patrícia');
		cy.get('#lastName').type('Chagas');
		cy.get('#email').type('p_zirtacai@hotmail.com');
		cy.get('#open-text-area').type(texto, { delay: 0 });
		cy.contains('button', 'Enviar').click();
		//cy.get('button[type="submit"]').click()
		//cy.get('.button').click()
		cy.get('.success').should('be.visible');
	});

	it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
		cy.get('#firstName').type('Patrícia');
		cy.get('#lastName').type('Chagas');
		cy.get('#email').type('emeio');
		cy.get('#open-text-area').type('teste');
		cy.contains('button', 'Enviar').click();
		//cy.get('.button').click()
		cy.get('.error').should('be.visible');
	});

	it('exercício extra 3', () => {
		cy.get('#phone').type('Patrícia').should('have.value', '');
	});

	it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
		cy.get('#firstName').type('Patrícia');
		cy.get('#lastName').type('Chagas');
		cy.get('#email').type('patricia@chagas.com');
		cy.get('#phone-checkbox').click();
		cy.get('#open-text-area').type('teste');
		cy.contains('button', 'Enviar').click();
		//cy.get('.button').click()
		cy.get('.error').should('be.visible');
	});

	it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
		cy.get('#firstName')
			.type('Patrícia')
			.should('have.value', 'Patrícia')
			.clear()
			.should('have.value', '');
		cy.get('#lastName')
			.type('Chagas')
			.should('have.value', 'Chagas')
			.clear()
			.should('have.value', '');
		cy.get('#email')
			.type('patricia@chagas.com')
			.should('have.value', 'patricia@chagas.com')
			.clear()
			.should('have.value', '');
		cy.get('#phone')
			.type('41988923180')
			.should('have.value', '41988923180')
			.clear()
			.should('have.value', '');
	});

	it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
		cy.contains('button', 'Enviar').click();
		//cy.get('.button').click()
		cy.get('.error').should('be.visible');
	});

	it('envia o formuário com sucesso usando um comando customizado', () => {
		cy.fillMandatoryFieldsAndSubmit();
		cy.get('.success').should('be.visible');
	});

	it('seleciona um produto (YouTube) por seu texto', () => {
		cy.get('#product').select('YouTube').should('have.value', 'youtube');
	});

	it('seleciona um produto (Mentoria) por seu valor (value)', () => {
		cy.get('#product').select('mentoria').should('have.value', 'mentoria');
	});

	it('seleciona um produto (Blog) por seu índice', () => {
		cy.get('#product').select(1).should('have.value', 'blog');
	});

	it('marca o tipo de atendimento "Feedback"', () => {
		cy.get('input[type="radio"][value="feedback"]')
			.check()
			.should('have.value', 'feedback');
	});

	it('marca cada tipo de atendimento', () => {
		cy.get('input[type="radio"]')
			.should('have.length', 3)
			.each(($radio) => {
				cy.wrap($radio).check();
				cy.wrap($radio).should('be.checked');
			});
	});

	it('marca ambos checkboxes, depois desmarca o último', () => {
		cy.get('input[type="checkbox"]')
			.check()
			.should('be.checked')
			.last()
			.uncheck()
			.should('not.be.checked');
	});

	it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
		cy.get('#firstName').type('Patrícia');
		cy.get('#lastName').type('Chagas');
		cy.get('#email').type('patricia@chagas.com');
		cy.get('#phone-checkbox').check();
		cy.get('#open-text-area').type('teste');
		cy.contains('button', 'Enviar').click();
		cy.get('.error').should('be.visible');
	});

	it('seleciona um arquivo da pasta fixtures', () => {
		cy.get('input[type="file"]#file-upload')
			.should('not.have.value')
			.selectFile('cypress/fixtures/example.json')
			.should(($input) => {
				expect($input[0].files[0].name).to.equal('example.json');
				//	console.log($input)
			});
	});

	it('seleciona um arquivo simulando um drag-and-drop', () => {
		cy.get('input[type="file"]#file-upload')
			.should('not.have.value')
			.selectFile('cypress/fixtures/example.json', {
				action: 'drag-drop',
			})
			.should(($input) => {
				expect($input[0].files[0].name).to.equal('example.json');
			});
	});

	it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
		cy.fixture('example.json').as('sampleFile');
		cy.get('input[type="file"]#file-upload')
			.selectFile('@sampleFile')
			.should(($input) => {
				expect($input[0].files[0].name).to.equal('example.json');
			});
	});

	it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
		cy.get('#privacy a').should('have.attr', 'target', '_blank');
	});

	it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
		cy.get('#privacy a').invoke('removeAttr', 'target').click();
		cy.contains('Talking About Testing').should('be.visible');
	});
});

//npm run cy:open
//npm run cy:open:mobile
//npm run test
//npm run test:mobile
