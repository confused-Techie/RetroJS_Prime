class Sprite {
  constructor(buildObj) {
    this.shape = undefined;
    this.method = "";
    this.fillStyle = undefined;
    this.strokeStyle = undefined;
    this.id = undefined;
    this.zindex = 5;

    // instiate any variables passed via the Build Object, or leave them at the default.
    if (buildObj) {
      this.shape = buildObj.shape ? buildObj.shape : this.shape;
      this.method = buildObj.method ? buildObj.method : this.method;
      this.fillStyle = buildObj.fillStyle ? buildObj.fillStyle : this.fillStyle;
      this.strokeStyle = buildObj.strokeStyle ? buildObj.strokeStyle : this.strokeStyle;
      this.id = buildObj.id ? buildObj.id : this.id;
      this.zindex = buildObj.zindex ? buildObj.zindex : this.zindex;
    }
  }
  export() {
    return { shape: this.shape,
      method: this.method,
      fillStyle: this.fillStyle,
      strokeStyle: this.strokeStyle,
      id: this.id,
      zindex: this.zindex };
  }
}

export default Sprite;
