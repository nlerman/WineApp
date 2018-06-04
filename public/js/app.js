var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(function($routeProvider){
	$routeProvider
	.when('/shelf_builder',
	{
		templateUrl: '../partials/shelf_builder.html'
	})
	.when('/location_manager',
	{
		templateUrl: '../partials/shelf_manager.html'
	})
	.when('/wine_manager',
	{
		templateUrl: '../partials/wine_dashboard.html'
	})
	.when('/manage_wine',
	{
		templateUrl: '../partials/manage_wine.html'
	})
	.when ('/add_wine', 
	{
		templateUrl: '../partials/add_wine.html'
	})
	.when('/add_wine_to_shelf',
	{
		templateUrl: '../partials/add_wine_to_shelf.html'
	})
	.when('/remove_wine',
	{
		templateUrl: '../partials/remove_wine.html'
	})
});

		