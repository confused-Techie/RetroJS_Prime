class FlexiSprite {
  constructor(buildObj) {
    this.origin = {
      x: 0,
      y: 0,
    };
    this.shape = [];
    this.method = "";
    this.fillStyle = undefined;
    this.strokeStyle = undefined;
    this.id = undefined;
    this.zindex = 5;
    this.path = undefined;

    this.velocity = {
      x: 0,
      y: 0,
      mod: 0
    };

    this.manualBindings = [];
    this.bindings = [];
    // Assigning global binding function references since the context of this changes, and causes the function signature
    // to be different when creating and deleting an event listener, causing the event to never be deleted.
    this.bindRight = this.moveRight.bind(this);
    this.bindLeft = this.moveLeft.bind(this);
    this.bindUp = this.moveUp.bind(this);
    this.bindDown = this.moveDown.bind(this);

    this.lastExport = {
      x: 0,
      y: 0
    };

    // If we were passed a proper build object, instiate those variables.
    if (buildObj) {
      if (buildObj.origin) {
        this.origin.x = buildObj.origin.x ? buildObj.origin.x : this.origin.x;
        this.origin.y = buildObj.origin.y ? buildObj.origin.y : this.origin.y;
      }
      if (buildObj.velocity) {
        this.velocity.x = buildObj.velocity.x ? buildObj.velocity.x : this.velocity.x;
        this.velocity.y = buildObj.velocity.y ? buildObj.velocity.y : this.velocity.y;
        this.velocity.mod = buildObj.velocity.mod ? buildObj.velocity.mod : this.velocity.mod;
      }
      this.shape = buildObj.shape ? buildObj.shape : this.shape;
      this.method = buildObj.method ? buildObj.method : this.method;
      this.fillStyle = buildObj.fillStyle ? buildObj.fillStyle : this.fillStyle;
      this.strokeStyle = buildObj.strokeStyle ? buildObj.strokeStyle : this.strokeStyle;
      this.id = buildObj.id ? buildObj.id : this.id;
      this.zindex = buildObj.zindex ? buildObj.zindex : this.zindex;
    }
  }
  get changed() {
    if (this.lastExport.x != this.origin.x || this.lastExport.y != this.origin.y) {
      return true;
    } else {
      return false;
    }
  }
  moveRight() {
    this.origin.x += ( this.velocity.x + this.velocity.mod );
  }
  moveLeft() {
    this.origin.x -= ( this.velocity.x + this.velocity.mod );
  }
  moveUp() {
    this.origin.y -= ( this.velocity.y + this.velocity.mod );
  }
  moveDown() {
    this.origin.y += ( this.velocity.y + this.velocity.mod );
  }
  bind(input, func, key) {
    var eventName = input.getEventName(key);
    if (func == "move_right") {
      document.addEventListener(eventName.down, this.bindRight, false);
      this.bindings.push(eventName.down);
    } else if (func == "move_left") {
      document.addEventListener(eventName.down, this.bindLeft, false);
      this.bindings.push(eventName.down);
    } else if (func == "move_down") {
      document.addEventListener(eventName.down, this.bindDown, false);
      this.bindings.push(eventName.down);
    } else if (func == "move_up") {
      document.addEventListener(eventName.down, this.bindUp, false);
      this.bindings.push(eventName.up);
    } else {
      console.error(`Unrecognized func passed for binding: ${func}`);
    }
  }
  unbind(input, func, key) {
    var eventName = input.getEventName(key);
    var idx = this.bindings.indexOf(eventName.down);
    if (idx != -1) {
      this.bindings.splice(idx, 1);
      if (func == "move_right") {
        document.removeEventListener(eventName.down, this.bindRight, false);
      } else if (func == "move_left") {
        document.removeEventListener(eventName.down, this.bindLeft, false);
      } else if (func == "move_down") {
        document.removeEventListener(eventName.down, this.bindDown, false);
      } else if (func == "move_up") {
        document.removeEventListener(eventName.down, this.bindUp, false);
      } else {
        console.error(`Unrecognized func passed for unbinding: ${func}`);
      }
    } else {
      console.error(`Key ${key} Never Bound to ${this.id}`);
    }
  }
  manualBind(func, key) {
    this.manualBindings.push({ func: func, key: key });
  }
  manualUnbind(func, key) {
    var idx = -1;
    for (var i = 0; i < this.manualBindings.length; i++) {
      if (this.manualBindings[i].func == func && this.manualBindings[i].key == key) {
        idx = i;
      }
    }
    this.manualBindings.splice(idx, 1);
  }
  manualBindRun(input) {
    var change = false;
    for (var i = 0; i < this.manualBindings.length; i++) {
      if (input.keys[this.manualBindings[i].key]) {
        // menas the specified key is true.
        if (this.manualBindings[i].func == "move_right") {
          this.moveRight();
          change = true;
        } else if (this.manualBindings[i].func == "move_left") {
          this.moveLeft();
          change = true;
        } else if (this.manualBindings[i].func == "move_up") {
          this.moveUp();
          change = true;
        } else if (this.manualBindings[i].func == "move_down") {
          this.moveDown();
          change = true;
        }
      }
    }
    return change;
  }
  export() {
    this.lastExport.x = this.origin.x;
    this.lastExport.y = this.origin.y;

    return {
      shape: this.path,
      method: this.method,
      fillStyle: this.fillStyle,
      strokeStyle: this.strokeStyle,
      id: this.id,
      zindex: this.zindex
    };
  }
  calc() {
    let path = new Path2D();

    for (var i = 0; i < this.shape.length; i++) {
      if (this.shape[i].type == "rect") {
        path.rect(this.checkVar(this.shape[i].x),
                  this.checkVar(this.shape[i].y),
                  this.checkVar(this.shape[i].width),
                  this.checkVar(this.shape[i].height));
      } // all other valid FlexiSprite shapes go here.
    }

    this.path = path;
  }
  checkVar(value) {
    if (typeof value === "string") {
      if (value.startsWith("@")) {
        if (value == "@x") {
          return this.origin.x;
        } else if (value == "@y") {
          return this.origin.y;
        } // any other variables go here.
      } else {
        return value;
      }
    } else {
      return value;
    }
  }
}

export default FlexiSprite;
