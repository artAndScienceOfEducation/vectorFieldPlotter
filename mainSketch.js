var x0, y0;
var canvas_1;
var highestMagnitudeVector;
var i,j;
var x1, y1, x2, y2, x, y;
var x1_20, y1_20, x2_10, y2_10, x_20, y_20;
var magnitude, magnitude_20, xSquare, ySquare;
var xUnit, yUnit, xUnit_10, yUnit_10;
var setOfmagnitude = [961];
var a, b, c, theta, flag;
var input1, input2, button;
var lastExpr1, lastExpr2, correctExpr1, correctExpr2;
var exprFlag = 1;
var defaultExpr1 = 'y', defaultExpr2 = 'x';
var pDenoString, qDenoString, pDenoVal, qDenoval;
var mouseXpos, mouseYpos, Xaxis, Yaxis, xAxis = 0, yAxis = 0;
var pxy, qxy, pDenoString2, qDenoString2, pDenoVal2, qDenoval2;
var pDx, qDy, pDxVal, qDyVal, divergenceEq, divergenceVal;
var pDy, qDx, pDyVal, qDxVal, curlEq, curlVal;
var xDisplay, yDisplay, xyDisplay;
var checkbox;
var displayBoxFlag = 0, checkBoxFlag = 0;
var curlFlag = 0; divergenceFlag = 0;
var pxyVal, qxyVal, curlDisplay, divergenceDisplay;
var sliderGraphics, sliderValue = 0.8, sliderValueMin = 0.08, sliderValueMax = 2, step = 0.02;
var enableScalingFlag = 0, checkboxScale;
var xyMin, xyMax, currentXY;
var pofxy, qofxy, equation, currentEquation, xLabel, yLabel, xyLabel, pValue, qValue;
var curlEquation, curlHeading, curlEQU, curlFlag2 = 0;
var divEquation, divHeading, divEQU, divFlag2 = 0;
var checkboxZoom, sliderGraphicsZoom, sliderValueZoom = 1, sliderValueMinZoom = 1, sliderValueMaxZoom = 8, stepZoom = 1;
var sliderValueZoomCurrent;
var divByij = 1, mulByPx = 1;
var ijValLow = 15, ijValHigh = 16;
var extraDensity = 1, extraDensityEnable;
var zoomEnable = 0;


function setup() {
	canvas_1  = createCanvas(1300, 700);
	canvas_1.position(0,0);


/*x0,y0 is the centre of the canvas and we are shifting the axis to the x0,y0 and drawing
other components with respect to that*/
x0 = width/2;
y0 = height/2;

translate(x0, y0);

//main code to run
{
	lastExpr1 = defaultExpr1;
	lastExpr2 = defaultExpr2;

	correctExpr1 = lastExpr1;
	correctExpr2 = lastExpr2;

	clear();

	outerRectangle();
	axisLines();
	axisLabeling();

	UIEquation();

	highestMagnitudeVector = highestMagnitudeOfVector();

	mainVectorFieldPlotter();
	colourBarAndMagnitude(highestMagnitudeVector);

	curl();
	divergence();

}
}

function outerRectangle(){
	var hue = 0, saturation = 0, brightrness = 255, stroke_Weight = 4;
	var x1 = -320, y1 = -320, width = 640, height = 640;

colorMode(RGB); //HSB(360,100,100) maximum values
stroke(hue, saturation, brightrness);
strokeWeight(stroke_Weight);
fill(0);
rect(x1, y1, width, height);
}

function axisLines(){
	var r = 0, g = 0, b = 255, stroke_Weight = 3;
var x1 = -320, y1 = 0, x2 = 320, y2 = 0; //x-axis line
var p1 = 0, q1 = -320, p2 = 0, q2 = 320; //y-axis line

// main axis lines

colorMode(RGB); //HSB(360,100,100) maximum values
stroke('rgba(255,255,255,0.2)');
strokeWeight(stroke_Weight);
line(x1, y1, x2, y2);
line(p1, q1, p2, q2);

// sub axis lines

for (i=300;i>=-300;i-=20){
	line(x1, y1+i, x2, y2+i);
	line(p1+i, q1, p2+i, q2);
}
}

