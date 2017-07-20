var numcols = 10;
var numrows = 20;
var boxSize = 30;
var pickColorMode = false;
var currentColor;
var defaultColor;

var setWidth = numcols * boxSize;
var setHeight = numrows * boxSize;

var allBoxes = [];
var canv;

// Color picker
var sliderRed;
var sliderGreen;
var sliderBlue;
var numRed;
var numGreen;
var numBlue;

var buttonPick;
var buttonDefault;
var buttonSetDef;

// Color pallete
var pallet1 = [];
var pallet2 = [];

// Pallete buttons
var palletOpen;
var palletSave;
var palletCopy;

var inPalletCopy = false;
var outputDiv;

// Stroke
var strokeW_slider; // Slider
var strokeW_num;
var strokeW;
var strokeR; // Number
var strokeG;
var strokeB;
var strokeC; // Color

// cols & rows
var colnum;
var rownum;
var colrowbutton;

// Divers
var bgbutton;
var resetbutton;
var copybutton;

// Save
var saveButton;
var openButton;
var exportButton;

// More
var moreDiv;
var extraDiv;
var moreLink;

var doStroke = true;

var previewColor;
var sliderSize;
var numSize;
var debug;

// Import / export
var jsettings;

function setup() {
	
	canv = createCanvas(setWidth + 1, setHeight + 1);
	canv.parent('canvasDiv');
	canv.attribute("oncontextmenu", "return false;");
	
	doCOM();
	
	
	for (var j = 0; j < numrows; j++) {
		for(var i = 0; i < numcols; i++) {
			allBoxes.push(new aBox(i, j));
		}
	}
	
	strokeC = color(255,255,255);
	noStroke();
}

function draw() {
  background(255);
  
  if (pickColorMode) {
	  cursor(CROSS);
  } else {
	  cursor(ARROW);
  }
  
  var index = -1;
  if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
	var i = mouseX / boxSize;
	var j = mouseY / boxSize;
	var index = floor(j) * numcols + floor(i);
	debug.elt.textContent = index;
  }
  
  
  for (var i = 0; i < allBoxes.length; i++) {
		allBoxes[i].draw(i == index && ! pickColorMode);
  }
  
  if (doStroke) {
	  stroke(strokeC);
	  for (var i = 0; i < allBoxes.length; i++) {
			allBoxes[i].drawLine(i == index && ! pickColorMode);
	  }
	  for (var i = 0; i <= numcols; i++) {
		  line(i * boxSize, 0, i * boxSize, height);
	  }
	  for (var i = 0; i <= numrows; i++) {
		  line(0, i * boxSize, width, i * boxSize);
	  }
	  noStroke();
  }

}

