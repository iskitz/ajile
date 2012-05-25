/*
 About   : ajile's core Tests Package.
 Author  : Michael I. Lee
 Created : 2011.12.17 @ 10:30 PM PT
 Updated : 2012.05.25 @ 05:41 AM PT
 */

Namespace ("net.ajile.test");			// Define ajile's core tests' namespace.

(net.ajile.test.Ajile = function defineAjileTests (global, undefined) {

   describe ("ajile: com.iskitz.ajile", function testAjileNamespaceExists () {
      it ("com.iskitz.ajile: exists", function testAjileExistsAsAjile () {
         expect (com.iskitz.ajile).not.toBeNull();
         expect (com.iskitz.ajile).not.toBeUndefined();
         expect (global.com.iskitz.ajile).toBeDefined();
         expect (global.com.iskitz.ajile).toBe (com.iskitz.ajile);
      });
   });

	describe ("ajile: Ajile", function testAjileExists () {
		it ("Ajile: exists", function testAjileExistsAsAjile () {
			expect (Ajile).not.toBeNull();
			expect (Ajile).not.toBeUndefined();
			expect (global.Ajile).toBeDefined();
         expect (global.Ajile).toBe (Ajile);
		});
	});

   describe ("ajile: Ajile.AddImportListener()", function testAjileAddImportListener () {
      it ("AddImportListener: exists", function testAjileAddImportListenerExists () {
         expect (Ajile.AddImportListener).toBeDefined();
      });
   });

   describe ("ajile: Ajile.EnableCloak()", function testAjileEnableCloak () {
      it ("EnableCloak: exists", function testAjileEnableCloakExists () {
         expect (Ajile.EnableCloak).toBeDefined();
      });
   });

   describe ("ajile: Ajile.EnableDebug()", function testAjileEnableDebug () {
      it ("EnableDebug: exists", function testAjileEnableDebugExists () {
         expect (Ajile.EnableDebug).toBeDefined();
      });
   });

   describe ("ajile: Ajile.EnableLegacy()", function testAjileEnableLegacy () {
      it ("EnableLegacy: exists", function testAjileEnableLegacyExists () {
         expect (Ajile.EnableLegacy).toBeDefined();
      });
   });

   describe ("ajile: Ajile.EnableOverride()", function testAjileEnableOverride () {
      it ("EnableOverride: exists", function testAjileEnableOverrideExists () {
         expect (Ajile.EnableOverride).toBeDefined();
      });
   });

   describe ("ajile: Ajile.EnableRefresh()", function testAjileEnableRefresh () {
      it ("EnableRefresh: exists", function testAjileEnableRefreshExists () {
         expect (Ajile.EnableRefresh).toBeDefined();
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

   describe ("ajile: Ajile.RemoveImportListener()", function testAjileRemoveImportListener () {
      it ("RemoveImportListener: exists", function testAjileRemoveImportListenerExists () {
         expect (Ajile.RemoveImportListener).toBeDefined();
      });
   });

   describe ("ajile: Ajile.SetOption()", function testAjileSetOption () {
      it ("SetOption: exists", function testAjileSetOptionExists () {
         expect (Ajile.SetOption).toBeDefined();
      });
   });

   describe ("ajile: Ajile.ShowLog()", function testAjileShowLog () {
      it ("ShowLog: exists", function testAjileShowLogExists () {
         expect (Ajile.ShowLog).toBeDefined();
      });
   });

   describe ("ajile: Ajile.Unload()", function testAjileUnload () {
      it ("Unload: exists", function testAjileUnloadExists () {
         expect (Ajile.Unload).toBeDefined();
      });
   });

})(this);
