
    //document.getElementById("fortunesdiv").innerHTML = queryRandomFortune
 // });

 // When user clicks fortune teller tent
$("#fortune").on("click", function(event) {
  event.preventDefault();

// When the page loads, grab all of our fortunes
$.get("/api/all", function(data) {

  if (data.length !== 0) {

    for (var i = 0; i < data.length; i++) {

      document.getElementById("fortunesdiv").innerHTML = queryRandomFortune

    }

  }

});
});