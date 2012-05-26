/*
 About   : ajile's ImportAs Tests Package.
 Author  : Michael Lee (iskitz.com)
 Created : 2011.12.17 @ 11:34 PM PT
 Updated : 2012.05.25 @ 11:51 PM PDT
 */

Namespace ("net.ajile.test");       // Define ajile's core tests' namespace.

(net.ajile.test.ImportAs = function defineAjileImportAsTests (global, undefined) {

   describe ("ajile: ImportAs: Exists", function defineAjileImportAsExistsTests () {
      it ("ImportAs: exists", function testAjileImportAsExists () {
         expect (ImportAs).not.toBeNull();
         expect (ImportAs).not.toBeUndefined();
         expect (global.ImportAs).toBeDefined();
         expect (global.ImportAs).toBe (ImportAs);
      });
   });

})(this);
