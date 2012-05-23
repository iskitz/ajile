/**
 * JScript Brush for Code Syntax Highlighter.
 * Version 1.5.1
 * Copyright (C) 2004-2007 Alex Gorbatchev.
 * http://www.dreamprojections.com/syntaxhighlighter/
 *
 * Ajile enhanced for easy on-demand loading
*  by [ Michael Lee :: http://ajile.net/ ]
 * 
 * This library is free software; you can redistribute it and/or modify it under the terms of the GNU Lesser General 
 * Public License as published by the Free Software Foundation; either version 2.1 of the License, or (at your option) 
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied 
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more 
 * details.
 *
 * You should have received a copy of the GNU Lesser General Public License along with this library; if not, write to 
 * the Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA 
 */

// STEP 1 :: Include the DP Syntax Highlighter core library (version 1.5.1)!

Include ("dp.sh.1.5.1"); 

// STEP 2 :: Use an Ajile import listener to guarantee that the core is
//           successfully included before defining this JScript Brush.

Ajile.AddImportListener("dp.sh", function/*onReady*/(moduleName)
{
   // STEP 3 :: The core is ready, let's remove our listener to avoid
   //           any further notifications! Ajile automatically sends the
   //           imported/included module's fully qualified name as the first
   //           argument to the listener, so let's use that and the
   //           arguments.callee reference to this listener to do the removal.

   Ajile.RemoveImportListener(moduleName, arguments.callee);

   // STEP 4 :: Great! Core's included and our listener's removed so let's
   //           define the JScript Brush using the original code.

   dp.sh.Brushes.JScript = function()
   {
      var A = "Ajile Import ImportAs Include Load Namespace abstract boolean "
            + "break byte case catch char class const continue debugger default "
            + "delete do double else enum export extends false final finally "
            + "float for function goto if implements import in instanceof int "
            + "interface long native new null package private protected public "
            + "return short static super switch synchronized this throw throws "
            + "transient true try typeof var void volatile while with";
      
      this.regexList=[{regex:dp.sh.RegexLib.SingleLineCComments,  css:"comment"}
                     ,{regex:dp.sh.RegexLib.MultiLineCComments,   css:"comment"}
                     ,{regex:dp.sh.RegexLib.DoubleQuotedString,   css:"string"}
                     ,{regex:dp.sh.RegexLib.SingleQuotedString,   css:"string"}
                     ,{regex:new RegExp("^\\s*#.*","gm"),         css:"preprocessor"}
                     ,{regex:new RegExp(this.GetKeywords(A),"gm"),css:"keyword"}
                     ];

      this.CssClass="dp-c";
   };
   dp.sh.Brushes.JScript.prototype = new dp.sh.Highlighter();
   dp.sh.Brushes.JScript.Aliases   = ["js", "jscript", "javascript"];

   // Tada!! DP Syntax Highlighting JScript Brush made Ajile in 4 easy steps!!!
   // 
   //         How's that for "Smart scripts that play nice!"

});// NOTE :: Don't forget this closing brace and parenthesis! 