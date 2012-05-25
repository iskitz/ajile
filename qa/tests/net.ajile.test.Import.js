/*
 About   : ajile's Import Tests Package.
 Author  : Michael Lee (iskitz.com)
 Created : 2011.12.17 @ 11:34 PM PT
 Updated : 2012.05.25 @ 06:06 AM PDT
 */

Import ("net.ajile.test");       // Define ajile's core tests' namespace.

(net.ajile.test.Import = function defineAjileImportTests (global, undefined) {

   describe ("ajile: Import: Exists", function defineAjileImportExistsTests () {
      it ("Import: exists", function testAjileImportExists () {
         expect (Import).not.toBeNull();
         expect (Import).not.toBeUndefined();
         expect (global.Import).toBeDefined();
         expect (global.Import).toBe (Import);
      });
   });

})(this);
