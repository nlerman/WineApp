var mouse_position= {
		x: 0, 
		y: 0,
	}
myApp.directive('draggable', function() {
    return function(scope, element) {
        var el = element[0];
        el.draggable = true;
        el.addEventListener(
            'dragstart',
            function(e) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('Text', this.id);
                this.classList.add('drag');
                return false;
            },
            false
        );
        el.addEventListener(
            'dragend',
            function(e) {
                this.classList.remove('drag');
                return false;
            },
            false
        );
    }    
});
myApp.directive('droppable', function() {
    return {
        scope: {
            drop: '&', // parent
            bin: '=' // bi-directional scope
        },
        link: function(scope, element) {
        	var el = element[0];
        	el.addEventListener(
			    'dragover',
			    function(e) {
			        e.dataTransfer.dropEffect = 'move';
			        if (e.preventDefault) e.preventDefault();
			        this.classList.add('over');
			        return false;
			    },
			    false
			);
			el.addEventListener(
			    'dragenter',
			    function(e) {
			        this.classList.add('over');			        
			        return false;
			    },
			    false
			);
			el.addEventListener(
			    'dragleave',
			    function(e) {
			        this.classList.remove('over');
			        return false;
			    },
			    false
			);
            el.addEventListener(
                'drop',
                function(e) {
	               	var binId = this.id;
					var item = document.getElementById(e.dataTransfer.getData('Text'));
			        this.appendChild(item);
			        if (item.src) {
				        item.style.top = mouse_position.y;
				        item.style.left = mouse_position.x;
				        var shelf = item.src.split('/')[item.src.split('/').length-1].split('.', 1)[0];
					    scope.shelves = {
					    	shelf:{
					    		id: e.dataTransfer.getData('Text'),
						    	shelf_type: shelf,
						    	shelf_source: item.src,
						    	shelf_x: mouse_position.x,
						    	shelf_y: mouse_position.y
					    	}
					    }
					}
					else {
						scope.add_wine = {
							wine_id: e.dataTransfer.getData('Text')
						}
					}
					scope.$apply(function(scope) {
					    var fn = scope.drop();
					    if ('undefined' !== typeof fn) {
					      	fn(item.id, binId);
					    }
					});
					
                },
                false
            );
        }
    }
}); 
