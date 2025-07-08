## 🖌️ Drawing with a Brush: BASIK Tutorial

### 🎯 What You'll Learn
- How to set up a canvas
- Load and position an image as a brush
- Track mouse input to draw interactively
- Display helpful UI text

---

### 🧩 Step-by-Step Breakdown

#### 1. **Initialize the Environment**
```js
"use strict";
let brush;
console.log("test");
```
- `"use strict"` ensures cleaner JavaScript syntax.
- `brush` will hold the image used for drawing.
- `console.log("test")` confirms the script is running.

#### 2. **Start Function: Setup Canvas and Brush**
```js
function Start() {
  console.log("Start");
  Graphics(320, 240); // Create a canvas of 320x240 pixels
  brush = LoadImage("https://forkhub.github.io/basik/imgs/brush.png"); // Load brush image
  brush.handleX = 8; // Set brush anchor point (X)
  brush.handleY = 8; // Set brush anchor point (Y)
}
```
- `Graphics()` sets up the canvas.
- `LoadImage()` fetches the brush graphic.
- `handleX/Y` centers the brush for accurate placement.

#### 3. **Update Function: Draw on Mouse Drag**
```js
function Update() {
	if (MouseIsDown()) {
		brush.x = MouseX(); // Get current mouse X
		brush.y = MouseY(); // Get current mouse Y
		DrawImage(brush);   // Stamp brush at mouse position
	}
	Cls(0, 200, 320, 240); // Clear canvas with background color
	TextPos(0, 210);       // Set text position
	Write("Drag to draw"); // Display instruction
}
```
- `MouseIsDown()` checks if the mouse is pressed.
- `MouseX()` and `MouseY()` track cursor location.
- `DrawImage()` places the brush image.
- `Cls()` refreshes the canvas each frame.
- `Write()` gives user feedback.

---

### 🎥 Want to See It in Action?

These videos offer great visual support and alternative approaches:

1. [Create a simple drawing app using javascript and HTML5 ...](https://www.youtube.com/watch?v=mRDo-QXVUv8&pp=0gcJCfcAhR29_xXO) — Shows how to build a basic drawing app with canvas and mouse input.
2. [KonvaJS - Drawing with the Mouse](https://m.youtube.com/watch?v=r2Sd2Vf6Ku4) — Explores mouse events and drawing shapes interactively.
3. [3.1.1 IF / ELSE Example - Make a Drawing Machine - p5.js ...](https://www.youtube.com/watch?v=ucrlrVoe9Ns) — Demonstrates conditional drawing logic using p5.js.
4. [Draw rectangle on canvas using mouse | Canvas API | React js](https://www.youtube.com/watch?v=tm4Ter9dpfo) — Covers mouse tracking and shape drawing in React.
5. [Creative Coding - Week 09 - Drawing and Interaction (Mouse)](https://www.youtube.com/watch?v=IKFoGM6bau8) — Deep dive into mouse interaction and creative drawing techniques.
6. [Create Effect Cursor Like Spider Man Using Canvas HTML5 ...](https://www.youtube.com/watch?v=Djbg_ry-CrA) — Fun example of using canvas and mouse for dynamic effects.

---

If you'd like to expand this into a full drawing app with color selection, undo, or brush size control, I’d be thrilled to help you build it out!