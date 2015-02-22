var helper = require('../helpers/helper'),
	options = require('../helpers/options');

describe('should be able to populate fields', function() {
	// Because this isn't a true Angular app
	browser.ignoreSynchronization = true;
	
	browser.get(options.test.url);

	it('username', function() {
		// clear input text in case populated by 'rememberMe'
		helper.fields.user.clear();
		helper.fields.user.sendKeys(options.test.user);
		expect(helper.fields.user.getAttribute('value')).toEqual(options.test.user);
	});
	
	it('email', function() {
		// clear input text in case populated by 'rememberMe'
		helper.fields.email.clear();
		helper.fields.email.sendKeys(options.test.email);
		expect(helper.fields.email.getAttribute('value')).toEqual(options.test.email);
	});
	
	it('phone', function() {
		// clear input text in case populated by 'rememberMe'
		helper.fields.phone.clear();
		helper.fields.phone.sendKeys(options.test.phone);
		expect(helper.fields.phone.getAttribute('value')).toEqual(options.test.phone);
	});
	
	it('carrier', function() {
		// clear input text in case populated by 'rememberMe'
		helper.selectDropdownbyNum(helper.fields.carrier, options.test.carrierIndex);
		expect(helper.fields.carrier.$('option:checked').getText()).toEqual('AT&T');
	});
	
	it('remember-me', function() {
		// TODO: if checked, uncheck it
		// if(helper.fields.rememberMe.getAttribute('checked') != null) { helper.fields.rememberMe.click(); }
		helper.fields.rememberMe.click();
		expect(helper.fields.rememberMe.getAttribute('checked')).toEqual('true');
	});

});