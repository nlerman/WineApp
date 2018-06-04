
function myOverFunction(id) {
    document.getElementById(id).style.backgroundColor = "#5CE68A"; 
    mouse_position.x = parseInt(document.getElementById(id).style.left);
    mouse_position.y = parseInt(document.getElementById(id).style.top);
}
function myLeaveFunction(id) {
    document.getElementById(id).style.backgroundColor = "transparent"; 
}
function myMouseOverFunction(id){
	
	if (document.getElementById(id).src == 'http://localhost:8080/pics/square.png'){
		document.getElementById(id).src = "http://localhost:8080/pics/square2.png"
	}
	else if (document.getElementById(id).src == 'http://localhost:8080/pics/big_square.png'){
		document.getElementById(id).src = "http://localhost:8080/pics/big_square2.png"
	}
	else if (document.getElementById(id).src == 'http://localhost:8080/pics/rectangle.png'){
		document.getElementById(id).src = "http://localhost:8080/pics/rectangle2.png"
	}
	else if (document.getElementById(id).src == 'http://localhost:8080/pics/triangle_rectangle.png'){
		document.getElementById(id).src = "http://localhost:8080/pics/triangle_rectangle2.png"
	}
}
function myMouseLeaveFunction(id){
	if (document.getElementById(id).src == 'http://localhost:8080/pics/square2.png'){
		document.getElementById(id).src = "http://localhost:8080/pics/square.png"
	}
	else if (document.getElementById(id).src == 'http://localhost:8080/pics/big_square2.png'){
		document.getElementById(id).src = "http://localhost:8080/pics/big_square.png"
	}
	else if (document.getElementById(id).src == 'http://localhost:8080/pics/rectangle2.png'){
		document.getElementById(id).src = "http://localhost:8080/pics/rectangle.png"
	}
	else if (document.getElementById(id).src == 'http://localhost:8080/pics/triangle_rectangle2.png'){
		document.getElementById(id).src = "http://localhost:8080/pics/triangle_rectangle.png"
	}
}
function newDoc() {
    window.location.assign("http://localhost:8080")
}