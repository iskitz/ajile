/*
 About   : ajile's core Tests Package.
 Author  : Michael Lee [iskitz.com]
 Created : 2011.12.17 @ 22:30-08.00
 Updated : 2013.01.28 @ 00:56-08.00
 */

Namespace ("net.ajile.test");

(net.ajile.test.Ajile = function defineAjileTests (global, undefined) {

   describe ("ajile:", function testAjileNamespaceExists () {
      it ("Exists globally as Ajile", function testAjileExistsAsAjile () {
         expect (Ajile).toBeDefined();
         expect (global.Ajile).toBeDefined();
         expect (global.Ajile).toBe (Ajile);
      });
      
      it ("Exists globally as com.iskitz.ajile", function testAjileExistsAsCIA () {
         expect (com.iskitz.ajile).toBeDefined();
         expect (global.com.iskitz.ajile).toBeDefined();
         expect (global.com.iskitz.ajile).toBe (com.iskitz.ajile);
      });
   });

   describe ("ajile: Ajile.AddImportListener():", function testAjileAddImportListener () {
      it ("Exists globally as Ajile.AddImportListener", function testAjileAddImportListenerExists () {
         expect (Ajile.AddImportListener).toBeDefined();
      });

      it ("Can listen for namespaced, in-memory Imports", function testAjileAddImportListenerNII () {
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
         }, "AddImportListener failed to listen for namespaced in-memory Imports.", 500);

         runs (function reportResult () {
            expect (AddImportListener).toBe (net.ajile.test.Ajile.AddImportListener);
            itWorked && delete (global.AddImportListener) && Ajile.Unload (namespace);
         });
      });//End: Namespaced In-memory Imports.

      it ("Can listen for all in-memory Imports", function testAjileAddImportListenerAII () {
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
         }, "AddImportListener failed to listen to all in-memory Imports", 500);

         runs (function reportResult () {
            var ns = net.ajile.test.Ajile.AddImportListener;
            expect (import1).toBe (ns.import1);
            expect (import2).toBe (ns.import2);
            itWorked && delete (global.import1) && delete (global.import2) && Ajile.Unload (namespace[0]);
         });
      });//End: All In-Memory Imports.

      it ("Can listen for pre-listener global members", function canListenForPreListenerGlobalMembers () {
         var canListen = false;
         global.somethingAddedBefore = true;

         function foundGlobalThing (name) {
             canListen = !!global.somethingAddedBefore;
             canListen && Ajile.RemoveImportListener (name, arguments.callee);
         }

         Ajile.AddImportListener ("somethingAddedBefore", foundGlobalThing);

         waitsFor (function didAddImportListenerWork () {
            return !!canListen; 
         }, "AddImportListener to find pre-listener global members.", 500);

         runs (function canListenToGlobalScope() {
            expect (canListen).toBe (true);
            delete global.somethingAddedBefore;
            Ajile.RemoveImportListener ("somethingAddedBefore", foundGlobalThing);
         });
      });//End: Listening for pre-listener  global members.

      it ("Can listen for post-listener global members", function canListenForPostListenerGlobalMembers () {
         var canListen = false;

         function foundGlobalThing (name) {
             canListen = !!global.somethingAddedLater;
             canListen && Ajile.RemoveImportListener (name, arguments.callee);
         }

         Ajile.AddImportListener ("somethingAddedLater", foundGlobalThing);
         global.somethingAddedLater = true;

         waitsFor (function didAddImportListenerWork () {
            return !!canListen; 
         }, "AddImportListener to find post-listener global members.", 500);

         runs (function canListenToGlobalScope() {
            expect (canListen).toBe (true);
            delete global.somethingAddedLater;
            Ajile.RemoveImportListener ("somethingAddedLater", foundGlobalThing);
         });
      });//End: Listening for post-listener global members.
   });

   describe ("ajile: Ajile.EnableCloak():", function testAjileEnableCloak () {
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
         expect (Ajile.GetVersion()).toEqual ("1.5.0");
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

   describe ("ajile: Ajile.Unload():", function testAjileUnload () {
      it ("Exists in global scope.", function testAjileUnloadExists () {
         expect (Ajile.Unload).toBeDefined();
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

//      it ('Ajile.Unload(); removes Ajile and com.iskitz.ajile from the global scope.', function testAjileUnloadAll () {
//         /* Todo:
//          * Figure out how to reload Ajile since Ajile.Unload() removes it and reloading here fails
//          * because the other Included tests are interpreted before the reloaded Ajile is.
//          */
////         Load ("../../lib/ajile/com.iskitz.ajile.js?debug,mvcoff,mvcshareoff");
//         net.ajile.test.Unload = {Member: {works: true}};
//         Ajile.Unload ();
//         expect (global.Ajile).not.toBeDefined();
//         expect (com.iskitz.ajile).not.toBeDefined();
//      });
   });

})(this);
