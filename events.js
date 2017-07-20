function mousePressed(evt) {
	
	if (mouseX > width || mouseY > height ||
		mouseX <= 0 || mouseY <= 0) return;
	var i = mouseX / boxSize;
	var j = mouseY / boxSize;
	var index = floor(j) * numcols + floor(i);
	
	if (pickColorMode) {
		var currentColor = allBoxes[index].getColor();
		sliderRed.value(currentColor.levels[0]);
		sliderGreen.value(currentColor.levels[1]);
		sliderBlue.value(currentColor.levels[2]);
		colorSlider(0,0);
		pickColorMode = false;
	} else {
		allBoxes[index].update();
	}
	
	return false;
}

function colorSlider(which, what) {
	switch(which) {
		case 0: // Red
			if (what == 0) { // Slider
				numRed.value(sliderRed.value());
			} else {
				sliderRed.value(numRed.value());
			}
		case 1: // Green
			if (what == 0) { // Slider
				numGreen.value(sliderGreen.value());
			} else {
				sliderGreen.value(numGreen.value());
			}		
		case 2: // Blue
			if (what == 0) { // Slider
				numBlue.value(sliderBlue.value());
			} else {
				sliderBlue.value(numBlue.value());
			}
	}
	currentColor = color(sliderRed.value(),
						sliderGreen.value(),
						sliderBlue.value());
	
	var h = join(hex(currentColor.levels.slice(0,3),2),'');
	previewColor.style("background-color", concat('#', h));
}

function red1() { colorSlider(0,0);}
function red2() { colorSlider(0,1);}

function green1() { colorSlider(1,0);}
function green2() { colorSlider(1,1);}

function blue1() { colorSlider(2,0);}
function blue2() { colorSlider(2,1);}

// Buttons
function pickUpdate() {
	pickColorMode = ! pickColorMode;
}
function defUpdate() {
	currentColor = defaultColor;
	sliderRed.value(currentColor.levels[0]);
	sliderGreen.value(currentColor.levels[1]);
	sliderBlue.value(currentColor.levels[2]);
	colorSlider(0,0);
}
function setDefUpdate() {
	defaultColor = currentColor;
}


function scaleUpdate(newSize) {
	newWidth = numcols * newSize;
	newHeight = numrows * newSize;
	resizeCanvas(newWidth+1, newHeight+1);
	boxSize = newSize;
}
function sizesliderUpdate() {
	val = Number(sliderSize.value());
	numSize.value(val);
	scaleUpdate(val);
}
function sizenumUpdate() {
	val = Number(numSize.value());
	sliderSize.value(val);
	scaleUpdate(val);
}

function updateStroke() {
	strokeC = color(
					Number(strokeR.value()),
					Number(strokeG.value()),
					Number(strokeB.value()));
}
function updateStrokeWeigth() {
	strokeW = strokeW_slider.value();
	strokeW_num.value(strokeW);
	if (strokeW == 0) {
		doStroke = false;
		noStroke();
	} else {
		doStroke = true;
		strokeWeight(strokeW);
	}
}
function updateStrokeWeigth_num() {
	strokeW = strokeW_num.value();
	strokeW_slider.value(strokeW);
	if (strokeW == 0) {
		doStroke = false;
		noStroke();
	} else {
		doStroke = true;
		strokeWeight(strokeW);
	}
}

function more() {
	if (extraDiv.attribute("style") == "display:none;") {
		extraDiv.attribute("style", "display:flex");
		moreLink.elt.text = "Minder..."
	} else {
		extraDiv.attribute("style", "display:none;");
		moreLink.elt.text = "Meer..."
	}
}

function updateCols(ask) {
	var newCols = Number(colnum.value());
	var newRows	= Number(rownum.value());
	
	if (ask != 1) {
		if (!window.confirm("Data may be lost. Are you sure?")) return;
	}
	
	if (newRows < numrows) {
		var delRows = numrows - newRows;
		var last = numcols * newRows;
		allBoxes.splice(last, delRows * numcols);
	} else if(newRows > numrows) {
		var addRows = newRows - numrows;
		for (var i = 0; i < addRows; i++) {
			for (var j = 0; j < numcols; j++) {
				allBoxes.push(new aBox(j,i + numrows));
			}
		}
	}
	
	
	if (newCols < numcols) {
		var delCols = numcols - newCols;
		for (var i = newRows-1; i >= 0; i--) {
			var last = i * numcols + newCols;
			allBoxes.splice(last, delCols);
		}
	} else if (newCols > numcols) {
		var addCols = newCols - numcols;
		for (var i = newRows-1; i >= 0; i--) {
			var start = (i+1) * numcols;
			for (var j = 0; j < addCols; j++) {
				allBoxes.splice(start+j,0, new aBox(numcols+j,i));
			}
		}
	}

	numcols = newCols;
	numrows = newRows;
	scaleUpdate(Number(sliderSize.value()));
}

function setBG() {
	for (var i = 0; i < allBoxes.length; i++) {
		if (!allBoxes[i].isTouched) {
			allBoxes[i].left = currentColor;
			allBoxes[i].right = currentColor;
		}
	}
}

function doReset() {
	if (window.confirm("Are you sure? All data will be lost!")) location.reload();
}

