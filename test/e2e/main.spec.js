var helper = require('../helpers/helper'),
	options = require('../helpers/options');

describe('should be able to login/logout to notification list', function() {

	beforeEach(function() {
		// Because this isn't a true Angular app
		
	});

	it('Clicks Sign-In button', function() {
		browser.ignoreSynchronization = true;
		browser.get(options.test.url);
		browser.manage().timeouts().pageLoadTimeout(2000);
		browser.manage().timeouts().implicitlyWait(1000);

		helper.fields.user.sendKeys(options.test.user);
		helper.fields.email.sendKeys(options.test.email);
		helper.fields.phone.sendKeys(options.test.phone);
		helper.selectDropdownbyNum(helper.fields.carrier, options.test.carrierIndex);

		helper.fields.btnSignIn.click();
	});

	it('Should log-in', function() {
		// Indicates the client successfully sent it's request to the server
		expect($('div.alert span').getText()).toBe('Added.');

		// Expect options.test.user to be in myUser ul (this indicates the server
		// signed them in, as the ul is populated by /getUsers)
		$$('#myUsers li').filter(function(elem, index) {
		  return elem.getText().then(function(text) {
		    return text === options.test.user;
		  });
		}).then(function(filteredElements) {
		  expect(filteredElements[0].getText()).toBe(options.test.user);
		});

	});

	it('Clicks Sign-Out button', function() {
		helper.fields.btnSignOut.click();
		browser.sleep(500);
	});

	it('Should log-out', function(){
		// Indicates the client successfully sent it's request to the server
		// $('div.alert span').getText().then(console.log);
		expect($('div.alert span').getText()).toBe('Removed.');

		// Expect options.test.user not to be in myUser ul (this indicates the server
		// signed them out, as the ul is populated by /getUsers)
		$$('#myUsers li').filter(function(elem, index) {
		  return elem.getText().then(function(text) {
		    return text === options.test.user;
		  });
		}).then(function(filteredElements) {
		  // expect(filteredElements[0].isPresent()).toBeFalsy();
		  expect(filteredElements[0]).toBe(undefined);
		});
	});

});