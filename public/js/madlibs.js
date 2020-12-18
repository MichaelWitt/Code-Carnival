$(document).ready(function(){
  $("#story").hide();
  $("#play").hide();
  

  //event handler
  $("#btn-click").click(function(e) {

    e.preventDefault()
    
  $("#story").show();
  
  $("#btn-click").hide();
  $("#play").show();

    // grab the values from the input boxes, then append them to the DOM
    $(".name").empty().append($("input.name").val());
    $(".country").empty().append($("input.country").val());
    $(".color").empty().append($("input.color").val());
    $(".job").empty().append($("input.job").val());
    $(".animal").empty().append($("input.animal").val());
    $(".animalName").empty().append($("input.animalName").val());


  //hide the values
  $(':input').val('');

  //hide questions
  $("#answerForm").hide();
  });

  $("#play").click(function(e) {
    $("#answerForm").show();

  $("#btn-click").show();
    $("#story").hide();
  });
  
});