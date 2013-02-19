
/*
 About   : ajile's Namespace Test Suite module.
 Author  : Michael Lee (iskitz.com)
 Created : 2011.12.17 @ 11:34-08.00
 Updated : 2013.02.18 @ 23:09-08.00
 */

Namespace ("net.ajile.test");

(net.ajile.test.Namespace = function defineAjileNamespaceTests (global, undefined) {

   function cleanupGlobal (name) {
      try {
         delete global [name];                     // Cleanup.
      } catch (e) {
         global [name] = undefined;                //BUG: MSIE disallows deleting global members.
      }
   }
   function createManualNamespace (name) {
      !global.net && (global.net = {ajile :{test :{Namespace :{}}}});
      
      return net.ajile.test.Namespace [name] = function ManualNS() {
         return name;
      };
   }

   describe ("ajile: Namespace", function defineAjileNamespaceTests () {
      it ("is a function", function testAjileNamespaceExists () {
         expect (Namespace).not.toBeNull();
         expect (Namespace).not.toBeUndefined();
         expect (global.Namespace).toBeDefined();
         expect (global.Namespace).toBe (Namespace);
         expect (Namespace).toEqual (jasmine.any (Function));
      });

      it ("creates a single-level namespace", function testAjileNamespaceSingleLevel () {
         cleanupGlobal ("nstesting");                    // Make sure the namespace doesn't exist.
         Namespace ("nstesting");                        // Create the namespace.
         expect (nstesting).toBeDefined();
         cleanupGlobal ("nstesting");                    // Cleanup.
      });

      it ("reuses a single-level namespace", function testAjileNamespaceSingleLevelReuse () {
         global.nstesting = function nstesting() {
            // Manually created the "nstesting" namespace.
            return "nstesting";
         };
         var manualNS = nstesting;
         Namespace ("nstesting");
         expect (manualNS()).toEqual (nstesting());
         cleanupGlobal ("nstesting");                    // Cleanup.
      });

      it ("creates a multi-level namespace", function testAjileNamespaceMultiLevel () {
         delete net.ajile.test.Namespace.MultiLevel;        // Make sure the namespace doesn't exist.
         var fullName = "net.ajile.test.Namespace.MultiLevel";
         Namespace (fullName);                              // Create the namespace.
         expect (net.ajile.test.Namespace.MultiLevel).toBeDefined();
         delete net.ajile.test.Namespace.MultiLevel;        // Cleanup.
      });

      it ("reuses a multi-level namespace", function testAjileNamespaceMultiLevelReuse () {
         var fullName = "net.ajile.test.Namespace.MultiLevel";
         net.ajile.test.Namespace.MultiLevel = function MultiLevel() {
            // Manually created the net.ajile.test.Namespace.MultiLevel namespace.
            return fullName;
         };
         var manualNS = net.ajile.test.Namespace.MultiLevel;
         Namespace (fullName);
         expect (manualNS()).toEqual (net.ajile.test.Namespace.MultiLevel());         
         delete net.ajile.test.Namespace.MultiLevel;
      });

   });//end: describe ajile: Namespace
   
})(this);
