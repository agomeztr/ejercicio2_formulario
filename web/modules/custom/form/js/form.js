(function (Drupal, once) {
  Drupal.behaviors.customForm = {
    attach: function (context, settings) {
      //get the send button
      once("send-button", context.querySelectorAll("#send")).forEach(
        function (sendButton) {
          sendButton.disabled = true;
          //get the elements from the form
          const title = context.querySelector("#title");
          const description = context.querySelector("#description");
          const email = context.querySelector("#email");
          const select = context.querySelector("#category");
          const divMessage = context.querySelector("#message");
          const buttonMessage = context.querySelector("#cerrarMensaje");
          const iconMessage = context.querySelector("#icon");
          const message = context.querySelector("#text-message");

          // a variable to get the selected priority
          let selectedPriority = null;

          //array with categories
          let nameCategories = ["Música", "Matemáticas", "Lengua", "Historia"];
          //foreach to print the options in the select
          nameCategories.forEach((c) => {
            //create the element option
            let option = document.createElement("option");
            option.value = c;
            option.textContent = c;
            select.appendChild(option);
          });

          //array with priority
          let levelPriority = [1, 2, 3, 4, 5];
          //get the div priority from the main page to print stars
          let priority = context.querySelector("#priority");
          levelPriority.forEach((p) => {
            let button = document.createElement("button");
            button.type = "button";
            button.dataset.value = p;
            button.innerHTML = '<i class="bi bi-star"></i>';

            button.addEventListener("click", function (e) {
              selectedPriority = p;
              //print the number os starts selected
              const allStars = priority.querySelectorAll("button i");
              allStars.forEach((star, index) => {
                if (index < p) {
                  star.classList.remove("bi-star");
                  star.classList.add("bi-star-fill");
                } else {
                  star.classList.remove("bi-star-fill");
                  star.classList.add("bi-star");
                }
              });
              validateForm();
            });

            priority.appendChild(button);
          });

          //disable the send button
          //sendButton.disabled = true;

          //regular exprexion to validate inputs
          let titleRegex = /^(?=.{5,60}$)\S(?:.*\S)?$/;
          let descriptionRegex = /^[\s\S]{20,500}$/;
          let emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

          //event into the send button
          sendButton.addEventListener("click", function (event) {
            //to avoid send the form without validate
            event.preventDefault();
            //if there is some dates null o incorrect
            if (
              !titleRegex.test(title.value) ||
              !descriptionRegex.test(description.value) ||
              !emailRegex.test(email.value) ||
              select.value === "" ||
              selectedPriority === null
            ) {
              //print the error message
              if (message) {
                message.textContent = "Hay datos incorrectos y/o vacíos";
                divMessage.classList.remove("hidden");
                divMessage.classList.add("div-error");
                buttonMessage.classList.add("button-error");
                iconMessage.classList.remove("bi-check-circle");
                iconMessage.classList.add("bi-x-circle", "icon-error");
              }
            } else {
              fetch("/form/submit", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-Requested-With": "XMLHttpRequest",
                },
                body: JSON.stringify({
                  title: title.value,
                  description: description.value,
                  email: email.value,
                  category: select.value,
                  priority: selectedPriority,
                }),
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("HTTP error");
                  }
                  return response.json();
                })
                .then((data) => {
                  if (data.status === "success") {
                    message.textContent =
                      "¡Tu solicitud ha sido enviada con éxito!";
                    divMessage.classList.remove("hidden");
                    divMessage.classList.add("div-success");

                    title.value = "";
                    description.value = "";
                    email.value = "";
                    select.value = "";
                    selectedPriority = null;

                    const allStars = priority.querySelectorAll("button i");
                    allStars.forEach((star) => {
                      star.classList.remove("bi-star-fill");
                      star.classList.add("bi-star");
                    });
                    validateForm();
                  } else {
                    message.textContent = "Error al guardar los datos.";
                    divMessage.classList.remove("hidden");
                    divMessage.classList.add("div-error");
                  }
                })

                .catch(() => {
                  message.textContent = "Error de conexión con el servidor.";
                  divMessage.classList.remove("hidden");
                  divMessage.classList.add("div-error");
                });
            }
          });

          //function to validate the form
          function validateForm() {
            const isValid =
              titleRegex.test(title.value) &&
              descriptionRegex.test(description.value) &&
              emailRegex.test(email.value) &&
              select.value !== "" &&
              selectedPriority !== null;
            sendButton.disabled = !isValid;
          }

          title.addEventListener("input", validateForm);
          description.addEventListener("input", validateForm);
          email.addEventListener("input", validateForm);
          select.addEventListener("change", validateForm);

          //event on the button of error-success message to close the message
          buttonMessage.addEventListener("click", function () {
            divMessage.classList.add("hidden");
          });
          validateForm();
        },
      );
    },
  };
})(Drupal, once);