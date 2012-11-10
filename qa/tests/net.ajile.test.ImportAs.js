/*
 About   : ajile's ImportAs Tests Package.
 Author  : Michael Lee (iskitz.com)
 Created : 2011.12.17 @ 23:34 PM PT
 Updated : 2012.11.10 @ 02:42 AM PDT
 */

Namespace ("net.ajile.test");       // Define ajile's core tests' namespace.

(net.ajile.test.ImportAs = function defineAjileImportAsTests (global, undefined) {

   describe ("ajile: ImportAs:", function defineAjileImportAsExistsTests () {
      it ("Exists in the global scope.", function testAjileImportAsExists () {
         expect (ImportAs).not.toBeNull();
         expect (ImportAs).not.toBeUndefined();
         expect (global.ImportAs).toBeDefined();
         expect (global.ImportAs).toBe (ImportAs);
      });

      it ("Creates alias in global scope", function testAjileImportAsWorks () {
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

      it ("Doesn't create alias if name already exists in global scope", function testAjileImportAsPreserves () {
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
