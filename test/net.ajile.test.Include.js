/*
 About   : ajile's Include Tests Package.
 Author  : Michael Lee (iskitz.com)
 Created : 2011.12.17 @ 11:34 PM PT
 Updated : 2012.05.25 @ 11:51 PM PDT
 */

Namespace ("net.ajile.test");

(net.ajile.test.Include = function defineAjileIncludeTests (global, undefined) {

   describe ("ajile: Include: Exists", function defineAjileIncludeExistsTests () {
      it ("Include: exists", function testAjileIncludeExists () {
         expect (Include).not.toBeNull();
         expect (Include).not.toBeUndefined();
         expect (global.Include).toBeDefined();
         expect (global.Include).toBe (Include);
      });
   });

})(this);
