class SliderWithLabel {
    constructor(label, min, max, val, step, xPos, yPos) {
      this.labelText = label;
      this.min = min;
      this.max = max;
      this.step = step;
      this.slider = createSlider(min, max, val, step).position(xPos, yPos);
      this.label = createDiv(`${label}: ${val}`).position(xPos, yPos - 20);
    }
  
    updateLabel() { this.label.html(`${this.labelText}: ${this.slider.value()}`); }
    value() { return this.slider.value(); }
  
    setRandomValue() {
      let randomValue = random(this.min, this.max);
      if (this.step >= 1) randomValue = floor(randomValue / this.step) * this.step;
      else if (this.step > 0) randomValue = round(randomValue / this.step) * this.step;
      this.slider.value(constrain(randomValue, this.min, this.max));
    }
  }