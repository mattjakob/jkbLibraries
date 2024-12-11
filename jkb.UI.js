import p5 from 'p5';

p5.prototype.createSliderWithLabel = function (min, max, value, step, labelText) {
  // Create or select the UI container
  let container = select('.UIContainer');
  if (!container) {
    container = this.createDiv().class('UIContainer');
  }

  // Create a slider
  const slider = this.createSlider(min, max, value, step).class('UISlider');

  // Create a label
  const label = this.createDiv(`${labelText}: ${slider.value()}`).class('UILabel');

  // Append the slider and label to the container
  container.child(label);
  container.child(slider);

  // Update the label when slider value changes
  slider.input(() => {
    label.html(`${labelText}: ${slider.value()}`);
  });

  // Add a method to set a random value to the slider
  container.setRandomValue = () => {
    let randomValue = this.random(min, max);
    if (step >= 1) randomValue = this.floor(randomValue / step) * step;
    else if (step > 0) randomValue = this.round(randomValue / step) * step;

    slider.value(this.constrain(randomValue, min, max));
    label.html(`${labelText}: ${slider.value()}`);
  };

  // Return the container to allow external access to the slider and label
  return container;
};
