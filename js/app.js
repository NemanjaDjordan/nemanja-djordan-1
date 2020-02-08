var $navbar = $(".navbar");
var $burger = $(".burger");
var $body = $("body");
var $buttonRight = $(".button-right");
var $buttonLeft = $(".button-left");
var $btnHire = $(".btn-hire");
var index = 0;
var workSampleLenght = $(".work-sample").length;
var $workSample = $(".work-sample");
var $navItem = $('[data-name="nav-item"]');
var $btnHire = $(".btn-hire");
var $aboutBtn = $(".about-btn");
var $haderWrap = $(".about-header");
var $textWrap = $(".text-wrap");
var $header = $(".header");
var $about = $(".about");
var $work = $(".work");
var $findMe = $(".find-me");
var $home = $(".home");
var $hire = $(".hire");
var totalHeight = 0;

$(document).ready(function() {
  // Toggle navbar with burger
  $home.fadeIn(1000);
  $burger.on("click touchstart", function() {
    burgerClicked();
  });
}); 

// Navigate trought navbar
$navItem.on("click touchstart", function(){
  var dataId = $(this).attr('data-id');
  $body.toggleClass("burger-clicked");
  $navbar.hide();
  $('[data-name="' + dataId + '"]').fadeIn(1000);
  isVisible();
});

// Slider for left and right navigation in .work
$buttonRight.on("click touchstart", function(){
  sliderRight();
});
$buttonLeft.on("click touchstart", function(){
  sliderLeft();
});

// Slider for right navigation in .work
function sliderRight(){
  hide();
  index ++;
  if(index === workSampleLenght){
    index = 0;
  }
  fadeIn();
};

// Slider for left navigation in .work
function sliderLeft(){
  hide();
  index --;
  if(index === -1){
    index = workSampleLenght-1;
  }
  fadeIn();
};

// Toggle function for navigation throught .work slider
function hide(){
  $workSample.eq(index).hide();
};
function fadeIn(){
  $workSample.eq(index).fadeIn(500);
};

// Burger function
function burgerClicked(){
  $body.toggleClass("burger-clicked touchstart");
  if ($body.hasClass("burger-clicked")) {
    $navbar.slideDown(500);
    $body.children().not(".header").hide();
    $burger.hide();
  }else {
    $navbar.hide();
  }
};
$navbar.on("click touchstart", function(){
  $burger.show();
});



// Navigate trought navbar
$aboutBtn.on("click touchstart", function(){
  $haderWrap.add($textWrap).hide();
  var dataId = $(this).attr('data-id');
  $('[data-name="' + dataId + '"]').fadeIn(1000);
});

