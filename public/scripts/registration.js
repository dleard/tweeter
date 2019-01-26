$(() => {

$('#login').on('submit', function(event) {
  event.preventDefault();
  alert(`clicked submit on login`);
});

$('#register').on('submit', function(event) {
  event.preventDefault();
  alert(`clicked submit on register`)
})

});