function doCOM() {
	
	// RGB
	sliderRed = select('#redslider');
	sliderGreen = select('#greenslider');
	sliderBlue = select('#blueslider');
	numRed = select('#rednum');
	numGreen = select('#greennum');
	numBlue = select('#bluenum');
	
	sliderRed.mouseMoved(red1);
	sliderGreen.mouseMoved(green1);
	sliderBlue.mouseMoved(blue1);
	numRed.changed(red2);
	numGreen.changed(green2);
	numBlue.changed(blue2);
	sliderRed.changed(red1);
	sliderGreen.changed(green1);
	sliderBlue.changed(blue1);
	
	sliderRed.value(255);
	sliderGreen.value(204);
	sliderBlue.value(0);
	numRed.value(255);
	numGreen.value(204);
	numBlue.value(0);
	
	//Buttons
	buttonPick = select('#pickColor');
	buttonDefault = select('#pickDefault');
	buttonDefSet = select('#setDefault');
	buttonPick.mouseClicked(pickUpdate);
	buttonDefault.mouseClicked(defUpdate);
	buttonDefSet.mouseClicked(setDefUpdate);
	
	// Line
	strokeW_slider = select('#strokeWeigth');
	strokeW_num = select('#strokeWeigthNum');
	strokeR = select('#strokeR');
	strokeG = select('#strokeG');
	strokeB = select('#strokeB');
	
	strokeW_slider.mouseMoved(updateStrokeWeigth);
	strokeW_num.changed(updateStrokeWeigth_num);
	strokeW_slider.value(1);
	strokeW_num.value(1);
	
	strokeR.changed(updateStroke);
	strokeG.changed(updateStroke);
	strokeB.changed(updateStroke);
	
	strokeR.value(255);
	strokeG.value(255);
	strokeB.value(255);
	updateStroke()
	
	// Color
	previewColor = select('#preview');
	currentColor = color(255, 204, 0);
	defaultColor = currentColor;
	
	// Pallette 1
	for (var i = 0; i < 9; i++) {
		var str1 = "#pallet1_C" + (i+1);
		var str2 = "#pallet2_C" + (i+1);
		pallet1[i] = select(str1);
		pallet1[i].mouseClicked(palleto1);
		pallet2[i] = select(str2);
		pallet2[i].mouseClicked(palleto1);
		
		pallet2[i].style('background-color: rgb(255,255,255)');
		
	}
	pallet1[0].style('background-color: rgb(255,0,0)');
	pallet1[1].style('background-color: rgb(0,255,0)');
	pallet1[2].style('background-color: rgb(0,0,255)');
	
	pallet1[3].style('background-color: rgb(255,255,0)');
	pallet1[4].style('background-color: rgb(255,0,255)');
	pallet1[5].style('background-color: rgb(0,255,255)');
	
	pallet1[6].style('background-color: rgb(0,0,0)');
	pallet1[7].style('background-color: rgb(255,255,255)');
	pallet1[8].style('background-color: rgb(255,127,0)');
	
	// Pallet buttons
	palletOpen = select('#loadFilePallet');
	palletSave = select('#saveFilePallet');
	palletCopy = select('#copyPallet');
	
	document.getElementById('loadFilePallet').addEventListener('change', loadPallet, false);
	//palletOpen.mouseClicked(loadPallet);
	palletSave.mouseClicked(savePallet);
	palletCopy.mouseClicked(copyPallet);
	
	outputDiv = select('#mode');
		
	
	// Cols & rows
	colnum = select("#numcols");
	rownum = select("#numrows");
	colrowbutton = select("#applyRows");
	
	colnum.value(10);
	rownum.value(20);
	colrowbutton.mouseClicked(updateCols);
	
	// More
	moreDiv = select("#moreDiv");
	extraDiv = select("#extraDiv");
	moreLink = select("#more");
	
	extraDiv.attribute("style", "display:none;");
	moreLink.mouseClicked(more);
	
	// Save
	saveButton = select("#saveFile");
	loadButton = select("#loadFile");
	exportButton = select("#saveIMG");
	
	//saveButton.mouseClicked(saveIt);
	document.getElementById('loadFile').addEventListener('change', loadIt, false);
	saveButton.mouseClicked(saveIt);
	exportButton.mouseClicked(doExport);
	
	// Divers
	bgbutton = select("#setBG");
	resetbutton = select("#reset");
	copybutton = select("#copyRGB");
	
	bgbutton.mouseClicked(setBG);
	resetbutton.mouseClicked(doReset);
	copybutton.mouseClicked(doCopy);
	
	//DEBUG
	//more();
	debug = select("#debug");
	debug.elt.textContent = "1";
	
	red1();
	sliderSize = select('#sizeslider');
	numSize = select('#sizenum');
	sliderSize.mouseMoved(sizesliderUpdate);
	sliderSize.changed(sizesliderUpdate);
	numSize.changed(sizenumUpdate);
	sliderSize.value(30);
	numSize.value(30);
	
}