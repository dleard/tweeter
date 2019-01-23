$(document).ready(function() {
  $("textarea[name='text']").on('input', function constraint(event) {
    console.log(this);
    let count = 140 - $(this).val().length;
    let counterText = $(this).nextAll('.counter')[0];
    counterText.innerText = count;
    if (counterText.innerText < 0) { $(counterText).parent().css("color", "red"); }
    else { $(counterText).parent().css("color", ""); }
  });
});