function axisLabeling(){
	var i;
	var gap = 20;
	var hue = 0, saturation = 0, brightrness = 0, stroke_Weight = 1;
	var start = 315, end = 325;

//axis labeling lines
colorMode(HSB); //HSB(360,100,100) maximum values
stroke(hue, saturation, brightrness);
strokeWeight(stroke_Weight);



for (i=-15; i<16; i++) {

//right side of the outer box
line(start, (gap*i)+0, end, (gap*i)+0);

//left side of the outer box 
line(-(start), (gap*i)+0, -(end), (gap*i)+0);

//tor part of the outer box
line((gap*i)+0, -(start), (gap*i)+0, -(end));

//bottom part of the outer box
line((gap*i)+0, start, (gap*i)+0, end);
}



if (zoomEnable == 1){

//axis labeling numbers
textSize(12);
noStroke();
fill(0);
textAlign(CENTER, BOTTOM);

var unitJump = (15/divByij)/15;
var upperJump = 15/divByij;

j = 0;

for (i= -upperJump; i<= upperJump+0.00001; i+= unitJump) {

	if (i < -3e-18 && i > -3e-5){

		i = 0;
	}

	if (i > 3e-18 && i < 3e-5){

		i = 0;
	}


//right side of the box
text(-(round(i,3)), 345, -292+j);

//left side of the box
text(-(round(i,3)), -345, -292+j);

j = j + 20;   
}


textSize(12);
noStroke();
fill(0);
textAlign(CENTER);

var unitJump = (15/divByij)/15;
var upperJump = 15/divByij;

j = 0;

for (i= -upperJump; i<= upperJump+0.001; i+= (unitJump*3)) {

	if (i < -3e-18 && i > -3e-5){

		i = 0;
	}

	if (i > 3e-18 && i < 3e-5){

		i = 0;
	}


//top side of the box

text(-(round(i,3)), +300-j, -330);

//bottom side of the box

text(-(round(i,3)), +300-j, 345);

j = j + 60;   
}

noFill();

}


if (zoomEnable == 0){

//axis labeling numbers
textSize(12);
noStroke();
fill(0);
textAlign(CENTER, BOTTOM);

var unitJump = (15/divByij)/15;
var upperJump = 15/divByij;

j = 0;

for (i= -upperJump; i<= upperJump+0.00001; i+= unitJump) {

	if (i < -3e-18 && i > -3e-5){

		i = 0;
	}

	if (i > 3e-18 && i < 3e-5){

		i = 0;
	}


//right side of the box
text(-(round(i,3)), 345, -292+j);

//left side of the box
text(-(round(i,3)), -345, -292+j);

j = j + 20;   
}


textSize(12);
noStroke();
fill(0);
textAlign(CENTER);

var unitJump = (15/divByij)/15;
var upperJump = 15/divByij;

j = 0;

for (i= -upperJump; i<= upperJump+0.001; i+= (unitJump)) {

	if (i < -3e-18 && i > -3e-5){

		i = 0;
	}

	if (i > 3e-18 && i < 3e-5){

		i = 0;
	}


//top side of the box

text(-(round(i,3)), +300-j, -330);

//bottom side of the box

text(-(round(i,3)), +300-j, 345);

j = j + 20;   
}

noFill();

}
}

function highestMagnitudeOfVector(){
	var i, j, count, highestMagnitude;
	var x1, y1, x, y;
	var magnitude, xSquare, ySquare;

	count = 0;
	setOfmagnitude = [];

	for (i=-15; i<16; i++) {

		for (j=-15; j<16; j++) {

			if (i == 0 && j ==0){continue;}

			else{

				try{

					pDenoString = nerdamer(input1.value()).denominator().toString();
					qDenoString = nerdamer(input2.value()).denominator().toString();

					pDenoVal = Number(nerdamer(pDenoString,{x:i, y:j}).evaluate().text());
					qDenoval = Number(nerdamer(qDenoString,{x:i, y:j}).evaluate().text());

				}

				catch(err){
					lastExpr1 = correctExpr1;
					lastExpr2 = correctExpr2;

					runTheCode();

					exprFlag = 1;
				}


				if (pDenoVal == 0 || qDenoval == 0){

					continue;
				}

				else{

					try{

						x = Number(nerdamer(input1.value(),{x:i, y:j}).evaluate().text());

						y = Number(nerdamer(input2.value(),{x:i, y:j}).evaluate().text());

					}

					catch(err){
						lastExpr1 = correctExpr1;
						lastExpr2 = correctExpr2;

						runTheCode();

						exprFlag = 1;
					}

					xSquare = ((x)*(x));
					ySquare = ((y)*(y));

					magnitude = Math.pow(((xSquare)+(ySquare)),0.5);

					setOfmagnitude[count] = magnitude;

					count = count + 1;
				}

			}
		}
	}

	highestMagnitude = setOfmagnitude.reduce(function(a,b){
		return max(a,b);
	});


	try{if(isNaN(highestMagnitude)) throw 50}
	catch(err){
		lastExpr1 = correctExpr1;
		lastExpr2 = correctExpr2;

		runTheCode();

		exprFlag = 1;
	}

	return highestMagnitude;
}

