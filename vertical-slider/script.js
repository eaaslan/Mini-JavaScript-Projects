 $(()=>{
        let currentRightIndex=0;
        $(".left-slide").css("top",`${($(".left-slide div").length-1)*-100}vh`)

        $(".down-button").on("click",()=>{
        const divHeight= $(".slider-container").height()
        currentRightIndex+=divHeight;
        if(currentRightIndex >= $(".right-slide div").length*divHeight){
            currentRightIndex=0;
        }
        $(".right-slide").css("transform",`translateY(-${currentRightIndex}px)`)
        $(".left-slide").css("transform",`translateY(${currentRightIndex}px)`)
})

        $(".up-button").on("click",()=>{
            const divHeight= $(".slider-container").height()
            console.log(currentRightIndex)
            console.log(divHeight)

            currentRightIndex-=divHeight
            if(currentRightIndex <0){
                currentRightIndex=($(".right-slide div").length-1)*divHeight
            }
            $(".right-slide").css("transform",`translateY(-${currentRightIndex}px)`)
            $(".left-slide").css("transform",`translateY(+${currentRightIndex}px)`)
        })

 })