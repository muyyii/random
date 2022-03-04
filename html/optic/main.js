// Get rangers from html elements 
const hueRange = document.getElementById("hueRange"),
	zRange = document.getElementById("zRange"),
	aRange = document.getElementById("aRange");

// Get canvas and its context c 
const canvas = document.getElementById("canvas"),
	c = canvas.getContext("2d");

// Some canvas properties 
let w = canvas.width = 600;
let h = canvas.height = 300;

let w2 = w/2;
let h2 = h/2;

c.translate(w2, h2);

let t = 0;

// Sliders properties
hueRange.min = 0;
hueRange.max = 360;
hueRange.value = 200;
hueRange.step = 1;

zRange.min = 0;
zRange.max = 100;
zRange.value = 20;
zRange.step = 1;

aRange.min = 0;
aRange.max = 200;
aRange.value = 30;
aRange.step = 1;


// This function is so cool, you feed some number  1<n<360 and returns a color
function calcHue(hue){
	
	let r,g,b;

	let v = 0.8;
	let s = 0.5;
	let c = v * s;
	let x = c * (1 - Math.abs((hue/60)%2 - 1));
	let m = v - c;
	
	if (hue >= 0 && hue <= 60) r = c, g = x, b = 0;
	else if (hue >= 60 && hue <= 120) r = x, g = c, b = 0;
	else if (hue >= 120 && hue <= 180) r = 0, g = c, b = x;
	else if (hue >= 180 && hue <= 240) r = 0, g = x, b = c;
	else if (hue >= 240 && hue <= 300) r = x, g = 0, b = c;
	else r = c, g = 0, b = x;
	
	let red = Math.round((r + m)*255);
	let blue = Math.round((b + m)*255);
	let green = Math.round((g + m)*255);

	let color = "rgb("+red+","+green+","+blue+")";

	return color;
}

// Creates a circle with a custom color 
function circ(x, y, r, hue){
	c.fillStyle = calcHue(hue);
	c.beginPath();
	c.arc(x, y, r, 0, Math.PI*2, false);
	c.fill();
}

function line(x1, y1, x2, y2, s = 3, hue){
	c.strokeStyle = calcHue(hue);
	c.lineWidth = s;
	c.beginPath();
	c.moveTo(x1, y1);	
	c.lineTo(x2, y2);	
	c.stroke();
}

function draw(){
	
	let F = zRange.valueAsNumber;
	let So = aRange.valueAsNumber;
	let Yo = 40;

	// Clear the screen with black 
	c.fillStyle = "#000";
	c.fillRect(-w2, -h2, w, h);

	line(0, -h2/2, 0, h2/2, 5, 100);
	line(-w2, 0, w2, 0, 2, 95);
	
	circ( -F, 0, 6, hueRange.valueAsNumber);
	circ(F, 0, 6, hueRange.valueAsNumber);

	let Si = (F * So)/(So - F);
	//let Si = So-F != 0? (F * So)/(So - F) : 0;
	let Yi = -Si/So * Yo;
	
	circ(-So, -Yo, 5, 250);
	circ(Si, -Yi, 5, 5);

	line(-So, -Yo, Si, -Yi, 1.5, 320);
	
	line(-So, -Yo, 0, -Yo, 1.5, 300);
	line(0, -Yo, Si, -Yi, 1.5, 300);


	
	t+= 0.15;
	window.requestAnimationFrame(draw);
}

draw();


/* 
 * SOME HINTS 
 * 
 * The magic 0.618 is the Golden Angle - if you change it, you'll draw 
 * visible-spirals instead of a solid-looking surface
 *
 * Very basic 3D projection
 * (x, y, z) is world position and (u, v) is screen position
 *
 * let u = center + x*20;
 * let v = center - y*20 - z*8;
 * https://twitter.com/2DArray/status/1462826429431918592
 */ 

