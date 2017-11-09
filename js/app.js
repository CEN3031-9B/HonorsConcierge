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

var regis = false;
var advising = false;
var reqs = false;
var courses = false;
var placeholder = true;
$('#earlyRegistration').on('click', function() {
  if (placeholder == true) {
    $('.placeholder').toggleClass('clicked');
    placeholder = false;
  }
  if (advising == true) {
    $('.jumbotron-honorsAdvising').toggleClass('clicked');
    advising = false;
  }
  if (reqs == true) {
    $('.jumbotron-honorsReq').toggleClass('clicked');
    reqs = false;
  }
  if (courses == true) {
    $('.jumbotron-coursesCredits').toggleClass('clicked');
    courses = false;
  }
  if (regis == false) {
    $('.jumbotron-earlyRegistration').toggleClass('clicked');
    regis = true;
  }
});

$('#advising').on('click', function() {
  if (placeholder == true) {
    $('.placeholder').toggleClass('clicked');
    placeholder = false;
  }
  if (regis == true) {
    $('.jumbotron-earlyRegistration').toggleClass('clicked');
    regis = false;
  }
  if (reqs == true) {
    $('.jumbotron-honorsReq').toggleClass('clicked');
    reqs = false;
  }
  if (courses == true) {
    $('.jumbotron-coursesCredits').toggleClass('clicked');
    courses = false;
  }
  if (advising == false) {
    $('.jumbotron-honorsAdvising').toggleClass('clicked');
    advising = true;
  }
});
$('#requirements').on('click', function() {
  if (placeholder == true) {
    $('.placeholder').toggleClass('clicked');
    placeholder = false;
  }
  if (advising == true) {
    $('.jumbotron-honorsAdvising').toggleClass('clicked');
    advising = false;
  }
  if (regis == true) {
    $('.jumbotron-earlyRegistration').toggleClass('clicked');
    regis = false;
  }
  if (courses == true) {
    $('.jumbotron-coursesCredits').toggleClass('clicked');
    courses = false;
  }
  if (reqs == false) {
    $('.jumbotron-honorsReq').toggleClass('clicked');
    reqs = true;
  }
});
$('#courses-credits').on('click', function() {
  if (placeholder == true) {
    $('.placeholder').toggleClass('clicked');
    placeholder = false;
  }
  if (advising == true) {
    $('.jumbotron-honorsAdvising').toggleClass('clicked');
    advising = false;
  }
  if (reqs == true) {
    $('.jumbotron-honorsReq').toggleClass('clicked');
    reqs = false;
  }
  if (regis == true) {
    $('.jumbotron-earlyRegistration').toggleClass('clicked');
    regis = false;
  }
  if (courses == false) {
    $('.jumbotron-coursesCredits').toggleClass('clicked');
    courses = true;
  }
});

$('span.activator').mouseover(function(e){
    $(this).trigger('click');
});
