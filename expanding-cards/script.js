$(()=>{
    $(".panel").click(function(){
      $(".panel").removeClass("active")
      $(this).addClass("active")
      console.log(this)
    })

})