function mainVectorFieldPlotter(){

	ijValLow = 15/divByij;
	ijValHigh = 15/divByij;


	for (i=-ijValLow; i<=ijValHigh+0.001; i += (1/divByij)/extraDensity) {

		for (j=-ijValLow; j<=ijValHigh+0.001; j += (1/divByij)/extraDensity) {

			if (i == 0 && j ==0){continue;}

			else{

				try{


					pDenoString = nerdamer(input1.value()).denominator().toString();
					qDenoString = nerdamer(input2.value()).denominator().toString();

					pDenoVal = Number(nerdamer(pDenoString,{x:i, y:j}).evaluate().text());
					qDenoval = Number(nerdamer(qDenoString,{x:i, y:j}).evaluate().text());

				}

				catch(err){
					lastExpr1 = correctExpr1;
					lastExpr2 = correctExpr2;

					runTheCode();

					exprFlag = 1;
				}

				if (pDenoVal == 0 || qDenoval == 0){

					continue;
				}

				else{

					x1 = i;
					y1 = j;

					x1_20 = i*(20*mulByPx);
					y1_20 = j*(20*mulByPx);

					x = Number(nerdamer(input1.value(),{x:i, y:j}).evaluate().text());
					y = Number(nerdamer(input2.value(),{x:i, y:j}).evaluate().text());

					x_20 = x*20;
					y_20 = y*20;

					xSquare = ((x)*(x));
					ySquare = ((y)*(y));

					magnitude = round((sqrt((xSquare)+(ySquare))),4);

					magnitude_20 = (magnitude*20);

					xUnit = (x/magnitude);
					yUnit = (y/magnitude);

					xUnit_10 = xUnit*10;
					yUnit_10 = yUnit*10;

					x2 = (x1+xUnit);
					y2 = (y1+yUnit);

					if (enableScalingFlag == 0){
//scaled to unit vector
x2_10 = ((x1_20)+(xUnit_10));
y2_10 = ((y1_20)+(yUnit_10));
}

if (enableScalingFlag == 1){
	x2_10 = ((x1_20)+(x)*sliderValue);
	y2_10 = ((y1_20)+(y)*sliderValue);
}

a = ((y2-y1)/(x2-x1));
theta = abs(degrees(atan(a)));

if ((x2>x1) && (y2>y1)) {
	flag = 1;
}

if ((x2<x1) && (y2>y1)) {
	flag = 2;
}

if ((x2<x1) && (y2<y1)) {
	flag = 3;
}

if ((x2>x1) && (y2<y1)) {
	flag = 4;
}


if ((x2>x1) && (y2==y1)) {
	flag = 1;
}

if ((x2<x1) && (y2==y1)) {
	flag = 2;
}

if ((x2==x1) && (y2>y1)) {
	flag = 1;
}

if ((x2==x1) && (y2<y1)) {
	flag = 4;
}  

switch(flag) {
	case 4: 
	b=theta-135;
	c=b-90;
	break;
	case 3: 
	b=-(theta-45);
	c=(b-90);
	break;
	case 2: 
	b=(theta-45);
	c=(b+90);  
	break;
	case 1: 
	b=(90-theta)+45;
	c=(b+90);
	break;
}

y1_20 = -y1_20;
y2_10 = -y2_10;

colorMode(HSB, highestMagnitudeVector);
stroke(magnitude, highestMagnitudeVector, highestMagnitudeVector);

line(x1_20, y1_20, x2_10, y2_10);

push();
translate(x2_10, y2_10);
rotate(radians(b));
line(0, 0, 5, 0);
pop();

push();
translate(x2_10, y2_10);
rotate(radians(c));
line(0, 0, 5, 0);
pop();

}

}

}

}	
}

function colourBarAndMagnitude(maxValue) {

	var noOfDivision = 341;
	var unitSize = (maxValue/noOfDivision);
	var i,j;

	colorMode(HSB, 340);

	for (l=0; l<=340; l++) {
		stroke(l, 340, 340);
		line(-630, -330+l, -540, -330+l);
	}

	for (i=0; i<=340; i+=20) {

		textSize(13);
		textAlign(CENTER, BASELINE);
		fill(0);
		noStroke();
		textAlign(LEFT);
		text(round((unitSize*i),4), -520, -325+i);   
		noFill();
		stroke(0);
		line(-540, -330+i, -530, -330+i );
		noStroke();
	}
}

