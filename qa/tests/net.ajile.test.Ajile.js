/*
 About   : ajile's core Tests Package.
 Author  : Michael Lee [iskitz.com]
 Created : 2011.12.17 @ 10:30 PM PT
 Updated : 2012.06.05 @ 03:52 AM PT
 */

Namespace ("net.ajile.test");

(net.ajile.test.Ajile = function defineAjileTests (global, undefined) {

   describe ("ajile:", function testAjileNamespaceExists () {
		it ("Exists globally as Ajile.", function testAjileExistsAsAjile () {
			expect (Ajile).not.toBeNull();
			expect (Ajile).not.toBeUndefined();
			expect (global.Ajile).toBeDefined();
         expect (global.Ajile).toBe (Ajile);
		});

      it ("Exists globally as com.iskitz.ajile.", function testAjileExistsAsComIskitzAjile () {
         expect (com.iskitz.ajile).not.toBeNull();
         expect (com.iskitz.ajile).not.toBeUndefined();
         expect (global.com.iskitz.ajile).toBeDefined();
         expect (global.com.iskitz.ajile).toBe (com.iskitz.ajile);
      });
	});

   describe ("ajile: Ajile.AddImportListener()", function testAjileAddImportListener () {
      it ("Exists on global Ajile object.", function testAjileAddImportListenerExists () {
         expect (Ajile.AddImportListener).toBeDefined();
      });

      it ("Works with in-memory Imports.", function testAjileAddImportListenerWorks () {
         var  itWorked  = false
            , namespace = "net.ajile.test.Ajile.AddImportListener"
            ;
         net.ajile.test.Ajile.AddImportListener = {InMemoryWorks: Math.random()};

         Ajile.AddImportListener (namespace, function importListenerWorks (moduleName) {
            Ajile.RemoveImportListener (moduleName, arguments.callee);
            itWorked = true;
         });

         runs (function importSomething() {
            Import (namespace);
         });

         waitsFor (function didAddImportListenerWork () {
            return itWorked; 
         }, "AddImportListener failed with in-memory Import.", 500);

         runs (function reportResult () {
            expect (AddImportListener).toBe (net.ajile.test.Ajile.AddImportListener);
            itWorked && delete (global.AddImportListener) && Ajile.Unload (namespace);
         });
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
