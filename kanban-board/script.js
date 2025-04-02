const loadJquery = (callback) => {
  const script = document.createElement("script");
  script.src = "https://code.jquery.com/jquery-3.7.1.js";
  script.onload = () => {
    if (callback) {
      callback();
    }
  };
  document.head.appendChild(script);
};

loadJquery(() => {
  $(() => {
    $(".add-card-btn").click(function () {
      const addDiv = `

      <div class="card" draggable="true">
        <form class="add-card-for ">
        <textarea placeholder="Enter a title here..."></textarea>
        <button type='button' class= "confirm-card-btn"> Confirm card </button>
        <button type="button" class= "cancel-card-btn">Cancel</button>
        </form>
        </div>
        `;

      $(this).closest(".column-header").after(addDiv);
    });

    $(document).on("click", ".cancel-card-btn", function () {
      $(this).closest(".card").remove();
    });

    $(document).on("click", ".confirm-card-btn", function () {
      const cardTitle = $(this).closest(".card").find("textarea").val();
      const currentCard = $(this).closest(".card");
      console.log(cardTitle);
      const card = `
       <div class="card" draggable="true">
            <h3 class="card-title">${cardTitle}</h3>
            <p class="card-text"></p>
            <div class="card-actions"> 
            <button class="edit-card-btn">Edit</button>
            <button class="delete-card-btn">Delete</button>
            </div>
          </div>
      `;
      currentCard.replaceWith(card);
    });

    $(document).on("click", ".delete-card-btn", function () {
      $(this).closest(".card").remove();
    });

    $(document).on("click", ".edit-card-btn", function () {
      const card = $(this).closest(".card");
      const currentTitle = card.find(".card-title").text();

      const editForm = `
      <div class=card> 
        <form class="add-card-form">
        <textarea> ${currentTitle} </textarea>
        <button type="button" class="confirm-card-btn"> Confirm changes</button>
        </div>
      `;
      card.replaceWith(editForm);
    });
  });
});
