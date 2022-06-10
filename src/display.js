var settings = {
  canvas: undefined,
  ctx: undefined,
  canvasWidth: undefined,
  canvasHeight: undefined,
};

var shapeArray = [];

function setup(canvasID, width, height) {
  settings.canvasWidth = convertCanvasValue(width);
  settings.canvasHeight = convertCanvasValue(height);
  settings.canvas = document.getElementById(canvasID);
  settings.ctx = settings.canvas.getContext("2d");

  SizeCanvas();
}

function SizeCanvas() {
  settings.canvas.width = settings.canvasWidth(window.innerWidth);
  settings.canvas.height = settings.canvasHeight(window.innerHeight);
}

function ClearCanvas() {
  settings.ctx.clearRect(0, 0, getWidth(), getHeight());
}

function getWidth() {
  return settings.canvas.width;
}

function getHeight() {
  return settings.canvas.height;
}

function setWidth(value) {
  settings.canvasWidth = convertCanvasValue(value);
  SizeCanvas();
}

function setHeight(value) {
  settings.canvasHeight = convertCanvasValue(value);
  SizeCanvas();
}

function convertCanvasValue(value) {
  var func;
  if (typeof value === "string") {
    if (value.endsWith("%")) {
      var tmpNum = parseInt(value.replace("%", ""));
      tmpNum = tmpNum/100;
      func = function(w) {
        return tmpNum * w;
      };

    } else {
      throw new Error(`Unable to Parse Canvas Value: ${value}`);
    }
  } else if (typeof value === "number") {
    // gave us a normal number.
    func = function(w) {
      return value;
    };
  } else {
    throw new Error(`Unrecognized Canvas Value: ${value}`);
  }

  return func;
}

function addRender(shape) {
  if (Array.isArray(shape)) {
    for (var i = 0; i < shape.length; i++) {
      if (!shape[i].zindex) {
        shape[i].zindex = 5;
      }
    }
    shapeArray = shapeArray.concat(shapeArray, shape);
  } else {
    if (!shape.zindex) {
      shape.zindex = 5;
    }
    shapeArray.push(shape);
  }
}

function updateRender(id, shape) {
  var idx = -1;
  for (var i = 0; i < shapeArray.length; i++) {
    if (shapeArray[i].id == id) {
      idx = i;
    }
  }

  if (idx != -1) {
    shapeArray.splice(idx, 1, shape);
  } else {
    throw new Error(`Unable to find Shape to Update on Render Queue ${id}`);
  }
}

function removeRender(id) {
  var idx = -1;
  for (var i = 0; i < shapeArray.length; i++) {
    if (shapeArray[i].id == id) {
      idx = i;
    }
  }

  if (idx != -1) {
    shapeArray.splice(idx, 1);
  } else {
    throw new Error(`Unable to find Shape to Update on Render Queue ${id}`);
  }
}

function render() {
  shapeArray.sort((a, b) => {
    return a.zindex - b.zindex;
  });

  for (let i = 0; i < shapeArray.length; i++) {
    if (shapeArray[i].method == "fill") {
      settings.ctx.fillStyle = shapeArray[i].fillStyle;
      settings.ctx.fill(shapeArray[i].shape);
    } else if (shapeArray[i].method == "stroke") {
      settings.ctx.strokeStyle = shapeArray[i].strokeStyle;
      settings.ctx.stroke(shapeArray[i].shape);
    }
  }
}

export {
  setup,
  render,
  SizeCanvas,
  ClearCanvas,
  getWidth,
  getHeight,
  setWidth,
  setHeight,
  addRender,
  updateRender,
  removeRender
};
