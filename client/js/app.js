function deleteSearch (x) {
  document.getElementsByName('search')[0].placeholder = "";
  //window.getComputedStyle(document.querySelector('.search'), '::after').getPropertyValue('opacity');
}

function addSearch (x) {
  document.getElementsByName('search')[0].placeholder = "Search...";
  //document.getElementsByClassName('search')[0].style.opacity = 0.8;
}

function clickListener (card) {
  card.addEventListener( "click", function() {
    var c = this.classList;
    c.contains("flipped") === true ? c.remove("flipped") : c.add("flipped");
  });
}

$('span.activator').mouseover(function(e){
    $(this).trigger('click');
});
