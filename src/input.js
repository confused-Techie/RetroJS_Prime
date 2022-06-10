// rewrite as normal JS, since I'm entering context hell using a class.

var keys = {
  right_arrow: false, left_arrow: false, up_arrow: false, down_arrow: false,

  a: false, b: false, c: false, d: false, e: false, f: false, g: false, h: false, i: false, j: false, k: false,
  l: false, m: false, n: false, o: false, p: false, q: false, r: false, s: false, t: false, u: false, v: false,
  w: false, x: false, y: false, z: false,

  comma: false, period: false, semicolon: false, quote: false, bracket_right: false, bracket_left: false,
  backquote: false, backslash: false, minus: false, equal: false, intl_ro: false, intl_yen: false
};

// This quickly defines multiple needed parts
// tracker: is the same as left_arrow, used for modifying the keys object. keys[tracker]
// keyCode: the keycode to match for this key
// dispatchDown: input_${id}_down
// dispatchUp: input_${id}_up
var keysObj = [
  { id: "left_arrow", keyCode: 37 },
  { id: "up_arrow", keyCode: 38 },
  { id: "right_arrow", keyCode: 39 },
  { id: "down_arrow", keyCode: 40 },

  { id: "a", keyCode: 65 },
  { id: "b", keyCode: 66 },
  { id: "c", keyCode: 67 },
  { id: "d", keyCode: 68 },
  { id: "e", keyCode: 69 }, // nice
  { id: "f", keyCode: 70 },
  { id: "g", keyCode: 71 },
  { id: "h", keyCode: 72 },
  { id: "i", keyCode: 73 },
  { id: "j", keyCode: 74 },
  { id: "k", keyCode: 75 },
  { id: "l", keyCode: 76 },
  { id: "m", keyCode: 77 },
  { id: "n", keyCode: 78 },
  { id: "o", keyCode: 79 },
  { id: "p", keyCode: 80 },
  { id: "q", keyCode: 81 },
  { id: "r", keyCode: 82 },
  { id: "s", keyCode: 83 },
  { id: "t", keyCode: 84 },
  { id: "u", keyCode: 85 },
  { id: "v", keyCode: 86 },
  { id: "w", keyCode: 87 },
  { id: "x", keyCode: 88 },
  { id: "y", keyCode: 89 },
  { id: "z", keyCode: 90 },

  { id: "comma", keyCode: 188 },
  { id: "period", keyCode: 190 },
  { id: "bracket_left", keyCode: 219 },
  { id: "minus", keyCode: 189 },


  { id: "semicolon", code: "Semicolon" },
  { id: "quote", code: "Quote"},
  { id: "bracket_left", code: "BracketLeft" },
  { id: "bracket_right", code: "BracketRight" },
  { id: "backquote", code: "Backquote" },
  { id: "backslash", code: "Backslash" },
  { id: "equal", code: "Equal" },
  { id: "intl_ro", code: "IntlRo" },
  { id: "intl_yen", code: "IntlYen" },

  { id: "alt_left", keyCode: 18 },
  { id: "alt_right", keyCode: 18 },
  { id: "caps_lock", keyCode: 20 },
  { id: "control_left", code: "ControlLeft" },
  { id: "control_right", code: "ControlRight" },
  { id: "os_left", code: "OSLeft" },
  { id: "os_right", code: "OSRight" },
  { id: "shift_left", code: "ShiftLeft" },
  { id: "shift_right", code: "ShiftRight" },
  { id: "context_menu", code: "ContextMenu" },
  { id: "enter", keyCode: 13 },
  { id: "space", keyCode: 32 },
  { id: "tab", code: "Tab" },
  { id: "delete", code: "Delete" },
  { id: "end", keyCode: 35 },
  { id: "help", code: "Help" },
  { id: "home", keyCode: 36 },
  { id: "insert", keyCode: 45 },
  { id: "page_down", keyCode: 34 },
  { id: "page_up", keyCode: 33 },
  { id: "escape", keyCode: 27 },
  { id: "print_screen", code: "PrintScreen" },
  { id: "scroll_lock", code: "ScrollLock" },
  { id: "pause", code: "Pause" },
  { id: "f1", keyCode: 112 },
];

function keyDown(event) {
  for (var i = 0; i < keysObj.length; i++) {
    if (keysObj[i].keyCode == event.keyCode || keysObj[i].code == event.code) {
      keys[keysObj[i].id] = true;
      dispatch(`input_${keysObj[i].id}_down`);
    }
  }
}

function keyUp(event) {
  for (var i = 0; i < keysObj.length; i++) {
    if (keysObj[i].keyCode == event.keyCode || keysObj[i].code == event.code) {
      keys[keysObj[i].id] = false;
      dispatch(`input_${keysObj[i].id}_up`);
    }
  }
}

function dispatch(name) {
  document.dispatchEvent(new Event(name));
}

function getEventName(key) {
  for (var i = 0; i < keysObj.length; i++) {
    if (keysObj[i].id == key) {
      return { down: `input_${key}_down`, up: `input_${key}_up` };
    }
  }
  throw new Error(`Unrecognized Key Event Name passed for Binding: ${key}`);
}

export { keys, keyDown, keyUp, getEventName };
