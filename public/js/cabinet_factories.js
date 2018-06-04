myApp.factory('ShelvesFactory', function($http){
		var temp_data ;
		var factory = {};
		var bricks = [{top: 510, left: 10} ,{top: 510, left: 90} ,{top: 510, left: 170} ,{top: 510, left: 250} ,{top: 510, left: 330} ,{top: 510, left: 410} ,{top: 510, left: 490} ,{top: 510, left: 570} ,{top: 430, left: 10} ,{top: 430, left: 90} ,{top: 430, left: 170} ,{top: 430, left: 250} ,{top: 430, left: 330} ,{top: 430, left: 410} ,{top: 430, left: 490} ,{top: 430, left: 570} ,{top: 350, left: 10} ,{top: 350, left: 90} ,{top: 350, left: 170} ,{top: 350, left: 250} ,{top: 350, left: 330} ,{top: 350, left: 410} ,{top: 350, left: 490} ,{top: 350, left: 570} ,{top: 270, left: 10} ,{top: 270, left: 90} ,{top: 270, left: 170} ,{top: 270, left: 250} ,{top: 270, left: 330} ,{top: 270, left: 410} ,{top: 270, left: 490} ,{top: 270, left: 570} ,{top: 190, left: 10} ,{top: 190, left: 90} ,{top: 190, left: 170} ,{top: 190, left: 250} ,{top: 190, left: 330} ,{top: 190, left: 410} ,{top: 190, left: 490} ,{top: 190, left: 570} ,{top: 110, left: 10} ,{top: 110, left: 90} ,{top: 110, left: 170} ,{top: 110, left: 250} ,{top: 110, left: 330} ,{top: 110, left: 410} ,{top: 110, left: 490} ,{top: 110, left: 570} ,{top: 30, left: 10} ,{top: 30, left: 90} ,{top: 30, left: 170} ,{top: 30, left: 250} ,{top: 30, left: 330} ,{top: 30, left: 410} ,{top: 30, left: 490} ,{top: 30, left: 570}];
		var square =  [{
				shelf_source: "/pics/square.png",
				shelf_type: "square",
				shelf_x:603,
				shelf_y:160,
				id: 'base',
				counter: 1
			}];
		var big_square =  [{
			shelf_source: "/pics/big_square.png",
			shelf_type: "big_square",
			shelf_x:603,
			shelf_y:270,
			id: 'base',
			counter: 1
		}];	
		var rectangle =  [{
			shelf_source: "/pics/rectangle.png",
			shelf_type: "rectangle",
			shelf_x:603,
			shelf_y:470,
			id: 'base',
			counter: 1
		}];		
		var triangle_rectangle =  [{
			shelf_source: "/pics/triangle_rectangle.png",
			shelf_type: "triangle_rectangle",
			shelf_x:603,
			shelf_y:580,
			id: 'base',
			counter: 1
		}];
	factory.getShelves = function(){
		return {square: square, big_square: big_square, rectangle: rectangle, triangle_rectangle: triangle_rectangle, bricks: bricks};
	}
	factory.getBuiltShelves = function(callback){
		$http.get('/show_locations').success(function(output){
	      	callback(output);
	   	});
	}
	factory.getCurrentCabinet = function(info){
		$http.post('/show_cabinets', {location_id:info.location_id}).success(function(output){
				temp_data = output;
				factory.getCabinetByID();
			});
	}
	factory.getCabinetByID = function(){
		return {output: temp_data};
	}
	factory.addNewShelf = function(info){
		if (info.shelf.shelf_type == "square") {
			for (var i = square.length - 1; i >= 0; i--) {
				if (square[i].id == info.shelf.id) {
					break;
				}
				else if (i==0){
					square[square.length-1].id = info.shelf.id;
					square[square.length-1].shelf_type = info.shelf.shelf_type;
					square[square.length-1].shelf_x = info.shelf.shelf_x;
					square[square.length-1].shelf_y = info.shelf.shelf_y;
					square.push({
						shelf_source: "/pics/square.png",
						shelf_type: "square",
						shelf_x:603,
						shelf_y:160,
						id: '',
						counter: square.length + 1
					});
					break;
				}
			};
		}
		else if (info.shelf.shelf_type == "big_square"){
			for (var i = big_square.length - 1; i >= 0; i--) {
				if (big_square[i].id == info.shelf.id) {
					break;
				}
				else if (i==0){
					big_square[big_square.length-1].id = info.shelf.id;
					big_square[big_square.length-1].shelf_type = info.shelf.shelf_type;
					big_square[big_square.length-1].shelf_x = info.shelf.shelf_x;
					big_square[big_square.length-1].shelf_y = info.shelf.shelf_y;
					big_square.push({
						shelf_source: "/pics/big_square.png",
						shelf_type: "big_square",
						shelf_x:603,
						shelf_y:270,
						id: '',
						counter: big_square.length + 1
					});
					break;
				}
			};
		}
		else if (info.shelf.shelf_type == 'rectangle' ){
			for (var i = rectangle.length - 1; i >= 0; i--) {
				if (rectangle[i].id == info.shelf.id) {
					break;
				}
				else if (i==0){
					rectangle[rectangle.length-1].id = info.shelf.id;
					rectangle[rectangle.length-1].shelf_type = info.shelf.shelf_type;
					rectangle[rectangle.length-1].shelf_x = info.shelf.shelf_x;
					rectangle[rectangle.length-1].shelf_y = info.shelf.shelf_y;
					rectangle.push({
						shelf_source: "/pics/rectangle.png",
						shelf_type: "rectangle",
						shelf_x:603,
						shelf_y:470,
						id: '',
						counter: rectangle.length + 1
					});
					break;
				}
			};
		}
		else if (info.shelf.shelf_type == 'triangle_rectangle'){
			for (var i = triangle_rectangle.length - 1; i >= 0; i--) {
				if (triangle_rectangle[i].id == info.shelf.id) {
					break;
				}
				else if (i==0){
					triangle_rectangle[triangle_rectangle.length-1].id = info.shelf.id;
					triangle_rectangle[triangle_rectangle.length-1].shelf_type = info.shelf.shelf_type;
					triangle_rectangle[triangle_rectangle.length-1].shelf_x = info.shelf.shelf_x;
					triangle_rectangle[triangle_rectangle.length-1].shelf_y = info.shelf.shelf_y;
					triangle_rectangle.push({
						shelf_source: "/pics/triangle_rectangle.png",
						shelf_type: "triangle_rectangle",
						shelf_x:603,
						shelf_y:580,
						id: '',
						counter: triangle_rectangle.length + 1
					});
					break;
				}
			};
		}
	}
	factory.removeThisShelf = function(info){
		var del = confirm ("Delete this shelf?")
		if (del){
			if (info.data.shelf_type == 'square'){
				for (var i = 0; i < square.length; i++) {
					if (info.data.id == square[i].id) {
						square[square.length-1].counter = square[i].counter;
						var node = document.getElementById(info.data.id);
							if (node.parentNode) {
 								node.parentNode.removeChild(node);
							}
						square.splice(i,1);
					};
				};
			}
			if (info.data.shelf_type == 'big_square'){
				for (var i = 0; i < big_square.length; i++) {
					if (info.data.id == big_square[i].id) {
						big_square[big_square.length-1].counter = big_square[i].counter;
						var node = document.getElementById(info.data.id);
							if (node.parentNode) {
 								node.parentNode.removeChild(node);
							}
						big_square.splice(i,1);
					};
				};
			}
			if (info.data.shelf_type == 'rectangle'){
				for (var i = 0; i < rectangle.length; i++) {
					if (info.data.id == rectangle[i].id) {
						rectangle[rectangle.length-1].counter = rectangle[i].counter;
						var node = document.getElementById(info.data.id);
							if (node.parentNode) {
 								node.parentNode.removeChild(node);
							}
						rectangle.splice(i,1);
					};
				};
			}
			if (info.data.shelf_type == 'triangle_rectangle'){
				for (var i = 0; i < triangle_rectangle.length; i++) {
					if (info.data.id == triangle_rectangle[i].id) {
						triangle_rectangle[triangle_rectangle.length-1].counter = triangle_rectangle[i].counter;
						var node = document.getElementById(info.data.id);
							if (node.parentNode) {
 								node.parentNode.removeChild(node);
							}
						triangle_rectangle.splice(i,1);
					};
				};
			}
		}
	}
	factory.saveCurrentShelves = function(info){
		var data = [square, big_square, rectangle, triangle_rectangle]
		$http.post('/create_cabinets', {data: data, location: info}).success(function(){
			alert("Your cabinet configuration was saved!")
		square =  [{
			shelf_source: "/pics/square.png",
			shelf_type: "square",
			shelf_x:603,
			shelf_y:160,
			id: 'base',
			counter: 1
		}];
		big_square =  [{
			shelf_source: "/pics/big_square.png",
			shelf_type: "big_square",
			shelf_x:603,
			shelf_y:270,
			id: 'base',
			counter: 1
		}];	
		rectangle =  [{
			shelf_source: "/pics/rectangle.png",
			shelf_type: "rectangle",
			shelf_x:603,
			shelf_y:470,
			id: 'base',
			counter: 1
		}];		
		triangle_rectangle =  [{
			shelf_source: "/pics/triangle_rectangle.png",
			shelf_type: "triangle_rectangle",
			shelf_x:603,
			shelf_y:580,
			id: 'base',
			counter: 1
		}];
		});
	}
	return factory;
});