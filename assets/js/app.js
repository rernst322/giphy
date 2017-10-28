

var topics = ["Bird", "Gorilla", "Kangaroo", "Bunny", "Dog", "Cat", "Dinosaur", "Fish", "Manatee", "Monkey", "Penguin", "Tiger"]


function displayGif() {

//$("button").on("click", function(){
var animal = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

$.ajax({
	url: queryURL,
	method: "GET"
}).done(function(response) {

	var results = response.data;

	console.log(queryURL);
	console.log(results);

	for(var i = 0; i < results.length; i++) {
		var gifDiv = $("<div>");

		//var rating = results[i].rating;

		//var p = $("<p>").text("Rating: " + rating);

		var animalGifs = $("<img>");

		animalGifs.addClass("gif");
		animalGifs.attr("data-state", "still");
		animalGifs.attr("src", results[i].images.fixed_height_still.url)
		animalGifs.attr("animate-url", results[i].images.fixed_height.url);
		animalGifs.attr("still-url", results[i].images.fixed_height_still.url);
		

		//gifDiv.append(p);
		gifDiv.append(animalGifs);

		$("#gifImages").prepend(gifDiv);

}
});

}

function renderButtons() {

$("#animalButtons").empty();




for (var i = 0; i < topics.length; i++) {
	var btn = $("<button>");
	btn.addClass("aBtn");
	btn.attr("data-name", topics[i]);
	btn.text(topics[i]);
	$("#animalButtons").append(btn);

	}	
}

	$("#addTopic").on("click", function(event){
	event.preventDefault();
	var topic = $("#giphy-input").val().trim();
	topics.push(topic);
	renderButtons();
	
	//$("#giphy-input").empty();
});

function move(){

	var state = $(this).attr("data-state");
	console.log(state);

	if (state === "still"){
		$(this).attr("src", $(this).attr("animate-url"));
		$(this).attr("data-state", "animate");
	} else{
		$(this).attr("src", $(this).attr("still-url"));
		$(this).attr("data-state", "still");
	}
};


$(document).on("click", ".aBtn", displayGif);

renderButtons();

$(document).on("click", ".gif", move);






//
