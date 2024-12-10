function drawCellValue(x, y, w, h, value) {
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text(value, x+w/2, y+h/2);
  }

  function drawHatchPattern(x, y, w, h, density) {

    if (density <= 0 || isNaN(density)) {
      // Do not draw
      return;
    }
    let spacing = (w + h) / density;
    if (!isFinite(spacing) || spacing <= 0) {
      // Do not draw
      return;
    }

    strokeWeight(1);
    for (let i = 0; i <= density; i++) {
      let x1 = x + i * spacing, y1 = y, x2 = x, y2 = y + i * spacing;
      if (x1 > x + w) { x1 = x + w; y1 = y + (i - (w / spacing)) * spacing; }
      if (y2 > y + h) { y2 = y + h; x2 = x + (i - (h / spacing)) * spacing; }
      line(x1, y1, x2, y2);
    }
  }