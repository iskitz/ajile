/*
 About   : ajile's Include Tests Suite module.
 Author  : Michael Lee (iskitz.com)
 Created : 2011.12.17 @ 23:34-08.00
 Updated : 2013.02.10 @ 21:19-08.00
 */

Namespace ("net.ajile.test");

(net.ajile.test.Include = function defineAjileIncludeTests (global, undefined) {

   describe ("ajile: Include", function defineAjileIncludeExistsTests () {
      it ("is a function", function testAjileIncludeExists () {
         expect (Include).not.toBeNull();
         expect (Include).not.toBeUndefined();
         expect (global.Include).toBeDefined();
         expect (global.Include).toBe (Include);
         expect (Include).toEqual (jasmine.any (Function));
      });
   });

})(this);
