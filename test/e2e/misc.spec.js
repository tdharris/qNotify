describe('Misc tests', function() {

	beforeEach(function() {
		// Because this isn't a true Angular app
		browser.ignoreSynchronization = true;

		browser.get('https://localhost/qnotify');
	});
  
  	it('should have a title', function() {
  		expect(browser.getTitle()).toEqual('qNotify');
  	});

	it('should set username as autofocus', function() {
		expect(element(by.id('username')).getAttribute('autofocus')).toEqual('true');
	});

});