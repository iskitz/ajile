Namespace ("com.iskitz.ajile.examples");

com.iskitz.ajile.examples.IncludeExample = function IncludeExample ()
{
   var wasImported = typeof window["IncludeExample"] != "undefined";

   alert( "[ com.iskitz.ajile.examples.IncludeExample ] was "
        + (wasImported ? "Included *and* Imported." : "successfully Included!"));
};
