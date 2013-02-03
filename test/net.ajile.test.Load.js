/*
 About   : ajile's Load Tests Package.
 Author  : Michael Lee (iskitz.com)
 Created : 2011.12.17 @ 11:34 PM PT
 Updated : 2012.06.04 @ 06:33 AM PDT
 */

Namespace ("net.ajile.test");

(net.ajile.test.Load = function defineAjileLoadTests (global, undefined) {

   describe ("ajile: Load", function defineAjileLoadTests () {
      it ("Exists in the global scope.", function testAjileLoadExists () {
         expect (Load).not.toBeNull();
         expect (Load).not.toBeUndefined();
         expect (global.Load).toBeDefined();
         expect (global.Load).toBe (Load);
      });

      it ("Supports inline scripts.", function testAjileLoadInlineWorks () {
         runs (function tryLoadInline () {
            Load (null, null, "net.ajile.test.Load.inline = true;");
         });

         waitsFor (function didLoadInlineWork () {
            return !!net.ajile.test.Load.inline;
         }, "Does not support inline scripts.", 500);

         runs (function completeLoadInlineWorksTest() {
            expect (net.ajile.test.Load.inline).toBe (true);
         });
      });

      it ("Supports external scripts.", function testAjileLoadWorks () {
         var works = false;

         runs (function tryExternalLoad () {
            Load ("net.ajile.test.Load.external.works.js");
         });

         waitsFor (function didExternalLoadWork () {
            return (works = !!(net.ajile.test.Load.external && net.ajile.test.Load.external.works));
         }, "Does not support external scripts.", 2000);

         runs (function completeLoadWorksTest() {
            expect (works).toBe (true);
         });
      });
   });

})(this);
