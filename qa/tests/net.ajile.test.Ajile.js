/*
 About   : ajile's core Tests Package.
 Author  : Michael I. Lee
 Created : 2011.12.17 @ 10:30 PM PT
 Updated : 2011.12.17 @ 10:30 PM PT
 */

Namespace ("net.ajile.test");			// Define ajile's core tests' namespace.

(net.ajile.test.Ajile = function defineAjileTests (global, undefined) {

	describe ("ajile: Exists", function testAjileExists () {
		it ("ajile: Exists as Ajile", function testAjileExistsAsAjile () {
			expect (Ajile).toBeDefined();
			expect (Ajile).not.toBeNull();
			expect (Ajile).not.toBeUndefined();
			expect (global.Ajile).toBeDefined();
		});
	});

	describe ("ajile: Ajile.GetVersion()", function testAjileGetVersion () {
		it ("GetVersion: exists", function testAjileGetVersionExists () {
			expect (Ajile.GetVersion).toBeDefined();
		});
		it ("GetVersion: works", function testAjileGetVersionWorks () {
			expect (Ajile.GetVersion()).toEqual ("1.2.1");
		});
	});

})(this);
