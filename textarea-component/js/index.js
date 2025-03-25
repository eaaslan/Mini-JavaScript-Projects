$(()=>{
function countChars(e) {
  return  $(e).val().length;
}
$("#firstCountedNum").text(countChars($("#firstDescription")));
$("#secondCountedNum").text(countChars($("#secondDescription")));

$("#firstDescription").on("input", function (e) {
 let charCount= countChars(e.target)
 if(charCount>500){
  $(this).val($(this).val().substring(0,500))
  charCount=500
   $(".limit-message.first").css("display","block")
   $("#firstDescription:focus").css("border-color","red")
 }else{
  $(".limit-message").css("display","none")
  $("#firstDescription:focus").css("border-color","blue")
 }
  $("#firstCountedNum").text(charCount);
});


$("#secondDescription").on("input",function(e){
let charCount=countChars(e.target)
if(charCount>0){
  if(charCount>500){;
    $(this).val($(this).val().substring(0,500))
    $(".limit-message.second").css("display","block")
    $("#secondDescription:focus").css("border-color","red")
    charCount=500
  }else{
    $(".limit-message.second").css("display","none")
    $("#secondDescription:focus").css("border-color","blue")
  }

  $(".required-text").css("display","none")
}else{
  $(".required-text").css("display","block")
}

$("#secondCountedNum").text(charCount);
})

})