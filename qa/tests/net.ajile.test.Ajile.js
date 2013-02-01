/*
 About   : ajile's core Tests Package.
 Author  : Michael Lee [iskitz.com]
 Created : 2011.12.17 @ 22:30-08.00
 Updated : 2013.02.01 @ 11:32-08.00
 */

Namespace ("net.ajile.test");

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

   describe ("ajile: Ajile.AddImportListener()", function testAjileAddImportListener () {
      it ("Ajile.AddImportListener: method.", function testAjileAddImportListenerExists () {
         expect (Ajile.AddImportListener).toBeDefined();
         expect (typeof Ajile.AddImportListener).toBe("function");
      });

      it ('Ajile.AddImportListener ("somethingExistingBefore", function...);', function canListenForPreListenerGlobalMembers () {
         var canListen = false;
         global.somethingExistingBefore = true;

         function foundGlobalThing (name) {
             canListen = !!global.somethingExistingBefore;
             canListen && Ajile.RemoveImportListener (name, arguments.callee);
         }

         Ajile.AddImportListener ("somethingExistingBefore", foundGlobalThing);

         waitsFor (function didAddImportListenerWork () {
            return !!canListen;
         }, 'Ajile.AddImportListener ("somethingExistingBefore", function...);', 500);

         runs (function canListenToGlobalScope() {
            expect (canListen).toBe (true);
            delete global.somethingExistingBefore;
            Ajile.RemoveImportListener ("somethingExistingBefore", foundGlobalThing);
         });
      });//End: Listening for pre-listener  global members.

      it ('Ajile.AddImportListener ("somethingExistingLater", function...);', function canListenForPostListenerGlobalMembers () {
         var canListen = false;

         function foundGlobalThing (name) {
             canListen = !!global.somethingExistingLater;
             canListen && Ajile.RemoveImportListener (name, arguments.callee);
         }

         Ajile.AddImportListener ("somethingExistingLater", foundGlobalThing);
         global.somethingExistingLater = true;

         waitsFor (function didAddImportListenerWork () {
            return !!canListen; 
         }, 'Ajile.AddImportListener ("somethingExistingBefore", function...);', 500);

         runs (function canListenToGlobalScope() {
            expect (canListen).toBe (true);
            delete global.somethingExistingLater;
            Ajile.RemoveImportListener ("somethingExistingLater", foundGlobalThing);
         });
      });//End: Listening for post-listener global members.

      it ('Ajile.AddImportListener ("something.existing", function...); Import ("something.existing");', function testAjileAddImportListenerNII () {
         var  itWorked  = false
            , namespace = "net.ajile.test.Ajile.AddImportListener"
            ;
         net.ajile.test.Ajile.AddImportListener = {};

         Ajile.AddImportListener (namespace, function importListenerWorks (moduleName) {
            Ajile.RemoveImportListener (moduleName, arguments.callee);
            itWorked = true;
         });

         runs (function importSomething() {
            Import (namespace);
         });

         waitsFor (function didAddImportListenerWork () {
            return itWorked; 
         }, 'Ajile.AddImportListener ("something.existing", function...); Import ("something.existing");', 500);

         runs (function reportResult () {
            expect (AddImportListener).toBe (net.ajile.test.Ajile.AddImportListener);
            itWorked && delete (global.AddImportListener) && Ajile.Unload (namespace);
         });
      });//End: Namespaced In-memory Imports.

      it ('Ajile.AddImportListener (function...(...){}); Import ("something.existing");', function testAjileAddImportListenerAII () {
         var count     = 0
           , itWorked  = false
           ;
         var namespace =
             [ "net.ajile.test.Ajile.AddImportListener"
             , "net.ajile.test.Ajile.AddImportListener.import1"
             , "net.ajile.test.Ajile.AddImportListener.import2"
             ];
         net.ajile.test.Ajile.AddImportListener = {import1:{}, import2:{}};

         Ajile.AddImportListener (function importListenerWorks (moduleName) {
            itWorked =  (++count >= 2) && !!(global.import1 && global.import2);
            itWorked && Ajile.RemoveImportListener (arguments.callee);
         });

         runs (function importNamespacedObjects() {
            Import (namespace[1]);
            Import (namespace[2]);
         });

         waitsFor (function didAddImportListenerWork () {
            return itWorked; 
         }, 'Ajile.AddImportListener (function...(...){}); Import ("something.existing");', 500);

         runs (function reportResult () {
            var ns = net.ajile.test.Ajile.AddImportListener;
            expect (import1).toBe (ns.import1);
            expect (import2).toBe (ns.import2);
            itWorked && delete (global.import1) && delete (global.import2) && Ajile.Unload (namespace[0]);
         });
      });//End: All In-Memory Imports.
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
      it ("Ajile.GetVersion(): 1.5.5", function testAjileGetVersionWorks () {
         expect (Ajile.GetVersion()).toEqual ("1.5.5");
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
