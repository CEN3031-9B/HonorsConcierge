function deleteSearch (x) {
  document.getElementsByName('search')[0].placeholder = "";
  //window.getComputedStyle(document.querySelector('.search'), '::after').getPropertyValue('opacity');
}

function addSearch (x) {
  document.getElementsByName('search')[0].placeholder = "Search...";
  //document.getElementsByClassName('search')[0].style.opacity = 0.8;
}

var clicked = false;
$('.card-image input').on('click', function() {
    if (clicked === false) {
      $('#nav-mobile').toggleClass('clicked');
      $('.card').toggleClass('clicked');
      clicked = true;
    }
});

$('span.activator').mouseover(function(e){
    $(this).trigger('click');
});
