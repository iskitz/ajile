/*
 About   : ajile's Import Tests Suite module.
 Author  : Michael Lee (iskitz.com)
 Created : 2011.12.17 @ 11:34-08.00
 Updated : 2013.02.18 @ 23:58-08.00
 */

Namespace ("net.ajile.test");

(net.ajile.test.Import = function defineAjileImportTests (global, undefined) {

   describe ("ajile: Import", function ajileImportExistsTests () {
      it ("is a function", function testAjileImportExists () {
         expect (Import).not.toBeNull();
         expect (Import).not.toBeUndefined();
         expect (global.Import).toBeDefined();
         expect (global.Import).toBe (Import);
         expect (Import).toEqual (jasmine.any (Function));
      });

      it ("can be used synchronously with a previously imported item", function testAjileImportInMemoryWorks () {
         net.ajile.test.Import.InMemory = {works: true};
         Import ("net.ajile.test.Import.InMemory");
         expect (InMemory).not.toBeNull();
         expect (InMemory).not.toBeUndefined();
         expect (InMemory.works).toBe (true);
         try { delete global.InMemory; } catch (e) { global.InMemory = undefined; }  //BUG: MSIE disallows deleting global members.
         Ajile.Unload ("net.ajile.test.Import.InMemory");
      });
   });

})(this);