function doCopy() {
	strokeR.value(currentColor.levels[0]);
	strokeG.value(currentColor.levels[1]);
	strokeB.value(currentColor.levels[2]);
	updateStroke();
}

function doExport() {
	var oldBox = boxSize;
	scaleUpdate(250);
	
	  for (var i = 0; i < allBoxes.length; i++) {
		allBoxes[i].draw(false);
	}
  
  if (doStroke) {
	  stroke(strokeC);
	  strokeWeight(strokeW);
	  for (var i = 0; i < allBoxes.length; i++) {
			allBoxes[i].drawLine(false);
	  }
	  for (var i = 0; i <= numcols; i++) {
		  line(i * boxSize, 0, i * boxSize, height);
	  }
	  for (var i = 0; i <= numrows; i++) {
		  line(0, i * boxSize, width, i * boxSize);
	  }
	  noStroke();
  }
  
	saveCanvas("test.png", "png");
	scaleUpdate(oldBox);
}

function saveIt() {
	js = {};
	js.currentColor = currentColor.levels;
	js.defaultColor = defaultColor.levels;
	js.boxSize = boxSize;
	js.cols = numcols;
	js.rows	= numrows;
	js.strokeW = strokeW;
	js.strokeC = strokeC.levels;
	
	boxes = [];
	for (var i = 0; i < allBoxes.length; i++) {
		b = {}
		b.id = i;
		b.divMode = allBoxes[i].divMode;
		b.isTouched = allBoxes[i].isTouched;
		b.left = allBoxes[i].left.levels;
		b.right = allBoxes[i].right.levels;
		boxes.push(b);
	}
	
	js.boxes = boxes;
	
	saveJSON(js, "settings.json");
}

function loadIt(evt) {
	var files = evt.target.files;
	
	if (files.length > 0) file = files[0];
	console.log(file);
	
	fr = new FileReader();
	fr.onload = loadFurther;
	fr.readAsText(file);

	
	//js = loadJSON(file, loadFurther);
	
	
}

function loadFurther(e) {
	lines = e.target.result;
    var js = JSON.parse(lines); 
	
	console.log("fuk", js);
	sliderRed.value(js.currentColor[0])
	sliderGreen.value(js.currentColor[1])
	sliderBlue.value(js.currentColor[2])
	colorSlider(0,0);
	colorSlider(1,0);
	colorSlider(2,0);
	
	strokeR.value(js.strokeC[0]);
	strokeG.value(js.strokeC[1]);
	strokeB.value(js.strokeC[2]);
	
	defaultColor.levels = js.defaultColor;
	sliderSize.value(js.boxSize);
	//numcols = js.cols;
	//numrows = js.rows;
	//strokeW = js.strokeW;
	strokeC.levels = js.strokeC;
	
	colnum.value(js.cols);
	rownum.value(js.rows);
	
	strokeW_slider.value(js.strokeW);
	
	updateCols(1);
	
	sizesliderUpdate();
	updateStroke();
	updateStrokeWeigth();
	
	for (var k = 0; k < js.boxes.length; k++) {
		allBoxes[k].divMode = js.boxes[k].divMode;
		allBoxes[k].isTouched = js.boxes[k].isTouched;
		allBoxes[k].left.levels = js.boxes[k].left;
		allBoxes[k].right.levels = js.boxes[k].right;
	}
}

function palleto1(evt) {
	
	id = evt.target.id.match(/\d+/g)
	
	if (inPalletCopy) {
        if (id[0] == "2") {
            inPalletCopy = false;
            outputDiv.elt.textContent = "Normaal";
            
            R = sliderRed.value();
            G = sliderGreen.value();
            B = sliderBlue.value();
            
            newStyle = "background-color: rgb(" + R + ", " + G + ", " + B + ");";
            evt.target.setAttribute('style',newStyle);
        }
		return;
		
	}
	
	colors = evt.target.getAttribute('style').match(/\d+/g);
	sliderRed.value(colors[0])
	sliderGreen.value(colors[1])
	sliderBlue.value(colors[2])
	colorSlider(0,0);
	colorSlider(1,0);
	colorSlider(2,0);
}



function savePallet() {
	js = {};
	colors = [];
	
	for (var i = 0; i < 9; i++) {
		c = pallet2[i]
		colors[i] = c.elt.getAttribute('style').match(/\d+/g);
	}
	
	saveJSON(colors, "colors.json");
}

function loadPallet(evt) {
	console.log(evt.target);
	var files = evt.target.files;
	
	if (files.length > 0) file = files[0];
	else return;
	console.log(file);
	
	fr = new FileReader();
	fr.onload = loadPalletFurther;
	fr.readAsText(file);
	
}

function loadPalletFurther(evt) {
	lines = evt.target.result;
    var js = JSON.parse(lines);
	
	for (var i = 0; i < 9; i++) {
		c = js[i];
		newStyle = "background-color: rgb(" + c[0] + ", " + c[1] + ", " + c[2] + ");";
		pallet2[i].elt.setAttribute('style', newStyle);
	}
}

function copyPallet(evt) {
	// TODO
	inPalletCopy = ! inPalletCopy;
	
	if (inPalletCopy) {
		outputDiv.elt.textContent = "Kleur kopiëren";
	} else {
		outputDiv.elt.textContent = "Normaal";
	}
}