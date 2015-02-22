// Exporting fields for use in tests
exports.fields = {
	user: element(by.id('username')),
	email: element(by.id('email')),
	phone: element(by.id('phone')),
	carrier: element(by.id('carrier')),
	rememberMe: element(by.id('remember-me')),
	btnSignIn: element(by.id('add')),
	btnSignOut: element(by.id('remove'))
}

exports.selectDropdownbyNum = function(element, optionNum) {
	if (optionNum){
	  var options = element.all(by.tagName('option'))   
	    .then(function(options){
	      options[optionNum].click();
	    });
	}
};

exports.clickButtonAndWaitForResolution = function(button) {
    button.click();
    browser.waitForAngular();
};