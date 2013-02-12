/*
 About   : ajile's ImportAs Tests Package.
 Author  : Michael Lee (iskitz.com)
 Created : 2011.12.17 @ 23:34-08.00
 Updated : 2013.02.10 @ 21:23-08.00
 */

Namespace ("net.ajile.test");       // Define ajile's core tests' namespace.

(net.ajile.test.ImportAs = function defineAjileImportAsTests (global, undefined) {

   describe ("ajile: ImportAs", function defineAjileImportAsExistsTests () {
      it ("is a function", function testAjileImportAsExists () {
         expect (ImportAs).not.toBeNull();
         expect (ImportAs).not.toBeUndefined();
         expect (global.ImportAs).toBeDefined();
         expect (global.ImportAs).toBe (ImportAs);
         expect (ImportAs).toEqual (jasmine.any (Function));
      });

      it ("imports using an alias", function testAjileImportAsWorks () {
         net.ajile.test.ImportAs.Conflict = {works: true};
         ImportAs ("Alias", "net.ajile.test.ImportAs.Conflict");
         expect (Alias).not.toBeNull();
         expect (Alias).not.toBeUndefined();
         expect (Alias.works).toBe (true);
         expect (net.ajile.test.ImportAs.Alias).not.toBeDefined();
         expect (net.ajile.test.ImportAs.Conflict.works).toBe (true);
         Ajile.Unload ("Alias");
         Ajile.Unload ("net.ajile.test.ImportAs.Conflict");
      });

      it ("doesn't import using an alias if it already exists", function testAjileImportAsPreserves () {
         net.ajile.test.ImportAs.Conflict = {works: true};
         global.Alias = "Alias";
         ImportAs ("Alias", "net.ajile.test.ImportAs.Conflict");
         expect (Alias).not.toBe (net.ajile.test.ImportAs.Conflict);
         expect (net.ajile.test.ImportAs.Alias).not.toBeDefined();
         expect (net.ajile.test.ImportAs.Conflict.works).toBe (true);
         Ajile.Unload ("Alias");
         Ajile.Unload ("net.ajile.test.ImportAs.Conflict");
      });
   });

})(this);
