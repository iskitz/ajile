/*
 About   : ajile's Ajle.AddImportListener Tests Package.
 Author  : Michael Lee [iskitz.com]
 Created : 2011.12.17 @ 22:30-08.00
 Updated : 2013.02.04 @ 13:00-08.00
 */

Namespace ("net.ajile.test.Ajile");

(net.ajile.test.Ajile.AddImportListener = function defineAddImportListenerTests (global, undefined) {

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

         Ajile.AddImportListener ("AddImportListener", function importListenerWorks (moduleName) {
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

      it ('Ajile.AddImportListener (["somethingExistingBefore","somethingExistingLater"], function...);', function canListenForMultiplePreListenerGlobalMembers () {
         var canListen = false;
         global.somethingExistingBefore = true;

         function foundGlobalThings (names) {
            canListen = !!global.somethingExistingBefore && !!global.somethingExistingLater;
            Ajile.RemoveImportListener (["somethingExistingBefore","somethingExistingLater"], foundGlobalThings);
         }

         Ajile.AddImportListener (["somethingExistingBefore","somethingExistingLater"], foundGlobalThings);
         global.somethingExistingLater = true;

         waitsFor (function didAddImportListenerWork () {
            return !!canListen;
         }, 'Ajile.AddImportListener (["somethingExistingBefore","somethingExistingLater"], function...);', 500);

         runs (function canListenToGlobalScope() {
            expect (canListen).toBe (true);
            delete global.somethingExistingBefore;
            delete global.somethingExistingLater;
            Ajile.RemoveImportListener (["somethingExistingBefore","somethingExistingLater"], foundGlobalThings);
         });
      });//End: Listening for multiple pre & post-listener global members.
   });

})(this);
