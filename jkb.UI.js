import p5 from 'p5';

p5.prototype.createSliderWithLabel = function(min, max, value, step, labelText) {
  // Create a div to contain the slider and label
  const container = select('.UIContainer');

  // Create a label element
  const label = this.createDiv(`${labelText}: ${slider.value()}`).class('UILabel');

  // Create a slider using the original createSlider function
  const slider = this.createSlider(min, max, value, step).class('UISlider');

  // Add a method to set a random value to the slider
  container.setRandomValue = function() {
    let randomValue = random(min, max);
    if (step >= 1) randomValue = floor(randomValue / step) * step;
    else if (step > 0) randomValue = round(randomValue / step) * step;
    slider.value(constrain(randomValue, min, max));
    label.html(`${labelText}: ${slider.value()}`);
  };

  // Update the label whenever the slider value changes
  slider.input(() => {
    label.html(`${labelText}: ${slider.value()}`);
  });

  // Append the label and slider to the container
  container.child(label);
  container.child(slider);

  // Return the container instead of just the slider
  return container;
};