<h1>Testing qNotify</h1>

Although this is not an AngularJS application, I have written up tests to verify my app functions properly using <a href="http://angular.github.io/protractor/#/">Protractor</a>.

To see these tests in action, please take a look at this <a href="https://dl.dropboxusercontent.com/u/11584755/ShareX/2015/02/qNotify_ProtractorTest.mp4">quick video demonstration</a>.

Testing variables are configurable in <b>./helpers/options.js</b>:
<pre>exports.test = {
	// url: "https://localhost/qNotify/",
	url: "https://tharris7.lab.novell.com/qNotify/",
	user: "user1",
	email: "user1@domain.com",
	phone: "5302001919",
	carrierIndex: 2
};</pre>

There is a dependency on the Novell VPN being connected for a couple tests to pass, as this app was designed to be hosted within the Novell Firewall.
