

(() => {
  if (typeof window.jQuery === "undefined") {
    const script = document.createElement("script");
    script.src = "https://code.jquery.com/jquery-3.7.1.js";
    script.integrity = "sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=";
    script.crossOrigin = "anonymous";

    script.onload = function () {
      initJQuery();
    };

    document.head.appendChild(script);
  } else {
    initJQuery();
  }

  function initJQuery() {
    $(() => {
      const init = async () => {
       
        fetchJobId();
        // fetchJobDetails(0, 10);
        displayJobs();
      };

      let currentIndex=0
      let jobDisplayLimit=6

      const fetchJobId = async () => {
        try {
          const response = await fetch(
            "https://hacker-news.firebaseio.com/v0/jobstories.json",
          );
          if (!response.ok) {
            throw new Error("error while fetching");
          }
          const jobId = await response.json();
          return jobId;
        } catch (e) {
          console.error(e);
        }
      };

      const fetchJobDetails = async (startIndex, limit) => {
        const fetchedJobIds = await fetchJobId();
        const batch = fetchedJobIds.slice(startIndex, startIndex+limit);
        const jobDetails = [];

        for (const id of batch) {
          try {
            const response = await fetch(
              `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
            );

            if (!response.ok) {
              throw new Error("error while fetching");
            }
            const jobDetail = await response.json();
            
            jobDetails.push(jobDetail);
            
          } catch (e) {
            console.log(e);
          }
        }
        if(jobDetails.length<limit){
            $("#load-btn").hide()
        }
        console.log(jobDetails.length);
        return jobDetails;
      };

      const displayJobs = async () => {

        $("#loading").show()
        
        const jobs = await fetchJobDetails(currentIndex, jobDisplayLimit);
        jobs.forEach((job) => {
          $(".jobs-container").append(`
            <div class='job-card'>
            <h2 clas="job-title">${job.title}</h2>
            <p class=job-text><span>by ${job.by}</span><span>${job.time}</span> </p>
           </div>
          `);
        });
        $("#loading").hide()
        $("#load-btn").show()
        
      currentIndex+=jobDisplayLimit
      };


      $("#load-btn").click(function(){
       
        displayJobs()
      })

      init();
    });
  }
})();
