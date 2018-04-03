
var topics = ["Cats", "Dogs", "Funny", "Computers", "Fish"];
var input = $("#searchInput").val().trim();
var topics2 = [];
//=========Render Buttons ==================//
function renderButtons() {
  topics.forEach(function(topic) {
    $("#buttons").append(
      `<button data-val=${topic}>${topic}</button>`
    )
  })
}

$("#search").on("click", function(event){
  event.preventDefault();
  $("#results").empty();
  var formValue = $("#serachInput").val();
  $("#serachInput").val("");
  if (!(topics.indexOf(formValue) > -1)){
    topics.push(formValue);
  }
  
});

renderButtons();
 //=========Error handler ==================//


$("#search").click( function(event){
  event.preventDefault()
  input = $("#searchInput").val().trim();

  if ($("#searchInput").val() === ""){
    alert("Oops! No blank giphies for you!");
    $("#results").empty();
    return  null;
  } 

  if ($("#numOfOutPut").val() <= 0){
    alert ("Please add the number of Giphs required");
    $("#results").empty();
    return  null;
  }
  
  if (!(topics.indexOf(input) > -1)){
          topics.push(input);
  }

  console.log(topics);
 //=========API queries ==================//

var giphsAmount = $("#numOfOutPut")
    .val()
    .trim();
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" 
                + input + "&limit=" + giphsAmount + 
                "&rating=r&api_key=dc6zaTOxFJmzC";

$.ajax({
    url: queryURL, 
    method: "GET"
  }).then(function (response) {
        console.log(response)

        // var stillImage = response.data.images.fixed_width_still.url;
        $("#results").empty();
        var result = response.data;
        for (var i = 0; i < result.length; i++) {
            var gifDiv = $("<div class='item'>");
            var rating = result[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var giphy = $("<img>");
            giphy.attr("src", result[i].images.fixed_width_still.url);

            gifDiv.prepend(p);
            gifDiv.prepend(giphy);
            $("#results").prepend(gifDiv);

        }
    })
});
