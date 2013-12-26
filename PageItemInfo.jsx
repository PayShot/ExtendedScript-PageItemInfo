/* 
 * Description:        Retrieve the selected page item and select the item anchored to.
 * Author:             Ramzi Komati
 * Version:            1.1.4
 * Last Modified:      December 26th, 2013
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
            if(selectedItem.reflect.name == 'Polygon') 
            {
                var str = '';
                for(var i=0; i<selectedItem.paths.length; i++)
                {
                    str += '-' + (i+1) + '- ' + selectedItem.paths[i].pathType.toString() + ':\n';
                    for(var j=0; j<selectedItem.paths[i].pathPoints.length; j++) 
                    {
                        str += '[Point: ' + 
                               '(' + Math.round(selectedItem.paths[i].pathPoints[j].anchor[0] - selectedItem.geometricBounds[1]) + 
                               ';' + Math.round(selectedItem.paths[i].pathPoints[j].anchor[1] - selectedItem.geometricBounds[0]) + 
                               ') Left Anchor: ' +
                               '(' + Math.round(selectedItem.paths[i].pathPoints[j].leftDirection[0] - selectedItem.geometricBounds[1]) + 
                               ';' + Math.round(selectedItem.paths[i].pathPoints[j].leftDirection[1] - selectedItem.geometricBounds[0]) + 
                               ') Right Direction: ' +
                               '(' + Math.round(selectedItem.paths[i].pathPoints[j].rightDirection[1] - selectedItem.geometricBounds[0]) + 
                               ';' + Math.round(selectedItem.paths[i].pathPoints[j].rightDirection[1] - selectedItem.geometricBounds[0]) + 
                               ')]\n';
                    }
                    str += '\n';
                }
                alert('This is a Polygon composed of ' + selectedItem.paths.length + ' path(s) with the following properties:\n' + str);
            }
            else
            {
                alert('This is a "' + selectedItem.reflect.name + ' #' + selectedItem.id + '" inside a "' + selectedItem.parent.reflect.name + ' #' + selectedItem.parent.id + '"');
            }
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
                    if(chr == '\t') {
                        alert(
                            'This is a "TabStop Character" with the following properties:\n\n' +
                            'Alignment\t: ' + selectedItem.tabStops[0].alignment.toString() + '\n' +
                            'AlignmentCharacter\t: "' + selectedItem.tabStops[0].alignmentCharacter + '"\n' +
                            'Leader\t\t: "' + selectedItem.tabStops[0].leader + '"\n' +
                            'Position\t\t: ' + Math.round(selectedItem.tabStops[0].position) + ' ' + app.activeDocument.viewPreferences.horizontalMeasurementUnits.toString().substring(app.activeDocument.viewPreferences.horizontalMeasurementUnits.toString().indexOf('.'), app.activeDocument.viewPreferences.horizontalMeasurementUnits.toString().length)
                        );
                    }
                    else {
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