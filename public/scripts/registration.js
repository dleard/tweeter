$(() => {

    $('#login').on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const error = $(this).children('h5')[0];
    $.ajax({
      method: "POST",
      url: "/login",
      data
    }).done(function(data) {
        console.log(data);
        window.location = "/";

    }).fail(function(data, textStatus, xhr) {
      //This shows status code eg. 403
      console.log("error", data.status);
      console.log(data.responseText);
      error.innerHTML = data.responseText;
      error.style.visibility='visible';
      //This shows status message eg. Forbidden
      console.log("STATUS: "+xhr);
    })
    });

    $('#register').on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const error = $(this).children('h5')[0];
    console.log(error);
    $.ajax({
      method: "POST",
      url: "/register",
      data
    }).done(function(data) {
        console.log(data.status);  

    }).fail(function(data, textStatus, xhr) {
      //This shows status code eg. 403
      console.log("error", data.status);
      console.log(data.responseText);
      error.innerHTML = data.responseText;
      error.style.visibility='visible';
      console.log("STATUS: "+xhr);
    })
    });

});