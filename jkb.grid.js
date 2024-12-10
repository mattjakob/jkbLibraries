
// Centered Rectangle
class Rectangle {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
    }
}

class QuadTree {
    constructor(boundary, capacity){
        this.boundary = boundary;
        this.capacity = capacity;
        this.divided = false;
        this.value = 0;
    }

    evaluate(array){
        let total = 0;
        let counter = 0;
        let avg = 0;

        let startX = Math.floor(this.boundary.x - this.boundary.width * 0.9);
        let endX = Math.ceil(this.boundary.x + this.boundary.width * 0.9);
        let startY = Math.floor(this.boundary.y - this.boundary.height * 0.9);
        let endY = Math.ceil(this.boundary.y + this.boundary.height * 0.9);

        this.value = 0;
        for(let x=startX; x<endX; x++){
            for(let y=startY; y<endY; y++){
                let index = (x + y * width);
                //console.log("x: " + x + " y: " + y + " index: " + index);
                this.value += array[index];
                if(this.value >= this.capacity && this.boundary.width > 3 && this.boundary.height > 3){
                    this.subdivide(array);
                    
                }
            }
        }
    }

    subdivide(array)
    {
        if(this.divided) return;

        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.width;
        let h = this.boundary.height;

        let quadNW = new Rectangle(x - w/2, y - h/2, w/2, h/2);
        let quadNE = new Rectangle(x + w/2, y - h/2, w/2, h/2);
        let quadSW = new Rectangle(x - w/2, y + h/2, w/2, h/2);
        let quadSE = new Rectangle(x + w/2, y + h/2, w/2, h/2);

        this.nw = new QuadTree(quadNW, this.capacity);
        this.ne = new QuadTree(quadNE, this.capacity);
        this.sw = new QuadTree(quadSW, this.capacity);
        this.se = new QuadTree(quadSE, this.capacity);

        this.divided = true;

        this.nw.evaluate(array);
        this.ne.evaluate(array);
        this.sw.evaluate(array);
        this.se.evaluate(array);

    }

    draw()
    {
        stroke(255);
        noFill();
        strokeWeight(1);
        rectMode(CENTER);

        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.width;
        let h = this.boundary.height;

        if(!this.divided)   // Only draw 'last' rectangle (undivided)
        {
            rect(x,y, w * 2, w * 2);

            x = x - w;
            y = y - h;

            if(w> 20 && h > 20) // Only draw if the rectangle is big enough
            {
                fill(255,0,0);
                drawCellValue(x,y,w*2,h*2,floor(this.value));
            }
        }
        
        
        if (this.divided) { // Draw all the children
            this.nw.draw();
            this.ne.draw();
            this.sw.draw();
            this.se.draw();
          }
    }
}