function UIEquation(){

	input1 = createInput(lastExpr1);
	input1.position(canvas_1.x + 100, canvas_1.y + 460);

	input2 = createInput(lastExpr2);
	input2.position(input1.x, input1.y + 30);

	button = createButton('Submit');
	button.position(input2.x, input2.y + 30);
	button.mousePressed(submitButtonPressed);

	if (checkBoxFlag == 0){

		xyDisplay = createInput("("+xAxis+","+yAxis+")");
		xyDisplay.position(button.x, button.y + 50);
		xyDisplay.attribute('disabled', '');

		checkbox = createCheckbox('Custom Coordinate', false);
		checkbox.position(xyDisplay.x, xyDisplay.y + 30);
		checkbox.changed(enableButton);

		xDisplay = createInput("0");
		xDisplay.position(checkbox.x, checkbox.y + 30);
		xDisplay.attribute('disabled', '');

		yDisplay = createInput("0");
		yDisplay.position(xDisplay.x, xDisplay.y + 30);
		yDisplay.attribute('disabled', '');

		pxyVal = createInput("0");
		pxyVal.position(canvas_1.x + 1090, canvas_1.y + 25);
		pxyVal.attribute('disabled', '');

		qxyVal = createInput("0");
		qxyVal.position(canvas_1.x + 1090, canvas_1.y + 55);
		qxyVal.attribute('disabled', '');

		curlDisplay = createInput("0");
		curlDisplay.position(canvas_1.x + 1090, canvas_1.y + 105);
		curlDisplay.attribute('disabled', '');

		divergenceDisplay = createInput("0");
		divergenceDisplay.position(canvas_1.x + 1130, canvas_1.y + 185);
		divergenceDisplay.attribute('disabled', '');

		sliderGraphics = createSlider(sliderValueMin, sliderValueMax, sliderValue, step);
		sliderGraphics.position(canvas_1.x + 1050, canvas_1.y + 330);
		sliderGraphics.style('width', '220px');
		sliderGraphics.attribute('disabled', '');
		sliderGraphics.input(getSliderValue);

		checkboxScale = createCheckbox('Scaling Factor', false);
		checkboxScale.position(canvas_1.x + 1020, sliderGraphics.y - 60);
		checkboxScale.changed(sliderScale);

		xyMin = createInput(sliderValueMin);
		xyMin.position(canvas_1.x + 1030, sliderGraphics.y + 30);
		xyMin.size(50,20);
		xyMin.attribute('disabled', '');
		xyMin.input(xyMinVal);

		xyMax= createInput(sliderValueMax);
		xyMax.position(canvas_1.x + 1240, sliderGraphics.y + 30);
		xyMax.size(50,20);
		xyMax.attribute('disabled', '');
		xyMax.input(xyMaxVal);

		currentXY= createInput(sliderValue);
		currentXY.position(canvas_1.x + 1140, sliderGraphics.y + 30);
		currentXY.size(50,20);
		currentXY.attribute('disabled', '');

		pofxy = createP();
		pofxy.style('font-size', '15px');
		pofxy.position(canvas_1.x + 20, canvas_1.y + 444);
		katex.render('P(x,y)'+"\\vec{i}", pofxy.elt);

		qofxy = createP();
		qofxy.style('font-size', '15px');
		qofxy.position(canvas_1.x + 20, canvas_1.y + 476);
		katex.render('Q(x,y)'+"\\vec{j}", qofxy.elt);

		equation = createP();
		equation.style('font-size', '12px');
		equation.position(canvas_1.x + 20, canvas_1.y + 370);
		katex.render('\\vec{F}(x,y) =' + 'P(x,y)'+"\\vec{i}" + "+" + 'Q(x,y)' + "\\vec{j}", equation.elt);

		var xEq = nerdamer.convertToLaTeX(correctExpr1).toString();
		var yEq = nerdamer.convertToLaTeX(correctExpr2).toString();

		currentEquation = createP();
		currentEquation.style('font-size', '10px');
		currentEquation.position(canvas_1.x + 20, canvas_1.y + 405);
		katex.render('\\vec{F}(x,y) =' + "(" + xEq + ")" + "+" + "(" + yEq + ")", currentEquation.elt);

		xLabel = createP();
		xLabel.style('font-size', '15px');
		xLabel.position(canvas_1.x + 60, canvas_1.y + 615);
		katex.render('x =', xLabel.elt);

		yLabel = createP();
		yLabel.style('font-size', '15px');
		yLabel.position(canvas_1.x + 60, canvas_1.y + 645);
		katex.render('y =', yLabel.elt);

		xyLabel = createP();
		xyLabel.style('font-size', '15px');
		xyLabel.position(canvas_1.x + 30, canvas_1.y + 555);
		katex.render('(x,y) =', xyLabel.elt);

		pValue = createP();
		pValue.style('font-size', '13px');
		pValue.position(canvas_1.x + 1020, canvas_1.y + 12);
		katex.render('P(x,y)'+"\\vec{i}", pValue.elt);

		qValue = createP();
		qValue.style('font-size', '13px');
		qValue.position(canvas_1.x + 1020, canvas_1.y + 42);
		katex.render('Q(x,y)'+"\\vec{j}", qValue.elt);

		curlHeading = createP();
		curlHeading.style('font-size', '15px');
		curlHeading.position(canvas_1.x + 1020, canvas_1.y + 90);
		katex.render("Curl:", curlHeading.elt);

		divHeading = createP();
		divHeading.style('font-size', '15px');
		divHeading.position(canvas_1.x + 1020, canvas_1.y + 170);
		katex.render("Divergence:", divHeading.elt);

		checkboxZoom = createCheckbox('Zooming Factor', false);
		checkboxZoom.position(canvas_1.x + 1020, sliderGraphics.y + 80);
		checkboxZoom.changed(sliderScaleZoom);

		sliderGraphicsZoom = createSlider(sliderValueMinZoom, sliderValueMaxZoom, sliderValueZoom, stepZoom);
		sliderGraphicsZoom.position(canvas_1.x + 1050, sliderGraphics.y + 140);
		sliderGraphicsZoom.style('width', '220px');
		sliderGraphicsZoom.attribute('disabled', '');
		sliderGraphicsZoom.input(sliderValueZoomRead);

		extraDensityEnable = createCheckbox('Density++', false);
		extraDensityEnable.position(canvas_1.x + 1020, sliderGraphics.y + 180);
		extraDensityEnable.changed(extraDensityEnableFunc);

		checkBoxFlag = 1;
	}
	displayData();
}

