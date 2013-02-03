/*
 About   : Ajile's inline loading script.
 Author  : Michael Lee (iskitz.com)
 Created : 2012.06.11 @ 03:00 AM PDT
 Updated : 2012.06.11 @ 03:12 AM PDT
*/
(function handleInlineLoad (global, nextInline) {
   global.Ajile
   && (typeof Ajile.nextInline == "function")
      && (nextInline = Ajile.nextInline)
         && delete (Ajile.nextInline)
            && nextInline();
})(this);
