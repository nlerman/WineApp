var mysql = require('mysql');
var http = require('http');
module.exports = function Route(app){
  app.get('/', function(req, res){
    res.render('index', {title:'Welcome Page'});
  });
	var db = mysql.createConnection({
	  user: 'root',
	  password: '',
	  database: 'wines',
	  port: '3306'
	});
	app.post ('/create_cabinets', function(req,res){
		var output;
		db.query('INSERT INTO shelves_locations (cabinet_location) VALUES ("'+req.body.location+'")' );
		get_locations = function (errors, req, fields) {
  			req.forEach(function (result) {
  				output = result.id;
  			})
  			saveShelves()
		}
		db.query('SELECT id from shelves_locations where cabinet_location ="'+req.body.location+'"', get_locations)
		function saveShelves(){
			for (var i = 0; i < req.body.data.length; i++) {
				for (var j = 0; j < req.body.data[i].length; j++){
					if (req.body.data[i][j].shelf_x != 603){
						var query = 'INSERT INTO shelves (type, x_cord, y_cord, shelves_locations_id) VALUES ("'+req.body.data[i][j].shelf_source +'", '+ req.body.data[i][j].shelf_x +','+req.body.data[i][j].shelf_y+','+output+')';
						db.query(query);
					}
				};
			};
		}
		res.send('success');
	});
	app.get('/show_locations', function(req,res){
		var output = [];
		var locations = [];
		var returned_data = {}
		get_locations = function (errors, req, fields) {
  			req.forEach(function (result) {
  				locations.push(result);
  			})
  			returned_data = {
  				location: locations,
  			}
  			res.send(JSON.stringify(returned_data))
		}
		db.query('SELECT * from shelves_locations', get_locations)
	});
	app.post('/show_cabinets', function(req,res){
		var output = [];
		get_shelves = function (errors, req, fields) {
  			req.forEach(function (result) {
  				output.push(result);
  			})
  			returned_data = {
  				output: output,
  			}
  			res.send(JSON.stringify(returned_data))
  		}
		db.query('SELECT * FROM shelves where shelves_locations_id = '+req.body.location_id+'', get_shelves);
	})
	app.get('/show_TypesAndCategories', function(req,res){
		var types_categories = {types: [],categories: [] };
		get_types = function (errors, req, fields) {
  			req.forEach(function (result) {
  				types_categories.types.push(result);
  			})
  			get_categories = function (errors, req, fields) {
	  			req.forEach(function (result) {
	  				types_categories.categories.push(result);
	  			})
	  			res.send(JSON.stringify(types_categories))
			}
			db.query('SELECT * FROM categories', get_categories)
		}
		db.query('SELECT * FROM types', get_types)
	});
	app.post('/add_wine', function(req,res){
		var output;
		db.query('INSERT INTO wines (name, origin_country, year, price, description, types_id) VALUES ("'+req.body.name+'","'+req.body.country+'",'+req.body.year+','+req.body.price+',"'+req.body.description+'",'+req.body.type.id+')' );
		get_wine_id = function (errors, req, fields) {
  			req.forEach(function (result) {
  				output = result.id
  			})
  			saveWine();
		}
		db.query('SELECT MAX(id) as id from wines', get_wine_id)
		function saveWine(){
			var query = 'INSERT INTO wines_categories (categories_id, wines_id) VALUES ("'+req.body.category.id +'",'+output+')';
			db.query(query);
		}
		res.send('success');
	});
	app.get('/show_UnassignedWines', function(req,res){
		var unassigned_wines = [];
		get_wines = function (errors, req, fields) {

  			req.forEach(function (result) {
  				unassigned_wines.push(result);
  			})
  			res.send(JSON.stringify(unassigned_wines))
		}
		db.query('SELECT * FROM wines where shelves_id is null', get_wines)
	});
	app.post('/show_wines_on_shelf',function(req,res){
		var output = [];
		get_wine_on_shelf = function (errors, req, fields) {
  			req.forEach(function (result) {
  				output.push(result);
  			}) 			
  			res.send(JSON.stringify(output))
  		}
		db.query('SELECT * FROM wines where shelves_id = '+req.body.data+'', get_wine_on_shelf);
	})
	app.post('/add_wine_to_shelf',function(req,res){
		db.query("UPDATE wines SET shelves_id="+req.body.data.shelf_id+" WHERE id="+req.body.data.wine_id+"");
		res.send("success")
	})
	app.post('/remove_wine_from_shelf',function(req,res){
		db.query("UPDATE wines SET shelves_id=null WHERE id="+req.body.data.wine_id+"");
		res.send("success")
	})
	app.get('/show_all', function(req,res){
		var all_wines = [];
		get_wines = function (errors, req, fields) {

  			req.forEach(function (result) {
  				all_wines.push(result);
  			})
  			res.send(JSON.stringify(all_wines))
		}
		db.query('SELECT w.id as wine_id, w.name, w.origin_country as country, w.year, w.price, sh.id as shelf_id, t.type, sl.cabinet_location as location, c.category from wines w, types t, shelves sh, shelves_locations sl, wines_categories wc, categories c where w.types_id = t.id and w.shelves_id = sh.id and sh.shelves_locations_id = sl.id and w.id = wc.wines_id and c.id = wc.categories_id order by w.id', get_wines)
	});
	app.post('/remove_wine',function(req,res){
		db.query("DELETE FROM wines_categories WHERE wines_id="+req.body.data+"");
		db.query("DELETE FROM wines WHERE id="+req.body.data+"");
		res.send("success")
	})
	app.post('/remove_wine_on_shelf',function(req,res){
		var shelves = []
		get_shelves = function(errors,req,fields){
			req.forEach(function (result){
				shelves.push(result);
			})
			res.send(JSON.stringify(shelves))
		}
		db.query('SELECT cabinet_location, shelves2.id, shelves2.type,shelves2.x_cord,shelves2.y_cord from shelves left join shelves_locations on shelves.shelves_locations_id = shelves_locations.id left join shelves as shelves2 on shelves2.shelves_locations_id = shelves_locations.id where shelves.id = '+req.body.data+'', get_shelves)
	})
}
	