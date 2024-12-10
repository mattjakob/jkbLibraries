class NoisePerlin {
    constructor(xPos = 0) {
        this.array = [];
        this.noiseSeedSliderUI = new SliderWithLabel("Noise Seed", 1, 100, 20, 1);
        this.noiseScaleSliderUI = new SliderWithLabel("Noise Scale", 0.0001, 0.02, 0.004, 0.0001);
        this.noiseOffsetXUI = new SliderWithLabel("Noise Offset X", 0, 2000, 0, 1);
        this.noiseOffsetYUI = new SliderWithLabel("Noise Offset Y", 0, 2000, 0, 1);
        this.contrastSliderUI = new SliderWithLabel("Contrast", 0, 300, 30, 1);
        this.noiseOctavesUI = new SliderWithLabel("Noise Octaves", 0, 15, 6, 1);
        this.noiseFalloffUI = new SliderWithLabel("Noise Falloff", 0, 1, 0.25, 0.01);
    }

    update() {
        this.noiseSeedSliderUI.updateLabel();
        this.noiseScaleSliderUI.updateLabel();
        this.noiseOffsetXUI.updateLabel();
        this.noiseOffsetYUI.updateLabel();
        this.contrastSliderUI.updateLabel();
        this.noiseOctavesUI.updateLabel();
        this.noiseFalloffUI.updateLabel();

        // Set the noise seed
        noiseSeed(this.noiseSeedSliderUI.value());

        noiseDetail(this.noiseOctavesUI.value(), this.noiseFalloffUI.value());

        let scale = this.noiseScaleSliderUI.value();
        let offX = this.noiseOffsetXUI.value() + width * 1.283;
        let offY = this.noiseOffsetYUI.value() + height * 3.247;
        let contrast = this.contrastSliderUI.value();

        this.array = [];
        
        
        for (let i = 0; i < width * height; i++) {
            let x = i % width;
            let y = floor(i / width);
            x = scale * (x - width /2) + 0.01*offX;
            y = scale * (y - height/2) + 0.01*offY;

            // Generate noise value
            let n = noise(x, y);
            
            // Apply contrast using sigmoid function
            n = 1 / (1 + exp(-contrast * (n - 0.5)));

            // Constrain the value to the range [0, 1]
            n = constrain(n, 0, 1);

            this.array.push(n);
        }  
    }

    draw() {
        loadPixels();
        let d = pixelDensity();
        let wd = width * d;
        let hd = height * d;

        for (let y = 0; y < hd; y++) {
            for (let x = 0; x < wd; x++) {
                let index = 4 * (x + y * wd);
                let origX = Math.floor(x / d);
                let origY = Math.floor(y / d);
                let arrayIndex = origX + origY * width;

                let c = this.array[arrayIndex] * 255;
                pixels[index] = c;     // Red
                pixels[index + 1] = c; // Green
                pixels[index + 2] = c; // Blue
                pixels[index + 3] = 255; // Alpha
            }
        }
        updatePixels();
    }
}