function extraDensityEnableFunc(){

	if (this.checked()) {

// Re-enable the button
extraDensity = 2;
runTheCode();

} else {
// Disable the button
extraDensity = 1;
runTheCode();
}
}



function sliderScaleZoom(){

	if (this.checked()) {

// Re-enable the button
sliderGraphicsZoom.removeAttribute('disabled');
zoomEnable = 1;
runTheCode();

} else {
// Disable the button
sliderGraphicsZoom.attribute('disabled', '');

divByij = 1; 
mulByPx = 1;
sliderValueZoom = 1;

sliderGraphicsZoom.remove();

sliderGraphicsZoom = createSlider(sliderValueMinZoom, sliderValueMaxZoom, sliderValueZoom, stepZoom);
sliderGraphicsZoom.position(canvas_1.x + 1050, sliderGraphics.y + 140);
sliderGraphicsZoom.style('width', '220px');
sliderGraphicsZoom.attribute('disabled', '');
sliderGraphicsZoom.input(sliderValueZoomRead);

zoomEnable = 0;

runTheCode();
}
}

function sliderValueZoomRead(){

	let sliderValueZoomCurrent = sliderGraphicsZoom.value();

	divByij = sliderValueZoomCurrent;
	mulByPx = sliderValueZoomCurrent;

}


function runTheCode(){

	colorMode(RGB);
	clear();

	colorMode(HSB);

	outerRectangle();
	axisLines();
	axisLabeling();

	UIEquation();

	highestMagnitudeVector = highestMagnitudeOfVector();

	mainVectorFieldPlotter();
	colourBarAndMagnitude(highestMagnitudeVector);

//all text
latexText();
displayLatexText();
}

function submitButtonPressed(){

	sliderValue = sliderGraphics.value();

	lastExpr1 = input1.value();
	lastExpr2 = input2.value();

	runTheCode();

	if (exprFlag == 1){

		correctExpr1 = lastExpr1;
		correctExpr2 = lastExpr2;

		mousePressed();

		runTheCode();

	}

	else {

		lastExpr1 = correctExpr1;
		lastExpr2 = correctExpr2;

		mousePressed();

		runTheCode();

		exprFlag = 1;
	}
}

function mousePressed(){

	mousePosition();
	calculatePQ();
	displayData();

	PQvalueDisplay();

	CurlDivergenceDisplay();
}

function mousePosition(){

	if (mouseIsPressed) { 

		mouseXpos = mouseX-650;

		mouseYpos = -(mouseY-350);

		Xaxis = (mouseXpos/(20*mulByPx));

		Yaxis = (mouseYpos/(20*mulByPx));

		if (Xaxis >= (-15.99/divByij) && Xaxis <= (15.99/divByij) && Yaxis >= (-15.99/divByij) && Yaxis <= (15.99/divByij)){

			xAxis = round(Xaxis,3);
			yAxis = round(Yaxis,3);
		}
	}
}

