var topics = ["Tactical", "Jeep", "Cars", "Funny", "Dogs"];
// console.log(topics)
var input = $("#searchInput").val().trim();
function displayGifs(){
    $("#results").empty();
    console.log('topic', topic)
    var topic = $(this).attr("data-value");
    console.log('topic1', topic)
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" 
    + topic + "&limit=10&rating=r&api_key=dc6zaTOxFJmzC";
    console.log('query', queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log('hello', response)
        var results = response.data;
        console.log(results)
        for (i =0 ; i < results.length ; i++){
            console.log('in loop')
            var r = results[i].rating;
            var gifDiv = $("<div class='grid-item'>");
            var rating = results[i].rating;
            var r = $("<p>").text("Rated: " + rating);
                r.addClass("rated")
            var f = $("<button>").text("Add to favorites");
                f.addClass("favBtn")
            var giphy = $("<img class='image'>");
                giphy.attr("src", results[i].images.fixed_width_still.url);
                giphy.attr("data-still",results[i].images.fixed_width_still.url)
                giphy.attr("data-animate",results[i].images.fixed_width.url)
                giphy.attr("data-state", "still")
                gifDiv.prepend(r);
                gifDiv.prepend(f);
                gifDiv.prepend(giphy);
                $("#results").append(gifDiv);
        }//end of for loop//
    });
}        
function renderButtons() {
    for (var i = 0; i < topics.length; i++) {
        $("#buttons").append(
            `
            <button class="topicBtn" data-value=${topics[i]}>${topics[i]}</button>
            `
        )
    
} //end of render button function//
}console.log(topics)

$("#addBtn").click(function (event) {
    console.log('in addButton')
    event.preventDefault()
    var newTopic = $("#searchInput").val().trim();
    // console.log(newTopic)
  
    // console.log('newTopic', newTopic)
    if (!(topics.indexOf(newTopic) > -1)) {
        topics.push(newTopic);
        // console.log(input)
        $("#buttons").append(
            `
            <button class="topicBtn" data-value=${newTopic}>${newTopic}</button>
            `
        )
    }
   
});


$(document).on("click", ".topicBtn", displayGifs);

renderButtons();




//================state Handler==================//
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
    
        });