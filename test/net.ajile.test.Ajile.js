/*
 About   : ajile's core Tests Package.
 Author  : Mike Lee [iskitz.com]
 Created : 2011.12.17-08.00
 Updated : 2017.12.06-08.00
 */

Namespace ("net.ajile.test");
Include   ("net.ajile.test.Ajile.AddImportListener");
Include   ("net.ajile.test.Ajile.RemoveImportListener");

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
      it ("is a method", function testAjileEnableCloakExists () {
         expect (Ajile.EnableCloak).toBeDefined();
         expect (Ajile.EnableCloak).toEqual (jasmine.any (Function));
      });
   });

   describe ("ajile: Ajile.EnableDebug()", function testAjileEnableDebug () {
      it ("is a method", function testAjileEnableDebugExists () {
         expect (Ajile.EnableDebug).toBeDefined();
         expect (Ajile.EnableDebug).toEqual (jasmine.any (Function));
         expect (typeof Ajile.EnableDebug).toBe("function");
      });
   });

   describe ("ajile: Ajile.EnableLegacy()", function testAjileEnableLegacy () {
      it ("is a method", function testAjileEnableLegacyExists () {
         expect (Ajile.EnableLegacy).toBeDefined();
         expect (Ajile.EnableLegacy).toEqual (jasmine.any (Function));
         expect (typeof Ajile.EnableLegacy).toBe("function");
      });
   });

   describe ("ajile: Ajile.EnableOverride()", function testAjileEnableOverride () {
      it ("is a method", function testAjileEnableOverrideExists () {
         expect (Ajile.EnableOverride).toBeDefined();
         expect (Ajile.EnableOverride).toEqual (jasmine.any (Function));
         expect (typeof Ajile.EnableOverride).toBe("function");
      });
   });

   describe ("ajile: Ajile.EnableRefresh()", function testAjileEnableRefresh () {
      it ("is a method", function testAjileEnableRefreshExists () {
         expect (Ajile.EnableRefresh).toBeDefined();
         expect (Ajile.EnableRefresh).toEqual (jasmine.any (Function));
         expect (typeof Ajile.EnableRefresh).toBe("function");
      });
   });

   describe ("ajile: Ajile.GetVersion()", function testAjileGetVersion () {
      var VERSION = "2017.12.06";
      it ("is a method", function testAjileGetVersionExists () {
         expect (Ajile.GetVersion).toBeDefined();
         expect (Ajile.GetVersion).toEqual (jasmine.any (Function));
      });
      it ("returns ajile's version: "+ VERSION, function testAjileGetVersionWorks () {
         expect (Ajile.GetVersion()).toEqual (VERSION);
      });
   });

   describe ("ajile: Ajile.SetOption()", function testAjileSetOption () {
      it ("is a method", function testAjileSetOptionExists () {
         expect (Ajile.SetOption).toBeDefined();
         expect (Ajile.SetOption).toEqual (jasmine.any (Function));
      });
   });

   describe ("ajile: Ajile.ShowLog()", function testAjileShowLog () {
      it ("is a method", function testAjileShowLogExists () {
         expect (Ajile.ShowLog).toBeDefined();
         expect (Ajile.ShowLog).toEqual (jasmine.any (Function));
      });
   });

   describe ("ajile: Ajile.Unload()", function testAjileUnload () {
      it ("is a method", function testAjileUnloadExists () {
         expect (Ajile.Unload).toBeDefined();
         expect (Ajile.Unload).toEqual (jasmine.any (Function));
      });

      it ("unloads single-level namespaced modules", function testAjileUnloadSingleNS () {
         global.SingleLevelModule = {single: true};
         Ajile.Unload ("SingleLevelModule");
         expect (global.SingleLevelModule).toBeUndefined();
      });

      it ("unloads multi-level namespaced modules", function testAjileUnloadNS () {
         net.ajile.test.Unload = {Member: true};
         Ajile.Unload ("net.ajile.test.Unload.Member");
         expect (net.ajile.test.Unload.Member).not.toBeDefined();
         expect (net.ajile.test.Unload).toBeDefined();
      });

      it ("unloads wild-card multi-level namespaced modules (i.e. space.*)", function testAjileUnloadNSMembers () {
         net.ajile.test.Unload = {Member: {works: true}};
         Ajile.Unload ("net.ajile.test.Unload.*");
         expect (net.ajile.test.Unload).not.toBeDefined();
      });

      it ("unloads Ajile and com.iskitz.ajile when called with no parameters", function testAjileUnloadAll () {
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
         expect (global.Ajile).toBeUndefined();
         expect (com.iskitz.ajile).not.toBeDefined();

         for (var property in safe) {      // Restore ajile's public API.
            safe.hasOwnProperty (property) && (global[property] = safe[property]);
         }

         expect (global.Ajile).toBeDefined();
         expect (com.iskitz.ajile).toBeDefined();
      });
   });

})(this);