function calculatePQ(){

	if (displayBoxFlag == 0) {

		pDenoString2 = nerdamer(input1.value()).denominator().toString();
		qDenoString2 = nerdamer(input2.value()).denominator().toString();

		pDenoVal2 = Number(nerdamer(pDenoString,{x:xAxis, y:yAxis}).evaluate().text());
		qDenoval2 = Number(nerdamer(qDenoString,{x:xAxis, y:yAxis}).evaluate().text());

		if (pDenoVal2 == 0 || qDenoval2 == 0) {

			pxy = 'UNDEFINED';
			qxy = 'UNDEFINED';

			divergenceVal = "UNDEFINED";
			curlVal = "UNDEFINED";

		}

		else{

			pxy = round(Number(nerdamer(input1.value(),{x:xAxis, y:yAxis}).evaluate().text()),4);
			qxy = round(Number(nerdamer(input2.value(),{x:xAxis, y:yAxis}).evaluate().text()),4);

			divergence();
			curl();

		}
	}

	if (displayBoxFlag == 1) {

		pDenoString2 = nerdamer(input1.value()).denominator().toString();
		qDenoString2 = nerdamer(input2.value()).denominator().toString();

		pDenoVal2 = Number(nerdamer(pDenoString,{x:(Number(xDisplay.value())), y:(Number(yDisplay.value()))}).evaluate().text());
		qDenoval2 = Number(nerdamer(qDenoString,{x:(Number(xDisplay.value())), y:(Number(yDisplay.value()))}).evaluate().text());

		if (pDenoVal2 == 0 || qDenoval2 == 0) {

			pxy = 'UNDEFINED';
			qxy = 'UNDEFINED';

			divergenceVal = "UNDEFINED";
			curlVal = "UNDEFINED";

		}

		else{

			pxy = round(Number(nerdamer(input1.value(),{x:(Number(xDisplay.value())), y:(Number(yDisplay.value()))}).evaluate().text()),4);
			qxy = round(Number(nerdamer(input2.value(),{x:(Number(xDisplay.value())), y:(Number(yDisplay.value()))}).evaluate().text()),4);

			divergence();
			curl();
		}
	}
}

function divergence(){

	if (displayBoxFlag == 1){

		pDx = nerdamer.diff(input1.value(), 'x');  
		qDy = nerdamer.diff(input2.value(), 'y');

		divergenceEq = nerdamer((pDx)+'+'+(qDy)).text();

		pDxVal = Number(nerdamer(pDx,{x:(Number(xDisplay.value())), y:(Number(yDisplay.value()))}).evaluate().text());
		qDyVal = Number(nerdamer(qDy,{x:(Number(xDisplay.value())), y:(Number(yDisplay.value()))}).evaluate().text());

		divergenceVal = (pDxVal)+(qDyVal);

		if (divFlag2 == 0){

			divEquation = createDiv();
			divEquation.size(1000,AUTO);
			divEquation.style('font-size', '15px');
			divEquation.position(canvas_1.x + 1020, canvas_1.y + 220);
			var divEQU = nerdamer.convertToLaTeX(String(divergenceEq)).toString();
			katex.render("Equation:\n" + divEQU, divEquation.elt);

			divFlag2 = 1;
		}

	}

	if (displayBoxFlag == 0){

		pDx = nerdamer.diff(input1.value(), 'x');  
		qDy = nerdamer.diff(input2.value(), 'y');

		divergenceEq = nerdamer((pDx)+'+'+(qDy)).text();

		pDxVal = Number(nerdamer(pDx,{x:xAxis, y:yAxis}).evaluate().text());
		qDyVal = Number(nerdamer(qDy,{x:xAxis, y:yAxis}).evaluate().text());

		divergenceVal = (pDxVal)+(qDyVal);

		if (divFlag2 == 0){

			divEquation = createDiv();
			divEquation.size(1000,AUTO);
			divEquation.style('font-size', '15px');
			divEquation.position(canvas_1.x + 1020, canvas_1.y + 220);
			var divEQU = nerdamer.convertToLaTeX(String(divergenceEq)).toString();
			katex.render("Equation:\n" + divEQU, divEquation.elt);

			divFlag2 = 1;
		}

	}
}


