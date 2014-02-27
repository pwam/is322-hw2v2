$(function(){
        var zoom = new ZoomView('#zoom','#zoom :first');
	var zoom2 = new ZoomView('#zoom2','#zoom2 :first');
	var zoom3 = new ZoomView('#zoom3','#zoom3 :first');
});

var zIndexBackup = 10;
	
function DragView(target) {
	this.target = target[0];
      	this.drag = [];
      	this.lastDrag = {};
      
      	this.WatchDrag = function() {
       		if(!this.drag.length) {
         		return;
        	}

        	for(var d = 0; d<this.drag.length; d++) {
         		var left = $(this.drag[d].el).offset().left;
         		var top = $(this.drag[d].el).offset().top;
          		
			var x_offset = -(this.lastDrag.pos.x - this.drag[d].pos.x);
          		var y_offset = -(this.lastDrag.pos.y - this.drag[d].pos.y);

        		left = left + x_offset;
        		top = top + y_offset;

        		this.lastDrag = this.drag[d];

          		this.drag[d].el.style.left = left +'px';
          		this.drag[d].el.style.top = top +'px';
        	}
      	}

      	this.OnDragStart = function(event) {
        	var touches = event.originalEvent.touches || [event.originalEvent];
        	for(var t=0; t<touches.length; t++) {
          		var el = touches[t].target.parentNode;
		  
		  	if(el.className.search('polaroid') > -1){
				el = touches[t].target.parentNode.parentNode;
		  	}
			el.style.zIndex = zIndexBackup + 1;
			zIndexBackup = zIndexBackup +1;
			
          		if(el && el == this.target) {
				$(el).children().toggleClass('upSky');
            			this.lastDrag = {
              				el: el,
              				pos: event.touches[t]
            			};
            			return; 
          		}
		  
		}
	}
      	
	this.OnDrag = function(event) {
        	this.drag = [];
        	var touches = event.originalEvent.touches || [event.originalEvent];
        	for(var t=0; t<touches.length; t++) {
         	var el = touches[t].target.parentNode;

		if(el.className.search('polaroid') > -1){
			el = touches[t].target.parentNode.parentNode;
		}
		  
          	if(el && el == this.target) {
            		this.drag.push({
              			el: el,
              			pos: event.touches[t]
            		});
        	}
	}
}

      	this.OnDragEnd = function(event) {
		this.drag = [];
        	var touches = event.originalEvent.touches || [event.originalEvent];
		 	for(var t=0; t<touches.length; t++) {
          			var el = touches[t].target.parentNode;
		  
		  			if(el.className.search('polaroid') > -1){
				 			el = touches[t].target.parentNode.parentNode;
		  			}
					$(el).children().toggleClass('upSky');
			
		  	}
      	}
}
