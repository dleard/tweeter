$(function() {
  $("form[method='POST'").on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const input = $("textarea[name='text']").val();
    if (input.length === 0) {
      alert('Your tweet is empty!');
      return;
    }
    else if (input.length > 140) {
      alert('Your tweet is too looooong!');
      return;
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data
      }).done(function() {
        console.log('SUCCESS!');
        console.log(data);
      });
    }  
  });

});