function curl(){

	if (displayBoxFlag == 0){

		pDy = nerdamer.diff(input1.value(), 'y');  
		qDx = nerdamer.diff(input2.value(), 'x');

		curlEq = nerdamer((qDx)+'-'+(pDy)).text();

		pDyVal = Number(nerdamer(pDy,{x:xAxis, y:yAxis}).evaluate().text());
		qDxVal = Number(nerdamer(qDx,{x:xAxis, y:yAxis}).evaluate().text());

		curlVal = (qDxVal)-(pDyVal);

		if (curlFlag2 == 0){

			curlEquation = createDiv();
			curlEquation.size(1000,AUTO);
			curlEquation.style('font-size', '15px');
			curlEquation.position(canvas_1.x + 1020, canvas_1.y + 140);
			var curlEQU = nerdamer.convertToLaTeX(String(curlEq)).toString();
			katex.render("Equation: " + curlEQU, curlEquation.elt);

			curlFlag2 = 1;
		}
	}

	if (displayBoxFlag == 1){

		pDy = nerdamer.diff(input1.value(), 'y');  
		qDx = nerdamer.diff(input2.value(), 'x');

		curlEq = nerdamer((qDx)+'-'+(pDy)).text();

		pDyVal = Number(nerdamer(pDy,{x:(Number(xDisplay.value())), y:(Number(yDisplay.value()))}).evaluate().text());
		qDxVal = Number(nerdamer(qDx,{x:(Number(xDisplay.value())), y:(Number(yDisplay.value()))}).evaluate().text());

		curlVal = (qDxVal)-(pDyVal);

		if (curlFlag2 == 0){

			curlEquation = createDiv();
			curlEquation.size(1000,AUTO);
			curlEquation.style('font-size', '15px');
			curlEquation.position(canvas_1.x + 1020, canvas_1.y + 140);
			var curlEQU = nerdamer.convertToLaTeX(String(curlEq)).toString();
			katex.render("Equation: " + curlEQU, curlEquation.elt);

			curlFlag2 = 1;
		}
	}
}

function displayData(){

	xyDisplay.remove();


	if (displayBoxFlag == 0){

		xyDisplay = createInput("("+xAxis+","+yAxis+")");
		xyDisplay.position(button.x, button.y + 50);
		xyDisplay.attribute('disabled', '');

	}

	if (displayBoxFlag == 1){

		xyDisplay = createInput("("+(xDisplay.value())+","+(yDisplay.value())+")");
		xyDisplay.position(button.x, button.y + 50);
		xyDisplay.attribute('disabled', '');
	}
}

function PQvalueDisplay(){

	pxyVal.remove();

	pxyVal = createInput(String(pxy));
	pxyVal.position(canvas_1.x + 1090, canvas_1.y + 25);
	pxyVal.attribute('disabled', '');

	qxyVal.remove();

	qxyVal = createInput(String(qxy));
	qxyVal.position(canvas_1.x + 1090, canvas_1.y + 55);
	qxyVal.attribute('disabled', '');
}

function CurlDivergenceDisplay(){

	curlDisplay.remove();

	curlDisplay = createInput(String(curlVal));
	curlDisplay.position(canvas_1.x + 1090, canvas_1.y + 105);
	curlDisplay.attribute('disabled', '');

	divergenceDisplay.remove();

	divergenceDisplay = createInput(String(divergenceVal));
	divergenceDisplay.position(canvas_1.x + 1130, canvas_1.y + 185);
	divergenceDisplay.attribute('disabled', '');
}

function enableButton() {
	if (this.checked()) {
		displayBoxFlag = 1;
// Re-enable the button
xDisplay.removeAttribute('disabled');
yDisplay.removeAttribute('disabled');

} else {
// Disable the button
displayBoxFlag = 0;
xDisplay.attribute('disabled', '');
yDisplay.attribute('disabled', '');
}
}

function sliderScale(){

	if (this.checked()) {

// Re-enable the button
sliderGraphics.removeAttribute('disabled');
xyMax.removeAttribute('disabled');
xyMin.removeAttribute('disabled');
enableScalingFlag = 1;
runTheCode();

} else {
// Disable the button
sliderGraphics.attribute('disabled', '');
xyMax.attribute('disabled', '');
xyMin.attribute('disabled', '');
enableScalingFlag = 0;
runTheCode();
}
}

function sliderScaleDisplay(){

	sliderGraphics.remove();

	sliderGraphics = createSlider(sliderValueMin, sliderValueMax, sliderValue, step);
	sliderGraphics.position(canvas_1.x + 1090, canvas_1.y + 330);
	sliderGraphics.style('width', '200px');
}

function getSliderValue(){

	currentXY.remove();
	sliderValue = sliderGraphics.value();

	currentXY= createInput(sliderValue);
	currentXY.position(canvas_1.x + 1140, sliderGraphics.y + 30);
	currentXY.size(50,20);
	currentXY.attribute('disabled', '');
}

function xyMinVal(){

	sliderValueMin = Number(xyMin.value());

	sliderGraphics.remove();

	sliderGraphics = createSlider(sliderValueMin, sliderValueMax, sliderValue, step);
	sliderGraphics.position(canvas_1.x + 1050, canvas_1.y + 330);
	sliderGraphics.style('width', '220px');

	sliderGraphics.input(getSliderValue);

	currentXY.remove();
	sliderValue = sliderGraphics.value();

	currentXY= createInput(sliderValue);
	currentXY.position(canvas_1.x + 1140, sliderGraphics.y + 30);
	currentXY.size(50,20);
	currentXY.attribute('disabled', '');

}

