const loadJquery = (callback) => {
  const script = document.createElement("script");
  script.src = "https://code.jquery.com/jquery-3.7.1.js";
  script.integrity = "sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=";
  script.crossOrigin = "anonymous";

  script.onload = () => {
    if (callback) callback();
  };

  document.head.appendChild(script);
};

loadJquery(() => {
  $(() => {
    const init = async () => {
      await getItemsFromStorage();
      displayItems();
      setEvents();
    };

    const setEvents = () => {
      $(".grocery-form").submit((event) => {
        event.preventDefault();

        addGroceryToList($("#grocery").val());
        $("#grocery").val("");
      });

      $(document).on("click", "#delete-btn", function () {
        const itemId = $(this)
          .closest(".item-wrapper")
          .find("li")
          .attr("item-id");

        let items = getItemsFromStorage();
        if (items.length === 0) return;

        items = items.filter((element) => element["id"] != itemId);
        console.log(items);
        localStorage.setItem("grocery-list", JSON.stringify(items));

        $(this).closest(".item-wrapper").remove();
      });

      $(document).on("click", "#edit-btn", function () {
        const items = getItemsFromStorage();
        if (items.length == 0) return;

        const currentItem = $(this)
        .closest(".item-wrapper")
        .find("li")
 
        console.log(currentItem)
        const itemId = currentItem.attr("item-id");
        const itemValue = currentItem.text();

        $("#grocery").focus();
        $("#grocery").val(`${itemValue}`);
        $("input[value='Edit']").css("display", "Block");
        $("input[value='Submit']").css("display", "None");

        $(document).on("click","input[value='Edit']",function(itemId){
            const newValue=$("#grocery").val();
          console.log()
         items =items.map((item) => {
          if (item["id"] == itemId) {
            item["itemName"] = newValue
          }
          return item
          });
        //TODO FIX EDIT
        console.log( $("#grocery").val())
        $("#grocery").val("");
        $("input[value='Edit']").css("display", "none");
        $("input[value='Submit']").css("display", "block");
        
        })
        localStorage.setItem("grocery-list", JSON.stringify(items));
    
        //let li = $(this).closest(".item-wrapper").find("li").text("updated");
      });
    };

    const generateUniqueId = () => {
      return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    };
    const displayItems = () => {
      const items = getItemsFromStorage() || [];
      if (items.length == 0) return;
      items.forEach((item) => {
        console.log(item);
        const groceryItem = `
        <div class="item-wrapper">
        <li item-id="${item["id"]}" class="grocery-item">${item["itemName"]}</li>
        <span class="item-actions"> <button id="delete-btn" type="button">Delete</button> <button id="edit-btn" type="button">Edit</button></span>
         </div>
        `;
        $(".grocery-list").append(groceryItem);
      });
    };
    const getItemsFromStorage = () => {
      return JSON.parse(localStorage.getItem("grocery-list"));
    };
    const addGroceryToList = (grocery) => {
      const items = getItemsFromStorage() || [];
      const uniqueId = generateUniqueId();
      const item = {
        id: `${uniqueId}`,
        itemName: grocery,
        description: "",
      };
      items.push(item);
      localStorage.setItem("grocery-list", JSON.stringify(items));
      $(".grocery-list").append(
        `
        <div class="item-wrapper">
        <li item-id="${uniqueId}" class="grocery-item">${grocery}</li>
        <span class="item-actions"> <button id="delete-btn" type="button">Delete</button> <button id="edit-btn" type="button">Edit</button></span>
         </div>
        `
      );
    };
    init();
  });
});
