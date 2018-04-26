

// Puts focus on the name field
$('#name').focus();

// create and append field to .basic-info
 $('.basic-info').append('<input type="text" id="other-field" placeholder="Your job title" name="otherjob">');

 // hides new other field for time being
 $('#other-field').hide();


// When job role other is selected, the other-field item is displayed 
// When job role is not other, other-field item is hidden
$('#title').change(function(){
    if ($('#title').val() == "other") {
      $('#other-field').show();
    } else {
      $('#other-field').hide();
    }
});


//color field hidden by default

$('#colors-js-puns').hide();

// For each t-shirt design, different colors are displayed.
    $('#design').change(function(){
        // First, clear current colour dropdown
        $("#color").children().remove();
        // Then, show colours based on design selected
        if ($('#design').val() == "js puns") {
            $('#color').append($("<option value='cornflowerblue'>Cornflower Blue</option>"));
            $('#color').append($("<option value='darkslategrey'>Dark Slate Grey</option>"));
            $('#color').append($("<option value='gold'>Gold</option>"));
            $('#colors-js-puns').show();
        } else if ($('#design').val() == "heart js") {
            $('#color').append($("<option value='tomato'>Tomato</option>"));
            $('#color').append($("<option value='steelblue'>Blue Steel</option>"));
            $('#color').append($("<option value='dimgrey'>Dim Grey</option>"));
            $('#colors-js-puns').show();
        } else {
            $('#colors-js-puns').hide();
        }
    });




$(":checkbox").change(function(){



 // prevent schedule conflicts and add messages
  var frameworks = $("input[name='js-frameworks']");
  var express = $("input[name='express']");
  var libraries = $("input[name='js-libs']");
  var node = $("input[name='node']");

    function timeConflict(workshop, conflict){
      if (workshop.is(":checked")) {
        conflict.attr("disabled", true);
        conflict.parent().css('color','gray');
      } else {
        conflict.attr("disabled", false);
        conflict.parent().css('color','#000');
      }
    }

  timeConflict(frameworks, express);
  timeConflict(express, frameworks);
  timeConflict(libraries, node);
  timeConflict(node, libraries);

});


// Keeps a tally of costs and appends cost to activities if >0
$(":checkbox").change(function(){

    var total = 0;
    $("#cost").remove();

          if ($("input[name='all']").is(":checked"))  {
            total += 200;
          }

          $("input:not([name='all'])").each(function(){
            if ($(this).is(":checked")) {
            total += 100;
            }
          });

    if (total > 0) {
    $(".activities").append("<p id='cost'>Total cost: $" + total + " </p>");
    }
});


// Shows credit card payment details by default

$('#paypal, #bitcoin').hide();
$('#payment').val("credit card");


// For each diffent payment selected, relevant details are displayed
$('#payment').change(function(){
	if ($('#payment').val() === "paypal") {
		$('#credit-card, #bitcoin').hide();
		$('#paypal').show();
	} else if ($('#payment').val() === "bitcoin") {
		$('#credit-card, #paypal').hide();
		$('#bitcoin').show();
	} else {
		$('#credit-card').show();
		$('#paypal, #bitcoin').hide();
	}
});



$("button[type='submit']").on("click", function(e){
    // First, clear any existing error messages
    $("#nameerror").remove();
    $("#titleerror").remove();
    $("#activityerror").remove();
    $("#paydetailserror").remove();
    $("#ccserror").remove();
    $("#mailerror").remove();
   
    $("#card_label").css("color", "black");
    $("#cvv_label").css("color", "black");
    $("#zip_label").css("color", "black");
 
    
  

    // Next, use variables to track problems with input;
    // these will tell us at end of function whether form can be sumbitted
     submitcounter = 0;
     activitycounter = 0;



    // Name field can't be empty
    if ($("#name").val() === "") {
      submitcounter += 1;
      $("#name").before("<p id='nameerror' class='errortext'>Please enter your name.</p>");
      $("#name").focus();
    }

    // If Other field is selected, ensure job title is entered
    if ( ($("#title").val() == "other") && ($("#other-title").val() === "") ) {
      submitcounter += 1;
      $("#other-title").after("<p id='titleerror' class='errortext'>Please enter your job role.</p>");
    }

    // At least one activity must be checked from the list under "Register for Actitivities."

      $(".activities input").each(function(){
        if ($(this).is(":checked")) {
          activitycounter += 1;
        }
        return activitycounter;
      });

      if (activitycounter === 0){
        submitcounter += 1;
        $(".activities").after("<p id='activityerror' class='errortext'>Please select an activity.</p>");
      }


    // Credit Card Errors for all fields in the following if statements
      if ($("#payment").val() == "credit card" && ($("#cc-num").val() === "" || $("#zip").val() === "" || $("#cvv").val() === "") ) {
          console.log("Credit card fields are blank.");
          submitcounter += 1;
          $("#payment").after("<p id='paydetailserror' class='errortext'>Credit card fields are blank</p>");
      } 

        if  ($("#payment").val() == "credit card" &&($("#cc-num").val().length < 13 || $("#cc-num").val().length >16 || isNaN($("#cc-num").val())
              
        	)){

     
          submitcounter+=1;
          $("#card_label").css("color", "red");
           
        } 
        
       
        if  ($("#payment").val() == "credit card" &&($("#cvv").val().length >3 || $("#cvv").val().length <3 || isNaN($("#cvv").val())
              
        	)){

           submitcounter+=1;
           $("#cvv_label").css("color", "red");
             
           
        } 
        
        if  ($("#payment").val() == "credit card" &&($("#zip").val().length >5 || $("#zip").val().length <5 || isNaN($("#zip").val())
              
        	)){

           submitcounter+=1;

             $("#zip_label").css("color", "red");
             
           
        } 
        

    //  Email field must be a validly formatted e-mail address
      var emailinput = $("#mail").val();
      //var emailformula = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      var emailformula = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (!emailformula.test(emailinput)) {
        submitcounter += 1;
        $("#mail").before("<p id='mailerror' class='errortext'>Please enter a valid email.</p>");
      }

  
     
     
  // Test for errors on submission
  if (submitcounter > 0) {
    e.preventDefault();
    console.log("Submit prevented");
    console.log(submitcounter);
  } else {
    console.log("Registration accepted");
    // When successful an alert is pops up
    alert("Registration accepted");
  }

});
