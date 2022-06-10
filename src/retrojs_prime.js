import * as display from "./display.js";
import Sprite from "./sprite.js";
import FlexiSprite from "./flexisprite.js";
import * as Input from "./input.js";


var GameState = {
  paused: false,
  redraw_onresize: true,
};

function init(canvasID, width, height) {
  display.setup(canvasID, width, height);

  window.onresize = function() {
    display.SizeCanvas();
    if (GameState.redraw_onresize) {
      draw();
    }
  };

  document.addEventListener("keydown", Input.keyDown, false);
  document.addEventListener("keyup", Input.keyUp, false);
}

function draw() {
  if (!GameState.paused) {
    display.ClearCanvas();

    display.render();
  }
}


function addStep(func) {
  window.requestAnimationFrame(func);
}

// export RetroJS_Prime functions
export {
  init,
  draw,
  addStep,
};

// export other functions
export {
  display,
};

// export classes
export {
  Sprite,
  FlexiSprite,
  Input,
};
