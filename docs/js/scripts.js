$(document).ready(function(){
  $(".current-year").html(new Date().getFullYear());
  $(".clickme").click(function(){
    $(".show-on-click").show();
  });
  $(".current-year").html(new Date().getFullYear());
});
