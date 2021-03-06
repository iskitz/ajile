/** Author: Michael Lee [ http://ajile.net/ ]

 Non-Versioned com.iskitz.ajile.examples namespace loader.

 Demonstrates how to create a namespace loader file.
 
 This file can be loaded using any of the following techniques:
 
 Import  ("com.iskitz.ajile.examples.*");
 Include ("com.iskitz.ajile.examples");
 Include ("com.iskitz.ajile.examples.*");
 Load    ("scripts/com.iskitz.ajile.examples.js");
*/

Namespace ("com.iskitz.ajile.examples");

Import    ("com.iskitz.ajile.examples.Complex");
Import    ("com.iskitz.ajile.examples.ImportFunction");
Import    ("com.iskitz.ajile.examples.ImportModule.*");
Include   ("com.iskitz.ajile.examples.IncludeExample");
Load      ("scripts/com.iskitz.ajile.examples.LoadExample.js");
ImportAs  ("AComplex", "com.iskitz.ajile.examples.ambiguous.Complex");