$(() => {

    $('#login').on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: "/login",
    }).done(function(data) {
        console.log(data);  

    }).fail(function(data, textStatus, xhr) {
      //This shows status code eg. 403
      console.log("error", data.status);
      //This shows status message eg. Forbidden
      console.log("STATUS: "+xhr);
    })
    });

    $('#register').on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    $.ajax({
      method: "POST",
      url: "/register",
      data
    }).done(function(data) {
        console.log(data.status);  

    }).fail(function(data, textStatus, xhr) {
      //This shows status code eg. 403
      console.log("error", data.status);
      //This shows status message eg. Forbidden
      console.log("STATUS: "+xhr);
    })
    });

});