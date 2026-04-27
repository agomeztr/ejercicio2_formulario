document.addEventListener("DOMContentLoaded", () => {

    //get the form elements from the main page
    //title
    let title = document.getElementById('title');
    //description
    let description = document.getElementById('description');
    //email
    let email = document.getElementById('email');
    
    //array with categories
    let nameCategories = ['Música', 'Matemáticas', 'Lengua', 'Historia'];
    //get the select from the main page
    let select = document.getElementById('category');
    //foreach to print the options in the select
    nameCategories.forEach(c => {
        //create the element option 
        let option = document.createElement('option');
        option.value = c;
        option.textContent = c;
        select.appendChild(option);
    })

    //create a variable to save the priority selected
    let selectedPriority = null;

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

    //get the send form button 
    let sendButton = document.getElementById('send');

    sendButton.addEventListener("click", function(event){
        event.preventDefault();
        //regular expression to validate the from inputs
        //title
        let titleRegex = /^(?=.{5,60}$)\S(?:.*\S)?$/;
        //description
        let descriptionRegex = /^.{20,500}$/;
        let emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        //get the elements from the text message to print the error or success message
        //div
        let divMessage = document.getElementById('message')
        //button
        let buttonMessage = document.getElementById('cerrarMensaje');
        //icon
        let iconMessage = document.getElementById('icon');
        //text
        let message = document.getElementById('text-message');
        
        if(!titleRegex.test(title.value) || !descriptionRegex.test(description.value) || !emailRegex.test(email.value) || 
        select.value === "" || selectedPriority === null){
            message.textContent = "Hay datos incorrectos o vacíos";
            divMessage.className = "div-error";
            buttonMessage.className = "button-error";
            iconMessage.className = "icon-error"
        }
    })

})