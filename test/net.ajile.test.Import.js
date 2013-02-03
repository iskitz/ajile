/*
 About   : ajile's Import Tests Package.
 Author  : Michael Lee (iskitz.com)
 Created : 2011.12.17 @ 11:34 PM PT
 Updated : 2012.06.04 @ 06:34 AM PDT
 */

Namespace ("net.ajile.test");

(net.ajile.test.Import = function defineAjileImportTests (global, undefined) {

   describe ("ajile: Import", function ajileImportExistsTests () {
      it ("Exists in the global scope.", function testAjileImportExists () {
         expect (Import).not.toBeNull();
         expect (Import).not.toBeUndefined();
         expect (global.Import).toBeDefined();
         expect (global.Import).toBe (Import);
      });

      it ("Can be used synchronously with in-memory objects.", function testAjileImportInMemoryWorks () {
         net.ajile.test.Import.InMemory = {works: true};
         Import ("net.ajile.test.Import.InMemory");
         expect (InMemory).not.toBeNull();
         expect (InMemory).not.toBeUndefined();
         expect (InMemory.works).toBe (true);
         delete global.InMemory;
         Ajile.Unload ("net.ajile.test.Import.InMemory");
      });
   });

})(this);
