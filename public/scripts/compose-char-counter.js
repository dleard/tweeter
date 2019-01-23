$(document).ready(function() {
  /**
   * Changes value of counter on input to textarea
   * @param {String} input - which event to call function on
   * @param {Function} constraint - callback function
   */
  $("textarea[name='text']").on('input', function constraint(event) {
    let count = 140 - $(this).val().length;
    let counterText = $(this).nextAll('.counter')[0];
    counterText.innerText = count;
    if (counterText.innerText < 0) { $(counterText).parent().css("color", "red"); }
    else { $(counterText).parent().css("color", ""); }
  });
});