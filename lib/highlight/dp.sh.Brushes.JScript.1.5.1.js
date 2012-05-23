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
Include("dp.sh.1.5.1");Ajile.AddImportListener("dp.sh",function(A){Ajile.RemoveImportListener(A,arguments.callee);dp.sh.Brushes.JScript=function(){var B="Ajile Import ImportAs Include Load Namespace abstract boolean break byte case catch char class const continue debugger default delete do double else enum export extends false final finally float for function goto if implements import in instanceof int interface long native new null package private protected public return short static super switch synchronized this throw throws transient true try typeof var void volatile while with";this.regexList=[{regex:dp.sh.RegexLib.SingleLineCComments,css:"comment"},{regex:dp.sh.RegexLib.MultiLineCComments,css:"comment"},{regex:dp.sh.RegexLib.DoubleQuotedString,css:"string"},{regex:dp.sh.RegexLib.SingleQuotedString,css:"string"},{regex:new RegExp("^\\s*#.*","gm"),css:"preprocessor"},{regex:new RegExp(this.GetKeywords(B),"gm"),css:"keyword"}];this.CssClass="dp-c"};dp.sh.Brushes.JScript.prototype=new dp.sh.Highlighter();dp.sh.Brushes.JScript.Aliases=["js","jscript","javascript"]})