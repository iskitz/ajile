/*
 About   : ajile's core Tests Package.
 Author  : Michael Lee [iskitz.com]
 Created : 2011.12.17 @ 22:30-08.00
 Updated : 2013.02.04 @ 05:56-08.00
 */

Namespace ("net.ajile.test");
Include   ("net.ajile.test.Ajile.AddImportListener");

(net.ajile.test.Ajile = function defineAjileTests (global, undefined) {

   describe ("ajile:", function testAjileNamespaceExists () {
      it ("Ajile exists.", function testAjileExistsAsAjile () {
         expect (Ajile).toBeDefined();
         expect (global.Ajile).toBeDefined();
         expect (global.Ajile).toBe (Ajile);
      });
      
      it ("com.iskitz.ajile exists.", function testAjileExistsAsCIA () {
         expect (com.iskitz.ajile).toBeDefined();
         expect (global.com.iskitz.ajile).toBeDefined();
         expect (global.com.iskitz.ajile).toBe (com.iskitz.ajile);
      });
   });

   describe ("ajile: Ajile.EnableCloak()", function testAjileEnableCloak () {
      it ("Ajile.EnableCloak: method.", function testAjileEnableCloakExists () {
         expect (Ajile.EnableCloak).toBeDefined();
         expect (typeof Ajile.EnableCloak).toBe("function");
      });
   });

   describe ("ajile: Ajile.EnableDebug()", function testAjileEnableDebug () {
      it ("Ajile.EnableDebug: method.", function testAjileEnableDebugExists () {
         expect (Ajile.EnableDebug).toBeDefined();
         expect (typeof Ajile.EnableDebug).toBe("function");
      });
   });

   describe ("ajile: Ajile.EnableLegacy()", function testAjileEnableLegacy () {
      it ("Ajile.EnableLegacy: method.", function testAjileEnableLegacyExists () {
         expect (Ajile.EnableLegacy).toBeDefined();
         expect (typeof Ajile.EnableLegacy).toBe("function");
      });
   });

   describe ("ajile: Ajile.EnableOverride()", function testAjileEnableOverride () {
      it ("Ajile.EnableOverride: method.", function testAjileEnableOverrideExists () {
         expect (Ajile.EnableOverride).toBeDefined();
         expect (typeof Ajile.EnableOverride).toBe("function");
      });
   });

   describe ("ajile: Ajile.EnableRefresh()", function testAjileEnableRefresh () {
      it ("Ajile.EnableRefresh: method.", function testAjileEnableRefreshExists () {
         expect (Ajile.EnableRefresh).toBeDefined();
         expect (typeof Ajile.EnableRefresh).toBe("function");
      });
   });

   describe ("ajile: Ajile.GetVersion()", function testAjileGetVersion () {
      it ("Ajile.GetVersion: method.", function testAjileGetVersionExists () {
         expect (Ajile.GetVersion).toBeDefined();
         expect (typeof Ajile.GetVersion).toBe("function");
      });
      it ("Ajile.GetVersion(): 1.7.3", function testAjileGetVersionWorks () {
         expect (Ajile.GetVersion()).toEqual ("1.7.3");
      });
   });

   describe ("ajile: Ajile.RemoveImportListener()", function testAjileRemoveImportListener () {
      it ("Ajile.RemoveImportListener: method.", function testAjileRemoveImportListenerExists () {
         expect (Ajile.RemoveImportListener).toBeDefined();
         expect (typeof Ajile.RemoveImportListener).toBe("function");
      });
   });

   describe ("ajile: Ajile.SetOption()", function testAjileSetOption () {
      it ("Ajile.SetOption: method.", function testAjileSetOptionExists () {
         expect (Ajile.SetOption).toBeDefined();
         expect (typeof Ajile.SetOption).toBe("function");
      });
   });

   describe ("ajile: Ajile.ShowLog()", function testAjileShowLog () {
      it ("Ajile.ShowLog: method.", function testAjileShowLogExists () {
         expect (Ajile.ShowLog).toBeDefined();
         expect (typeof Ajile.ShowLog).toBe("function");
      });
   });

   describe ("ajile: Ajile.Unload():", function testAjileUnload () {
      it ("Ajile.Unload: method.", function testAjileUnloadExists () {
         expect (Ajile.Unload).toBeDefined();
         expect (typeof Ajile.Unload).toBe("function");
      });

      it ('Ajile.Unload ("My.Namespace"); removes My.Namespace from the global scope.', function testAjileUnloadNS () {
         net.ajile.test.Unload = {Member: true};
         Ajile.Unload ("net.ajile.test.Unload.Member");
         expect (net.ajile.test.Unload.Member).not.toBeDefined();
         expect (net.ajile.test.Unload).toBeDefined();
      });

      it ('Ajile.Unload ("My.*"); removes the My namespace and its members from the global scope.', function testAjileUnloadNSMembers () {
         net.ajile.test.Unload = {Member: {works: true}};
         Ajile.Unload ("net.ajile.test.Unload.*");
         expect (net.ajile.test.Unload).not.toBeDefined();
      });

      it ('Ajile.Unload (); removes Ajile and com.iskitz.ajile from the global scope.', function testAjileUnloadAll () {
         /* Todo:
          * Figure out how to reload ajile since Ajile.Unload() removes it and reloading here fails
          * because the other Included tests are interpreted before the reloaded ajile is.
          */

         var safe    = // Preserve ajile's public API for restoration after this test.
         { com       : {iskitz: {ajile: com.iskitz.ajile}}
         , Ajile     : Ajile
         , Import    : Import
         , ImportAs  : ImportAs
         , Include   : Include
         , Load      : Load
         , Namespace : Namespace
         };

         Ajile.Unload ();
         expect (global.Ajile).not.toBeDefined();
         expect (com.iskitz.ajile).not.toBeDefined();

         for (var property in safe) {      // Restore ajile's public API.
            safe.hasOwnProperty (property) && (global[property] = safe[property]);
         }

         expect (global.Ajile).toBeDefined();
         expect (com.iskitz.ajile).toBeDefined();
      });
   });

})(this);
