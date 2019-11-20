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
  // Check if .btn-hire should be visible
  isVisible();
}); 

// Navigate trought navbar
$navItem.on("click touchstart", function(){
  var dataId = $(this).attr('data-id');
  $body.toggleClass("burger-clicked");
  $navbar.hide();
  $('[data-name="' + dataId + '"]').fadeIn(1000);
  $burger.add($btnHire).show();
  isVisible();
});

// Btn-hire 
$btnHire.on("click touchstart", function(){
  $body.children().not($hire, $header).hide();
  $hire.fadeIn(1000);
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
  $body.toggleClass("burger-clicked");
  $burger.add($btnHire).hide();
  if ($body.hasClass("burger-clicked")) {
    $navbar.slideDown(500);
    $body.children().not(".header, .btn1").hide();
  }else {
    $navbar.hide();
  }
};

// Check if .btn-hire should be visible function
function isVisible(){
  if ( $findMe.is(':visible') || $work.is(':visible') || $about.is(':visible')){
    $btnHire.show();
  }else{
    $btnHire.hide();
  }
}

// Navigate trought navbar
$aboutBtn.on("click touchstart", function(){
  $haderWrap.add($textWrap).hide();
  var dataId = $(this).attr('data-id');
  $('[data-name="' + dataId + '"]').fadeIn(1000);
});

// Email form functions
(function() {
  function validEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  function validateHuman(honeypot) {
    if (honeypot) { 
      return true;
    }
  }

  function getFormData(form) {
    var elements = form.elements;
    var fields = Object.keys(elements).filter(function(k) {
    return (elements[k].name !== "honeypot");
    }).map(function(k) {
      if(elements[k].name !== undefined) {
        return elements[k].name;
      }else if(elements[k].length > 0){
        return elements[k].item(0).name;
      }
    }).filter(function(item, pos, self) {
      return self.indexOf(item) == pos && item;
    });
    var formData = {};
    fields.forEach(function(name){
      var element = elements[name];
      formData[name] = element.value;
      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(', ');
      }
    });

    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; 
    formData.formGoogleSendEmail = form.dataset.email || ""; 

    return formData;
  }

  function handleFormSubmit(event) {  
    event.preventDefault();           
    var form = event.target;
    var data = getFormData(form);         

    
    if (validateHuman(data.honeypot)) {  
      return false;
    }

    if( data.email && !validEmail(data.email) ) {  
      var invalidEmail = form.querySelector(".email-invalid");
      if (invalidEmail) {
        invalidEmail.style.display = "block";
        return false;
      }
    } else {
      disableAllButtons(form);
      var url = form.action;
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
          var formElements = form.querySelector(".form-elements")
          if (formElements) {
            formElements.style.display = "none"; // hide form
          }
          var thankYouMessage = form.querySelector(".thankyou-message");
          if (thankYouMessage) {
            thankYouMessage.style.display = "block";
          }
          return;
      };
      var encoded = Object.keys(data).map(function(k) {
          return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
      }).join('&');
      xhr.send(encoded);
    }
  }
  
  function loaded() {
    var forms = document.querySelectorAll("form.gform");
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", handleFormSubmit, false);
    }
  };
  document.addEventListener("DOMContentLoaded", loaded, false);

  function disableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }
})();
