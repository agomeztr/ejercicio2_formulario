(function (Drupal, once) {

  Drupal.behaviors.customForm = {
    attach: function (context, settings) {

      const sendButton = once('send-button', context.querySelector('#send')).shift();
      if (!sendButton) return;

      const title = context.querySelector('#title');
      const description = context.querySelector('#description');
      const email = context.querySelector('#email');
      const select = context.querySelector('#category');
      const divMessage = context.querySelector('#message');
      const buttonMessage = context.querySelector('#cerrarMensaje');
      const iconMessage = context.querySelector('#icon');
      const message = context.querySelector('#text-message');

      let selectedPriority = null;

       //array with categories
        let nameCategories = ['Música', 'Matemáticas', 'Lengua', 'Historia'];
        //foreach to print the options in the select
        nameCategories.forEach(c => {
            //create the element option 
            let option = document.createElement('option');
            option.value = c;
            option.textContent = c;
            select.appendChild(option);
        })

        //array with priority
        let levelPriority = [1, 2, 3, 4, 5];
        //get the div priority from the main page to print stars
        let priority = document.getElementById('priority');
        levelPriority.forEach(p => {
            let button = document.createElement("button");
            button.id  = p;
            button.innerHTML = '<i class="bi bi-star"></i>';

            button.addEventListener("click", function(e){
                e.preventDefault();
                selectedPriority = p;
            });

            priority.appendChild(button);
        })

      sendButton.addEventListener("click", function (event) {
        event.preventDefault();

        let titleRegex = /^(?=.{5,60}$)\S(?:.*\S)?$/;
        let descriptionRegex = /^.{20,500}$/;
        let emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (
          !titleRegex.test(title.value) ||
          !descriptionRegex.test(description.value) ||
          !emailRegex.test(email.value) ||
          select.value === "" ||
          selectedPriority === null
        ) {
            console.log("entra en el primer if")
            console.log(message);
          if (message) {
            message.textContent = "Hay datos incorrectos o vacíos";
            divMessage.classList.remove("hidden");
            divMessage.classList.add("div-error");
            buttonMessage.classList.add("button-error");
            iconMessage.classList.remove("bi-check-circle");
            iconMessage.classList.add("bi-x-circle", "icon-error");
            console.log("entra en mensaje")
          }
        } else {
            if (message) {
            message.textContent = "¡Tu pregunta ha sido enviada con éxito!";
            divMessage.classList.remove("hidden");
            divMessage.classList.add("div-success");
            buttonMessage.classList.add("button-success");
            iconMessage.classList.remove("bi-x-circle");
            iconMessage.classList.add("bi-check-circle", "icon-success");
          }
        }
      });

    }
  };

})(Drupal, once);