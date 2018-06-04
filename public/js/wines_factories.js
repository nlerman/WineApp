myApp.factory('WineFactory', function($http){
	var factory = {};
	var current_shelf;
	var assigned_wines = [];
	var shelves_to_remove = [];
	factory.getTypesAndCategories = function(callback){
		$http.get('/show_TypesAndCategories').success(function(output)
		{
	      	callback(output);
	   	});
	}
	factory.saveCurrentWine = function(data){
		$http.post('/add_wine', data).success(function(output){
			alert("Wine successfully added to inventory")
		});
	}
	factory.getUnassignedWines = function(callback){
		$http.get('/show_UnassignedWines').success(function(output)
		{
	      	callback(output);
	   	});
	}
	factory.getAssignedWines = function(){
			return assigned_wines
	}
	factory.thisClickedShelf = function(data){
		current_shelf = data;
		$http.post('/show_wines_on_shelf', {data: data}).success(function(output){
			assigned_wines = output;
			factory.getAssignedWines()
		});
	}
	factory.placeWineOnShelf = function(data){
		var wine_shelf = {
			wine_id: data.wine_id,
			shelf_id: current_shelf
		}
		$http.post('/add_wine_to_shelf', {data: wine_shelf}).success(function(output){

		});
	}
	factory.removeWinefromShelf = function (data){
		var wine_shelf = {
			wine_id: data.wine_id,
		}
		$http.post('/remove_wine_from_shelf', {data: wine_shelf}).success(function(output){

		});

	}
	factory.getAll = function(callback){
		$http.get('/show_all').success(function(output)
		{
	      	callback(output);
	   	});
	}
	factory.removeThisWine = function(data){
		$http.post('/remove_wine', {data: data}).success(function(output){
			factory.getUnassignedWines()
			alert("Wine has been removed! Enjoy it!")
		});
	}
	factory.thisClickedWineToRemove = function(data){
		$http.post('/remove_wine_on_shelf', {data: data}).success(function(output){
			shelves_to_remove = output
			factory.displayShelvesToRemoveWine
		});
	}
	factory.displayShelvesToRemoveWine = function(callback){
		callback(shelves_to_remove);
	}
	return factory;
});