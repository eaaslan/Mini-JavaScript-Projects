const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
];

$(()=>{
    let currentIndex=0;
    let trueCounter=0;
    const loadQuestion = ()=>{
        $("#question").text(quizData[currentIndex].question)
        $("#a_text").text(quizData[currentIndex].a)
        $("#b_text").text(quizData[currentIndex].b)
        $("#c_text").text(quizData[currentIndex].c)
        $("#d_text").text(quizData[currentIndex].d)
    }

    $('#submit').on('click', function() {
        // Get the selected answer
        const selectedAnswer = $("input[name='answer']:checked").attr("id")
        if(currentIndex>=quizData.length-1){
          
            $("#quiz").html(`<p> ${trueCounter}/${quizData.length} was correct </p>`)
        }

        if(selectedAnswer){

            if(selectedAnswer===quizData[currentIndex].correct){
            
                trueCounter++
            }

            currentIndex++;
            $("input[name='answer']").prop("checked",false)
            loadQuestion()
        }

        console.log(selectedAnswer)
        
       
    });
    loadQuestion()








})