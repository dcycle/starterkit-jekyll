$(document).ready(function(){
  $(".clickme").click(function(){
    $(".show-on-click").show();
  });
  $(".current-year").html(new Date().getFullYear());
});
