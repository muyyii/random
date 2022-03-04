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

let t = 0;

// Sliders properties
hueRange.min = 0;
hueRange.max = 360;
hueRange.value = 200;
hueRange.step = 1;

zRange.min = -100;
zRange.max = 100;
zRange.value = 8;
zRange.step = 0.5;

aRange.min = 0;
aRange.max = 1.2;
aRange.value = 0.618;
aRange.step = 0.0001;


// This function is so cool, you feed some number  1<n<360 and returns a color
function calcHue(hue){
	
	let r,g,b;

	let v = 0.7;
	let s = 0.87;
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

function draw(){

	// Clear the screen with black 
	c.fillStyle = "#000";
	c.fillRect(0, 0, w, h);
	
	// Spiral, complete code, angle golden ratio. 
	for(let i=0; i<500; i++){
		let y = i/250;
		
		let a = i * 0.618 + t/8;
		let x = Math.cos(a);
		let z = Math.sin(a);

		let r = 4 + Math.sin(t/4 + y/8);
		circ(150 + x*80, 250 - y*80-z*8, r, Math.round(i*360/500));
	}

	for(let i=0; i<100; i++){
		
		let y = i/50;	// Altura?
		
		//let a = i * 0.618 + t/16; // Golden Angle?
		let a = i * aRange.valueAsNumber + t/16;
		
		let x = Math.cos(a); // 3D projection
		let z = Math.sin(a); // 3D projection

		let r = 5 * Math.sin(t/8 + y/8) + 8;
		circ(450 + x*80, 
			250 - y*80-z*zRange.valueAsNumber,
			r, 
			Math.round(i*hueRange.valueAsNumber/100));
	}

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

