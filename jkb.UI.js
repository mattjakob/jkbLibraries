class SliderWithLabel {
  constructor(label, min, max, val, step) {
    this.labelText = label;
    this.min = min;
    this.max = max;
    this.step = step;
    
    // Find existing UIContainer div
    this.container = select('.UIContainer');
    
    // Create label and slider inside the container
    this.labelDiv = createDiv(`${this.labelText}: ${val}`).class('UILabel').parent(this.container);
    this.slider = createSlider(min, max, val, step).class('UISlider').parent(this.container);
 
  }

  updateLabel() 
  { 
    this.labelDiv.html(`${this.labelText}: ${this.slider.value()}`); 
  }

  value() 
  { 
    return this.slider.value(); 
  }

  setRandomValue() 
  {
    let randomValue = random(this.min, this.max);
    if (this.step >= 1) randomValue = floor(randomValue / this.step) * this.step;
    else if (this.step > 0) randomValue = round(randomValue / this.step) * this.step;
    this.slider.value(constrain(randomValue, this.min, this.max));
  }
}
