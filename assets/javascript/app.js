
var topics = ["Cats", "Dogs", "Funny", "Computers", "Fish"];
var input = $("#searchInput").val().trim();

//=========Render Buttons ==================//

function renderButtons(newTopic) {
    // console.log( "I am rendering")
    if (typeof newTopic === "undefined") {
        topics.forEach(function (topic) {
            $("#buttons").append(`<button data-val=${topic}>${topic}</button>`)

        })
    } else { 
        // console.log("this")
      topics.push(newTopic)
      $("#buttons").append(`<button data-val=${newTopic}>${newTopic}</button>`)
    }
}

$("#search").on("click", function(event){
  event.preventDefault();
  $("#results").empty();
  var formValue = $("#searchInput").val().trim();
  $("#searchInput").val();
  if (!(topics.indexOf(formValue) > -1)){
    // console.log(formValue);
    renderButtons(formValue);
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
        // console.log(response)


        $("#results").empty();
        var result = response.data;
        for (var i = 0; i < result.length; i++) {
            var gifDiv = $("<div class='item'>");
            var rating = result[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var giphy = $("<img>");
            giphy.attr("src", result[i].images.fixed_width_still.url);
            giphy.attr("data-still",result[i].images.fixed_width_still.url)
            giphy.attr("data-animate",result[i].images.fixed_width.url)
            giphy.attr("data-state", "still")
            giphy.addClass("image");
            gifDiv.prepend(p);
            gifDiv.prepend(giphy);
            $("#results").prepend(gifDiv);
        }
    })
});

  //=========Giphs state handler==================//

           $(document).on("click", ".image", function(){
            // console.log( "I have been clicked")
            var currentState = $(this).attr("data-state");
            if (currentState === "still"){
               $(this).attr("src", $(this).attr("data-animate"))
               $(this).attr("data-state", "animate")
            }else{
                $(this).attr("src", $(this).attr("data-still"))
                $(this).attr("data-state", "still")
            }

            })


