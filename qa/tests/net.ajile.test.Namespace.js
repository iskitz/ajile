/*
 About   : ajile's Namespace Tests Package.
 Author  : Michael Lee (iskitz.com)
 Created : 2011.12.17 @ 11:34 PM PT
 Updated : 2011.05.23 @ 07:18 AM PDT
 */

Namespace ("net.ajile.test");			// Define ajile's core tests' namespace.

(net.ajile.test.Namespace = function defineAjileNamespaceTests (global, undefined) {

	function createManualNamespace (name) {
		!global.net && (global.net = {ajile :{test :{Namespace :{}}}});
		
		return net.ajile.test.Namespace [name] = function ManualNS() {
			return name;
		};
	}

	describe ("ajile: Namespace Exists", function defineAjileNamespaceExistsTests () {
		it ("Namespace: exists", function testAjileNamespaceExists () {
			expect (Namespace).toBeDefined();
			expect (Namespace).not.toBeNull();
			expect (Namespace).not.toBeUndefined();
			expect (global.Namespace).toBeDefined();
		});
	});
	
	describe ("ajile: Namespace: Works", function testAjileGetVersion () {
		it ("Namespace: new single-level", function testAjileNamespaceSingleLevel () {
			delete global.nstesting;				// Make sure the namespace doesn't exist.
			Namespace ("nstesting");				// Create the namespace.
			nstesting.constructor;					// Error if the namespace isn't defined.
 			expect (nstesting).toBeDefined();
			delete this.nstesting;					// Cleanup.
		});
		it ("Namespace: reuse single-level", function testAjileNamespaceSingleLevelReuse () {
			global.nstesting = function nstesting() {
				// Manually create dthe "nstesting" namespace.
				return "nstesting";
			};

			var manualNS = nstesting;
			Namespace ("nstesting");
			expect (manualNS()).toEqual (nstesting());			
			delete this.nstesting;	// Cleanup.
 		});
	});
	
})(this);
