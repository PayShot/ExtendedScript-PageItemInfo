/* 
 * Description:		Retrieve the selected page item and select the item anchored to.
 * Author: 			Ramzi Komati
 * Version:			1.1.3
 * Last Modified:	December 20th, 2013
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
				if(chr.toString().length == 0)
				{
					alert('Please select an item.');
				}
				else if(chr.toString().length == 1)
				{
					if(chr == '\t') 
					{
						var x_unit = app.activeDocument.viewPreferences.horizontalMeasurementUnits.toString();
						alert(
							'This is a "TabStop Character" with the following properties:\n\n' +
							'Alignment\t: ' 		  + selectedItem.tabStops[0].alignment.toString() + '\n'  +
							'AlignmentCharacter\t: "' + selectedItem.tabStops[0].alignmentCharacter   + '"\n' +
							'Leader\t\t: "'			  + selectedItem.tabStops[0].leader 			  + '"\n' +
							'Position\t\t: '		  + Math.round(selectedItem.tabStops[0].position) +  ' '  + x_unit.substring(x_unit.indexOf('.'), x_unit.length)
						);
					}
					else 
					{
						if(chr == '\n') chr = '\\n';
						if(chr == '\r') chr = '\\r';
						
						var hex = selectedItem.contents.toString().charCodeAt(0).toString(16).toUpperCase();
						alert('This is a "Character" whose content is "' + chr.toString() + '"\nand a unicode value of U+' + ('0000'.substr(0, 4 - hex.length) + hex) + ' (' + selectedItem.contents.toString().charCodeAt(0) + ').');
					}
				}
				else // chr.toString().length > 1
				{
					var hex = parseInt(selectedItem.contents).toString(16).toUpperCase();
					if(isNaN(hex))
					{
						alert('These are characters whose contents are "' + chr.toString() + '".');
					}
					else 
					{
						alert('This is a "SpecialCharacter" whose content is "' + chr.toString() + '"\nand its SpecialCharacter_ID is 0x' + ('00000000'.substr(0, 4 - hex.length) + hex) + '.');
					}
				}
			}
		}

		// Display anchored object and select it.
		if(selectedItem.parent instanceof Character) 
		{
			if(selectedItem.parent.contents.toString().charCodeAt(0) == 65532) 
			{
				alert('Anchored to a "TextFrame #' + selectedItem.parent.parentTextFrames[0].id + '"');
				app.activeDocument.pageItems.itemByID(selectedItem.parent.parentTextFrames[0].id).select();
			}
		}
	}
}());