function xyMaxVal(){

	sliderValueMax = Number(xyMax.value());

	sliderGraphics.remove();

	sliderGraphics = createSlider(sliderValueMin, sliderValueMax, sliderValue, step);
	sliderGraphics.position(canvas_1.x + 1050, canvas_1.y + 330);
	sliderGraphics.style('width', '220px');

	sliderGraphics.input(getSliderValue);

	currentXY.remove();
	sliderValue = sliderGraphics.value();

	currentXY= createInput(sliderValue);
	currentXY.position(canvas_1.x + 1140, sliderGraphics.y + 30);
	currentXY.size(50,20);
	currentXY.attribute('disabled', '');
}

function latexText(){

	pofxy.remove();
	qofxy.remove();
	equation.remove();
	xLabel.remove();
	yLabel.remove();
	xyLabel.remove();
	pValue.remove();
	qValue.remove();
	curlHeading.remove();
	curlEquation.remove();
	divHeading.remove();
	divEquation.remove();

	pofxy = createP();
	pofxy.style('font-size', '15px');
	pofxy.position(canvas_1.x + 20, canvas_1.y + 444);
	katex.render('P(x,y)'+"\\vec{i}", pofxy.elt);

	qofxy = createP();
	qofxy.style('font-size', '15px');
	qofxy.position(canvas_1.x + 20, canvas_1.y + 476);
	katex.render('Q(x,y)'+"\\vec{j}", qofxy.elt);

	equation = createP();
	equation.style('font-size', '12px');
	equation.position(canvas_1.x + 20, canvas_1.y + 370);
	katex.render('\\vec{F}(x,y) =' + 'P(x,y)'+"\\vec{i}" + "+" + 'Q(x,y)' + "\\vec{j}", equation.elt);

	xLabel = createP();
	xLabel.style('font-size', '15px');
	xLabel.position(canvas_1.x + 60, canvas_1.y + 615);
	katex.render('x =', xLabel.elt);

	yLabel = createP();
	yLabel.style('font-size', '15px');
	yLabel.position(canvas_1.x + 60, canvas_1.y + 645);
	katex.render('y =', yLabel.elt);

	xyLabel = createP();
	xyLabel.style('font-size', '15px');
	xyLabel.position(canvas_1.x + 30, canvas_1.y + 555);
	katex.render('(x,y) =', xyLabel.elt);

	pValue = createP();
	pValue.style('font-size', '13px');
	pValue.position(canvas_1.x + 1020, canvas_1.y + 12);
	katex.render('P(x,y)'+"\\vec{i}", pValue.elt);

	qValue = createP();
	qValue.style('font-size', '13px');
	qValue.position(canvas_1.x + 1020, canvas_1.y + 42);
	katex.render('Q(x,y)'+"\\vec{j}", qValue.elt);

	curlHeading = createP();
	curlHeading.style('font-size', '15px');
	curlHeading.position(canvas_1.x + 1020, canvas_1.y + 90);
	katex.render("Curl:", curlHeading.elt);

	curlEquation = createDiv();
	curlEquation.size(1000,AUTO);
	curlEquation.style('font-size', '15px');
	curlEquation.position(canvas_1.x + 1020, canvas_1.y + 140);
	var curlEQU = nerdamer.convertToLaTeX(String(curlEq)).toString();
	katex.render("Equation:\n" + curlEQU, curlEquation.elt);

	divHeading = createP();
	divHeading.style('font-size', '15px');
	divHeading.position(canvas_1.x + 1020, canvas_1.y + 170);
	katex.render("Divergence:", divHeading.elt);

	divEquation = createDiv();
	divEquation.size(1000,AUTO);
	divEquation.style('font-size', '15px');
	divEquation.position(canvas_1.x + 1020, canvas_1.y + 220);
	var divEQU = nerdamer.convertToLaTeX(String(divergenceEq)).toString();
	katex.render("Equation:\n" + divEQU, divEquation.elt);

}

function displayLatexText(){

	var xEq = nerdamer.convertToLaTeX(correctExpr1).toString();
	var yEq = nerdamer.convertToLaTeX(correctExpr2).toString();

	currentEquation.remove();

	currentEquation = createP();
	currentEquation.style('font-size', '10px');
	currentEquation.position(canvas_1.x + 20, canvas_1.y + 405);
	katex.render('\\vec{F}(x,y) =' + "(" + xEq + ")" + "+" + "(" + yEq + ")", currentEquation.elt);
}



