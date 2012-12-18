#selector选择器#
1. DOM
2. #ID



#replaceWith()#
`return this.after( value ).remove();`
#after()#
`return this.domManip(arguments, false, true, function(elem){
			this.parentNode.insertBefore( elem, this.nextSibling );
		});`
#domManip(args, table, reverse, callback )#
>`this.each`

>jQuery.clean


#each( callback, args)#

`return jQuery.each( this, callback, args );`

#jQuery静态方法#

##jQuery.each(object, callback, args)##
##jQuery.clean(elems, context )##
