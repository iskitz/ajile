
/*
 About   : ajile's Namespace Test Suite.
 Author  : Michael Lee (iskitz.com)
 Created : 2011.12.17 @ 11:34 PM PT
 Updated : 2012.06.04 @ 06:30 AM PDT
 */

Namespace ("net.ajile.test");

(net.ajile.test.Namespace = function defineAjileNamespaceTests (global, undefined) {

	function createManualNamespace (name) {
		!global.net && (global.net = {ajile :{test :{Namespace :{}}}});
		
		return net.ajile.test.Namespace [name] = function ManualNS() {
			return name;
		};
	}

	describe ("ajile: Namespace", function defineAjileNamespaceTests () {
		it ("Exists in the global scope.", function testAjileNamespaceExists () {
			expect (Namespace).not.toBeNull();
			expect (Namespace).not.toBeUndefined();
			expect (global.Namespace).toBeDefined();
			expect (global.Namespace).toBe (Namespace);
		});

		it ("Supports single-level namespace creation.", function testAjileNamespaceSingleLevel () {
			delete global.nstesting;				// Make sure the namespace doesn't exist.
			Namespace ("nstesting");				// Create the namespace.
			nstesting.constructor;					// Error if the namespace isn't defined.
 			expect (nstesting).toBeDefined();
			delete this.nstesting;					// Cleanup.
		});

		it ("Supports single-level namespace reuse.", function testAjileNamespaceSingleLevelReuse () {
			global.nstesting = function nstesting() {
				// Manually created the "nstesting" namespace.
				return "nstesting";
			};

			var manualNS = nstesting;
			Namespace ("nstesting");
			expect (manualNS()).toEqual (nstesting());			
			delete this.nstesting;	// Cleanup.
 		});
	});
	
})(this);
