// Get the canvas element and context
const canvas = document.getElementById("artCanvas");
const ctx = canvas.getContext("2d");

const shapeCountInput = document.getElementById("shapeCountInput");
const shapeTypeSelect = document.getElementById("shapeTypeSelect");
const colorWordInput = document.getElementById("colorWordInput");
let shapes = [];

// get a random number between min and max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// get a random color
function getRandomColor() {
  const r = getRandomInt(0, 256);
  const g = getRandomInt(0, 256);
  const b = getRandomInt(0, 256);
  return `rgb(${r},${g},${b})`;
}

// create shapes
function createShapes(shapeType, numberOfShapes) {
  shapes = []; 
  for (let i = 0; i < numberOfShapes; i++) {
    const x = getRandomInt(0, canvas.width);
    const y = getRandomInt(0, canvas.height);
    const size = getRandomInt(2, 100);
    const color = getRandomColor();
    let shape = { x, y, size, color, type: shapeType };

    if (shapeType === 'mixed') {
      const types = ['circle', 'rectangle', 'triangle'];
      shape.type = types[getRandomInt(0, types.length)];
    }

    shapes.push(shape);
  }
  drawShapes();
}

// draw shapes
function drawShapes() {
  const bgColor = getBackgroundColor(colorWordInput.value.length);
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  shapes.forEach((shape) => {
    ctx.fillStyle = shape.color;
    ctx.beginPath();
    if (shape.type === 'circle') {
      ctx.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2, true);
      ctx.fill();
    } else if (shape.type === 'rectangle') {
      ctx.fillRect(shape.x - shape.size / 2, shape.y - shape.size / 2, shape.size, shape.size);
    } else if (shape.type === 'triangle') {
      drawTriangle(shape.x, shape.y, shape.size);
    }
  });
}

// draw a triangle
function drawTriangle(x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y - size / 2);
  ctx.lineTo(x - size / 2, y + size / 2);
  ctx.lineTo(x + size / 2, y + size / 2);
  ctx.closePath();
  ctx.fill();
}

// get the background color based on the length of the word
function getBackgroundColor(length) {
  switch (length) {
    case 1:
      return "lightblue";
    case 2:
      return "lightgreen";
    case 3:
      return "yellow";
    case 4:
      return "orange";
    case 5:
      return "red";
    case 6:
      return "purple";
    case 7:
      return "pink";
    case 8:
      return "brown";
    case 9:
      return "grey";
    case 10:
      return "black";
    default:
      return "white";
  }
}


shapeCountInput.addEventListener("change", (event) => {
  const userInput = parseInt(event.target.value);
  if (userInput >= 1 && userInput <= 10) {
    const numberOfShapes = getRandomInt(10, 600);
    const shapeType = shapeTypeSelect.value;
    createShapes(shapeType, numberOfShapes);
  }
});

shapeTypeSelect.addEventListener("change", () => {
  const userInput = parseInt(shapeCountInput.value);
  if (userInput >= 1 && userInput <= 10) {
    const numberOfShapes = getRandomInt(10, 600);
    const shapeType = shapeTypeSelect.value;
    createShapes(shapeType, numberOfShapes);
  }
});

colorWordInput.addEventListener("input", (event) => {
  drawShapes();
});
