$(()=>{
    $(".btn").on("click",function(){
        $("input").toggleClass("expanded");
        $(this).toggleClass("active");
    });
});