/* 
 * Description:		Retrieve the selected page item and select the item anchored to.
 * Author: 			Ramzi Komati
 * Version:			1.1
 * Last Modified:	December 17th, 2013
 */

(function(obj) 
{
	if (app.documents.length > 0 && app.selection.length == 1) 
	{
		if (parseFloat(app.version) < 6) 
		{
			onload(app.selection[0]);
		} 
		else 
		{
			app.doScript(onload, undefined, app.selection[0], UndoModes.entireScript, "PageItem Info");
		}
	} 
	else 
	{
		alert('Please select an item.');
	}

	function onload(selectedItem) 
	{
		// Display object ID
		try 
		{
			alert('This is a "' + selectedItem.reflect.name + ' #' + selectedItem.id + '" inside a "' + selectedItem.parent.reflect.name + ' #' + selectedItem.parent.id + '"');
		}
		catch(e) 
		{
			try 
			{
				alert('This is a "' + selectedItem.reflect.name + ' #' + selectedItem.id + '" inside a "' + selectedItem.parent.reflect.name + '"');
			}
			catch(e) 
			{
				var chr = selectedItem.contents;
				if(chr == '\t') chr = '\\t';
				if(chr == '\n') chr = '\\n';
				if(chr == '\r') chr = '\\r';
				
				var hex = selectedItem.contents.toString().charCodeAt(0).toString(16).toUpperCase();
				alert('This is a "Character" whose content is "' + chr + '"\nand a unicode value of U+' + ('0000'.substr(0, 4 - hex.length) + hex) + '.');
			}
		}

		// Display anchored object and select it.
		if(selectedItem.parent instanceof Character) 
		{
			if(selectedItem.parent.contents.toString().charCodeAt(0) == 65532) 
			{
				if(selectedItem.parent.parent.textFrames.length != 0)
				{
					alert('Anchored to a "TextFrame #' + selectedItem.parent.parent.textFrames[0].id + '"');
					app.activeDocument.pageItems.itemByID(selectedItem.parent.parent.textFrames[0].id).select();
				}
				else if(selectedItem.parent.parent.polygons.length != 0)
				{
					alert('Anchored to a "Polygon #' + selectedItem.parent.parent.polygons[0].id + '"');
					app.activeDocument.pageItems.itemByID(selectedItem.parent.parent.polygons[0].id).select();
				}
				else if(selectedItem.parent.parent.rectangles.length != 0)
				{
					alert('Anchored to a "Rectangle #' + selectedItem.parent.parent.rectangles[0].id + '"');
					app.activeDocument.pageItems.itemByID(selectedItem.parent.parent.rectangles[0].id).select();
				}
				else if(selectedItem.parent.parent.graphicLines.length != 0)
				{
					alert('Anchored to a "GraphicLine #' + selectedItem.parent.parent.graphicLines[0].id + '"');
					app.activeDocument.pageItems.itemByID(selectedItem.parent.parent.graphicLines[0].id).select();
				}
				else if(selectedItem.parent.parent.groups.length != 0)
				{
					alert('Anchored to a "Group #' + selectedItem.parent.parent.groups[0].id + '"');
					app.activeDocument.pageItems.itemByID(selectedItem.parent.parent.groups[0].id).select();
				}
			}
		}
	}
}());