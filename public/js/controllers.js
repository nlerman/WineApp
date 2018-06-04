myApp.controller('Shelfbuilder', function($scope, ShelvesFactory) {
	$scope.shelves = ShelvesFactory.getShelves();
    $scope.handleDrop = function() {
    	var myData = $scope.$$childHead.shelves;
        console.log($scope)
 		if (myData.shelf.id != savedData) {
	     	ShelvesFactory.addNewShelf(myData);
	    	var savedData = myData.shelf.id
    	};
    }
    $scope.removeShelf = function(data){
    	if (data.x < 600) {
    		ShelvesFactory.removeThisShelf(data);
    	};
    }
    $scope.saveShelves = function(data){
        ShelvesFactory.saveCurrentShelves(data);
    }
});
myApp.controller('ShelfManager', function($scope, ShelvesFactory) {
    ShelvesFactory.getBuiltShelves(function(data){
        $scope.built_shelves = data;
    });
    $scope.getCabinets= function(data){
        ShelvesFactory.getCurrentCabinet(data);
        setTimeout(function(){
            $scope.built_cabinets=ShelvesFactory.getCabinetByID()
        },500)
        setTimeout(function(){
            ShelvesFactory.getCurrentCabinet(data);
            $scope.built_cabinets=ShelvesFactory.getCabinetByID()
        },100)
    };

});
myApp.controller('WineManager', function($scope, WineFactory){
    WineFactory.getTypesAndCategories(function(data){
        $scope.types_categories = data;
    });
    $scope.addWine = function(data){
        WineFactory.saveCurrentWine(data);
    }
    WineFactory.getUnassignedWines(function(data){
        $scope.unassigned_wines = data;
    })
    $scope.handleDropBack = function() {
        WineFactory.removeWinefromShelf($scope.$$childHead.add_wine)      
    }
    $scope.handleWineDrop = function() {
        WineFactory.placeWineOnShelf($scope.$$childHead.$$nextSibling.add_wine)        
    }
    $scope.clickedShelf = function(data){
        WineFactory.thisClickedShelf(data);
    }
    $scope.wineInfo = function(data){
        $scope.wine_info = data
    }
    $scope.assigned_wines = WineFactory.getAssignedWines()
    WineFactory.getAll(function(data){
        $scope.allWines = data
    })
    $scope.removeWine = function(data){
        WineFactory.removeThisWine(data)
    }
    $scope.clickedWineToRemove = function(data){
        WineFactory.thisClickedWineToRemove(data)
    }
    WineFactory.displayShelvesToRemoveWine(function(data){
        console.log(data)
        $scope.cabinets = data
    })
    
});