function aBox(x_, y_) {
	this.i = x_;
	this.j = y_;
	this.x = x_ * boxSize;
	this.y = y_ * boxSize;
	this.isTouched = false;
	// 0: rectangle
	// 1: TL -> BR
	// 2: TR -> BLs
	this.divMode = 0;
	this.left = color(255,204,0);
	this.right = color(255,204,0);
	
	this.draw = function(isHovered, canvas) {
		
		this.x = this.i * boxSize;
		this.y = this.j * boxSize;
		
		var tempDiv = this.divMode;
		var tempL = this.left;
		var tempR = this.right;
		
		if(isHovered) {
			var where = this.findMouse();
		
			switch(where) {
				case 0:
					break;
				case 1:
					tempDiv = 2;
					tempL = currentColor;
					break;
				case 2:
					tempDiv = 1;
					tempL = currentColor;
					break;
				case 3:
					tempDiv = 1;
					tempR = currentColor;
					break;
				case 4:
					tempDiv = 2;
					tempR = currentColor;
					break;
			}
		}
		
		fill(tempL);
		switch (tempDiv) {
			case 0:
				rect(this.x, this.y, boxSize, boxSize);
			break;
			
			case 1:
			triangle(this.x, this.y,
					this.x, this.y + boxSize,
					this.x + boxSize, this.y + boxSize);
			fill(tempR);
			triangle(this.x, this.y,
					this.x + boxSize, this.y,
					this.x + boxSize, this.y + boxSize);
			break;
			
			case 2:
			triangle(this.x, this.y,
					this.x + boxSize + 1, this.y,
					this.x, this.y + boxSize + 1);
			fill(tempR);
			triangle(this.x + boxSize, this.y + boxSize,
					this.x + boxSize, this.y,
					this.x, this.y + boxSize);
			break;
		}
	} // END DRAW
	
	this.drawLine = function(isHovered, canvas) {
		
		this.x = this.i * boxSize;
		this.y = this.j * boxSize;
		
		var tempDiv = this.divMode;
		
		if(isHovered) {
			var where = this.findMouse();
		
			switch(where) {
				case 0:
					break;
				case 1:
					tempDiv = 2;
					break;
				case 2:
					tempDiv = 1;
					break;
				case 3:
					tempDiv = 1;
					break;
				case 4:
					tempDiv = 2;
					break;
			}
		}
		
		//fill(tempL);
		switch (tempDiv) {
			case 0:
			break;
			
			case 1:
			line(this.x, this.y, this.x + boxSize, this.y + boxSize);
			break;
			
			case 2:
			line(this.x + boxSize, this.y, this.x, this.y + boxSize);
			break;
		}
	} // END DRAW
	
	this.findMouse = function() {
		var half = floor(boxSize / 2);
		if (mouseX > this.x && mouseX <= this.x + boxSize &&
			mouseY > this.y && mouseY <= this.y + boxSize)
		{
			relX = mouseX - this.x;
			relY = mouseY - this.y;
			if (relX < half) {
				if (relY < half) {
					return 1; // TL
				} else {
					return 2; // BL
				}
			} else {
				if (relY < half) {
					return 3; // TR
				} else {
					return 4; // BR
				}
			}
		} else {
			return 0;
		}
	} // End findMouse
	
	this.update = function() {
		this.isTouched = true;
		var where = this.findMouse();
		var what = mouseButton;
		
		if (what == RIGHT) {
			this.divMode = 0;
			this.left = currentColor;
			this.right = currentColor;
		} else {
			switch(where) {
				case 0:
					break;
				case 1:
					this.divMode = 2;
					this.left = currentColor;
					break;
				case 2:
					this.divMode = 1;
					this.left = currentColor;
					break;
				case 3:
					this.divMode = 1;
					this.right = currentColor;
					break;
				case 4:
					this.divMode = 2;
					this.right = currentColor;
					break;
			}
		}
	} // END update

	this.getColor = function() {
		var where = this.findMouse();
		
		if (this.divMode == 0) {
			return this.left;
		} else {
			switch(where) {
				case 0:
					break;
				case 1:
				case 2:
					return this.left;
					break;
				case 3:
				case 4:
					return this.right;
					break;
			}
		}
	}
} 
