/*
 About   : ajile's Load Tests Package.
 Author  : Michael Lee (iskitz.com)
 Created : 2011.12.17 @ 11:34 PM PT
 Updated : 2012.05.25 @ 11:48 PM PDT
 */

Namespace ("net.ajile.test");

(net.ajile.test.Load = function defineAjileLoadTests (global, undefined) {

   describe ("ajile: Load: Exists", function defineAjileLoadExistsTests () {
      it ("Load: exists", function testAjileLoadExists () {
         expect (Load).not.toBeNull();
         expect (Load).not.toBeUndefined();
         expect (global.Load).toBeDefined();
         expect (global.Load).toBe (Load);
      });
   });

   describe ("ajile: Load: Works", function defineAjileLoadWorksTests () {
      it ("Load: External script works", function testAjileLoadWorks () {

         var works = false;

         runs (function tryExternalLoad () {
            Load ("net.ajile.test.Load.external.works.js");
         });

         waitsFor (function didExternalLoadWork () {
            return (works = !!(net.ajile.test.Load.external && net.ajile.test.Load.external.works));
         }, "Load: External script failed", 2000);

         runs (function completeLoadWorksTest() {
            expect (works).toBe (true);
         });
      });
   });

})(this);
