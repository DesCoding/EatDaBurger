// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", (event) => {
  if (event) {
    console.info("DOM loaded");
  }

  // UPDATE
  const changeBurgerBtns = document.querySelectorAll(".devoured");

  // Set up the event listener for the devour button
  if (changeBurgerBtns) {
    changeBurgerBtns.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        // Grabs the id of the element that goes by the name, "id"
        const id = e.target.getAttribute("data-id");
        const devouredBurg = e.target.getAttribute("data-devouredBurg");

        const newBurgerState = {
          devoured: true,
        };

        fetch(`/api/burgers/${id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          // make sure to serialize the JSON body
          body: JSON.stringify(newBurgerState),
        }).then((response) => {
          // Check that the response is all good
          // Reload the page so the user can see the new quote
          if (response.ok) {
            console.log(`changed devour to: ${devouredBurg}`);
            location.reload("/");
          } else {
            alert("something went wrong!");
          }
        });
      });
    });
  }

  // CREATE
  const createBurgerBtn = document.getElementById("create-btn");

  if (createBurgerBtn) {
    createBurgerBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Grabs the value of the textarea that goes by the name, "quote"
      const newBurger = {
        burger_name: document.getElementById("burgerName").value.trim(),
        devoured: false,
      };
      console.log(newBurger);

      // Send POST request to create a new quote
      fetch("/api/burgers", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        // make sure to serialize the JSON body
        body: JSON.stringify(newBurger),
      }).then(() => {
        // Empty the form
        document.getElementById("burgerName").value = "";

        // Reload the page so the user can see the new quote
        console.log("Created a new burger!");
        location.reload();
      });
    });
  }
});
